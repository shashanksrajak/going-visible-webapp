"use client";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardContent,
  ButtonBase,
  Typography,
  Alert,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { CircularProgress } from "@mui/material";
import Markdown from "markdown-to-jsx";
import CloseIcon from "@mui/icons-material/Close";
import { checkMoodLogAllowed } from "@/lib/server-actions/mood-logs";

export default function MoodLogTextDialog({ disabled }) {
  const [moodText, setMoodText] = useState();
  const [loading, setLoading] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const [moodSentiment, setMoodSentiment] = useState(null);
  const [moodSuggestion, setMoodSuggestion] = useState(null);

  const [open, setOpen] = useState(false);

  const analyseMoodHandler = async () => {
    // validate
    if (!moodText || moodText.length < 15) {
      alert("Please write minimun 15 characters.");
      return;
    }
    if (moodText && moodText.length > 15) {
      setLoading(true);
      setAnalysing(true);

      // Analyse Mood
      const response = await fetch("/api/ai/analyse-mood-text", {
        method: "POST",
        body: JSON.stringify({ moodText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      // Access the mood sentiment and suggestion
      const moodSentiment = data.mood_sentiment;
      const suggestion = data.suggestion;

      setMoodSentiment(moodSentiment);
      setMoodSuggestion(suggestion);

      setLoading(false);
    }
  };

  const handleClickOpen = async () => {
    // check if mood can be logged as per limit
    const allow = await checkMoodLogAllowed();
    if (allow) {
      setOpen(true);
    } else {
      alert("Sorry! You have reached max limit of 5 for today.");
    }
  };

  const handleClose = () => {
    setMoodText("");
    setAnalysing(false);
    setLoading(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <>
        <Card>
          <ButtonBase
            sx={{ width: "100%" }}
            onClick={handleClickOpen}
            disabled={disabled}
          >
            <CardContent>
              <EditNote fontSize="large" />
              <Typography>Write your mood</Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      </>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {analysing ? (
          <>
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Mood Analysis
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={60} />
                </Box>
              ) : (
                <>
                  {
                    <Stack spacing={4} mb={4}>
                      <Stack>
                        <Typography variant="subtitle2">
                          Mood Sentiment
                        </Typography>
                        <Markdown options={{ wrapper: "article" }}>
                          {moodSentiment}
                        </Markdown>
                      </Stack>

                      <Stack>
                        <Typography variant="subtitle2">Suggestion</Typography>
                        <Markdown options={{ wrapper: "article" }}>
                          {moodSuggestion}
                        </Markdown>
                      </Stack>
                    </Stack>
                  }

                  <Alert severity="info">
                    <Typography variant="caption">
                      The mood analysis and suggestions provided are generated
                      by AI and should be interpreted as informational. Please
                      follow the suggestions with caution and consult a
                      professional for any serious concerns or health-related
                      issues.
                    </Typography>
                  </Alert>
                </>
              )}
            </DialogContent>{" "}
          </>
        ) : (
          <>
            <DialogTitle>Write your mood</DialogTitle>
            <DialogContent>
              <>
                <Box>
                  <TextField
                    value={moodText}
                    onChange={(e) => setMoodText(e.target.value)}
                    multiline
                    rows={5}
                    fullWidth
                    placeholder="How you are feeling today..."
                  />
                </Box>
              </>
            </DialogContent>
          </>
        )}

        {!analysing && (
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button endIcon={<Send />} onClick={analyseMoodHandler}>
              Submit Mood
            </Button>
          </DialogActions>
        )}

        <Stack alignItems={"center"} mt={4}>
          <Typography variant="caption">Powered by</Typography>
          <img
            src="/assets/images/gemini-ai-logo.svg"
            alt="gemini-ai"
            height={50}
          />
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}
