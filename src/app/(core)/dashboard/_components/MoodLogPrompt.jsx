import { Box, Grid, Alert, Typography, Button } from "@mui/material";
import React from "react";
import MoodLogTextDialog from "./MoodLogTextDialog";
import MoodLogSelfieDialog from "./MoodLogSelfieDialog";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";

export default function MoodLogPrompt({ user }) {
  // Determine if mood prompts should be shown based on user profile completeness
  const showMoodPrompts = Boolean(user.age && user.bio && user.gender);
  console.log(showMoodPrompts);
  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Log your mood
      </Typography>

      {/* Show warning and link to profile if user details are incomplete */}
      {!showMoodPrompts ? (
        <Box>
          <Alert severity="warning" sx={{ my: 2 }}>
            Please complete your profile to start tracking your mood.
          </Alert>

          <Link href="/profile" passHref>
            <Button component="a" endIcon={<ArrowForward />}>
              Complete Profile
            </Button>
          </Link>

          <Box mb={2}></Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MoodLogTextDialog disabled={true} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MoodLogSelfieDialog disabled={true} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        // Show mood log options if profile is complete
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <MoodLogTextDialog disabled={false} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MoodLogSelfieDialog disabled={false} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
