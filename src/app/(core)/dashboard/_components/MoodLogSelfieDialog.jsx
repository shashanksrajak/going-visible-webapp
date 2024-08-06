"use client";

import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Card,
  CardContent,
  ButtonBase,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import { CameraFront } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import SelfieUploadButton from "./SelfieUploadButton";
import { CircularProgress } from "@mui/material";
import Markdown from "markdown-to-jsx";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { checkMoodLogAllowed } from "@/lib/server-actions/mood-logs";

export default function MoodLogSelfieDialog({ disabled }) {
  const [loading, setLoading] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const [selfiePreview, setSelfiePreview] = useState(null);

  const [moodSentiment, setMoodSentiment] = useState(null);
  const [moodSuggestion, setMoodSuggestion] = useState(null);

  const [open, setOpen] = useState(false);

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
    setAnalysing(false);
    setLoading(false);
    setSelfiePreview(null);
    setOpen(false);
  };

  // image uploaded then analyse mood
  const onImageUpload = async (file) => {
    setLoading(true);
    setAnalysing(true);
    // console.log("onImageUpload called..");
    // console.log(file);
    // console.log(file.type);

    // Analyse Mood Using Image
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/ai/analyse-mood-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);

    const moodSentiment = data.mood_sentiment;
    const suggestion = data.suggestion;

    setMoodSentiment(moodSentiment);
    setMoodSuggestion(suggestion);

    setLoading(false);
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
              <CameraFront fontSize="large" />
              <Typography>Upload a selfie</Typography>
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <CircularProgress size={60} />
                  </Box>
                  <Typography>Analysing your mood...</Typography>
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
            </DialogContent>
          </>
        ) : (
          <>
            {" "}
            <DialogTitle>Upload your selfie</DialogTitle>
            <DialogContent>
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  {selfiePreview ? (
                    <img src={selfiePreview} alt="selfie" height={150} />
                  ) : (
                    <img
                      src={`/assets/images/selfie.png`}
                      alt="selfie"
                      height={150}
                    />
                  )}
                  <SelfieUploadButton
                    setSelfiePreview={setSelfiePreview}
                    onImageUpload={onImageUpload}
                  />
                </Box>
              </>
            </DialogContent>{" "}
          </>
        )}

        {!analysing && (
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </DialogActions>
        )}

        <Divider sx={{ mt: 2 }} />

        <Stack alignItems={"center"} mt={2}>
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
