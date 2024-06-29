"use client";

import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { analyseMood } from "@/lib/server-actions/google-ai";
import MoodPromptResult from "./MoodPromptResultDialog";

export default function MoodPrompt() {
  const [moodText, setMoodText] = useState();
  const [loading, setLoading] = useState(false);

  const [moodResponse, setMoodResponse] = useState(null);

  const analyseMoodHandler = async () => {
    // setLoading(true);
    if (moodText && moodText.length > 10) {
      setLoading(true);
      const response = await analyseMood(moodText);
      console.log(response);
      setMoodResponse(response);
      setLoading(false);
    }
  };

  return (
    <Box py={5}>
      <TextField
        value={moodText}
        onChange={(e) => setMoodText(e.target.value)}
        multiline
        rows={5}
        fullWidth
        placeholder="How I am feeling today..."
      />

      <Stack mt={2} justifyContent="end" alignItems="flex-end">
        {/* <Button endIcon={<Send />} onClick={promptHandler}>
          Submit Mood
        </Button> */}
        <MoodPromptResult
          analyseMoodHandler={analyseMoodHandler}
          loading={loading}
          moodResponse={moodResponse}
          moodText={moodText}
        />
      </Stack>
    </Box>
  );
}
