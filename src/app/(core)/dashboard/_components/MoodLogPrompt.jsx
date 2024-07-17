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

export default function MoodLogPrompt() {
  return (
    <Box my={4}>
      <Typography variant="h5" mb={2}>
        Log your mood
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card>
            <ButtonBase sx={{ width: "100%" }}>
              <CardContent>
                <EditNote fontSize="large" />
                <Typography>Write your mood</Typography>
              </CardContent>
            </ButtonBase>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <Card>
            <ButtonBase sx={{ width: "100%" }}>
              <CardContent>
                <CameraFront fontSize="large" />
                <Typography>Upload a selfie</Typography>
              </CardContent>
            </ButtonBase>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
