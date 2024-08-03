import { CameraFront, EditNote } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import MoodLogTextDialog from "./MoodLogTextDialog";
import MoodLogSelfieDialog from "./MoodLogSelfieDialog";

export default function MoodLogPrompt() {
  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Log your mood
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MoodLogTextDialog />
        </Grid>

        <Grid item xs={6}>
          <MoodLogSelfieDialog />
        </Grid>
      </Grid>
    </Box>
  );
}
