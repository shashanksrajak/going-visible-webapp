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
import { Card, CardContent, ButtonBase, Typography } from "@mui/material";
import { EditNote } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { analyseMood } from "@/lib/server-actions/google-ai";
import MoodPromptResult from "./MoodPromptResultDialog";

export default function MoodLogTextDialog() {
  const [moodText, setMoodText] = useState();
  const [loading, setLoading] = useState(false);

  const [moodResponse, setMoodResponse] = useState(null);

  const [moodSentiment, setMoodSentiment] = useState(null);
  const [moodSuggestion, setMoodSuggestion] = useState(null);

  const [open, setOpen] = useState(false);

  const analyseMoodHandler = async () => {
    // setLoading(true);
    if (moodText && moodText.length > 10) {
      setLoading(true);
      const response = await analyseMood(moodText);
      console.log(response);

      // Access the mood sentiment and suggestion
      const moodSentiment = response.mood_sentiment;
      const suggestion = response.suggestion;

      setMoodResponse(response);

      setMoodSentiment(moodSentiment);
      setMoodSuggestion(suggestion);

      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <>
        <Card>
          <ButtonBase sx={{ width: "100%" }} onClick={handleClickOpen}>
            <CardContent>
              <EditNote fontSize="large" />
              <Typography>Write your mood</Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      </>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Log your mood</DialogTitle>
        <DialogContent>
          <>
            <Box>
              <TextField
                value={moodText}
                onChange={(e) => setMoodText(e.target.value)}
                multiline
                rows={5}
                fullWidth
                placeholder="How I am feeling today..."
              />
            </Box>
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <MoodPromptResult
            analyseMoodHandler={analyseMoodHandler}
            loading={loading}
            moodResponse={moodResponse}
            moodSentiment={moodSentiment}
            moodSuggestion={moodSuggestion}
            moodText={moodText}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
