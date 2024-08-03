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
  Avatar,
} from "@mui/material";
import { CameraFront } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { analyseMood } from "@/lib/server-actions/google-ai";
import MoodPromptResult from "./MoodPromptResultDialog";
import SelfieUploadButton from "./SelfieUploadButton";

export default function MoodLogSelfieDialog() {
  const [moodText, setMoodText] = useState();
  const [loading, setLoading] = useState(false);

  const [selfiePreview, setSelfiePreview] = useState("");

  const [moodResponse, setMoodResponse] = useState(null);

  const [open, setOpen] = useState(false);

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
              <CameraFront fontSize="large" />
              <Typography>Upload a selfie</Typography>
            </CardContent>
          </ButtonBase>
        </Card>
      </>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload your selfie</DialogTitle>
        <DialogContent>
          <>
            <Box>
              <Avatar
                sx={{ width: 150, height: 150, mb: 2 }}
                src={selfiePreview}
              />
              <SelfieUploadButton setSelfiePreview={setSelfiePreview} />
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
            moodText={moodText}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
