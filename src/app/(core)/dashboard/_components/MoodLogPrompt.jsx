import { Box, Grid, Alert, Typography, Button, Stack } from "@mui/material";
import React from "react";
import MoodLogTextDialog from "./MoodLogTextDialog";
import MoodLogSelfieDialog from "./MoodLogSelfieDialog";
import Link from "next/link";
import { ArrowForward } from "@mui/icons-material";

export default function MoodLogPrompt({ user }) {
  // Determine if mood prompts should be shown based on user profile completeness
  const showMoodPrompts = Boolean(user.age && user.bio && user.gender);
  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Log your mood
      </Typography>

      {(!user.family || user.family.length === 0) && (
        <>
          <Box mb={2}>
            <Alert severity="warning" sx={{ my: 2 }}>
              <Stack gap={2}>
                <Typography variant="body2">
                  Please add your family members to send them mood alerts.
                </Typography>
                <Link href="/family" passHref>
                  <Button component="a" endIcon={<ArrowForward />}>
                    Add Family
                  </Button>
                </Link>
              </Stack>
            </Alert>
          </Box>
        </>
      )}

      {/* Show warning and link to profile if user details are incomplete */}
      {!showMoodPrompts ? (
        <Box>
          <Box mb={2}>
            <Alert severity="warning" sx={{ my: 2 }}>
              <Stack gap={2}>
                <Typography variant="body2">
                  Please complete your profile to start tracking your mood.
                </Typography>
                <Link href="/profile" passHref>
                  <Button component="a" endIcon={<ArrowForward />}>
                    Complete Profile
                  </Button>
                </Link>
              </Stack>
            </Alert>
          </Box>

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
