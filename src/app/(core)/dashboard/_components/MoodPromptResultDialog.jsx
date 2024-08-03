"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Send } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import Markdown from "markdown-to-jsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MoodPromptResult({
  loading,
  analyseMoodHandler,
  moodSentiment,
  moodSuggestion,
  moodText,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    analyseMoodHandler();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        endIcon={<Send />}
        onClick={handleClickOpen}
        disabled={!moodText || moodText.length < 15}
      >
        Submit Mood
      </Button>
      <BootstrapDialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
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
                <>
                  <Markdown options={{ wrapper: "article" }}>
                    {moodSentiment}
                  </Markdown>

                  <Markdown options={{ wrapper: "article" }}>
                    {moodSuggestion}
                  </Markdown>
                </>
              }
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!loading && (
            <Button autoFocus onClick={handleClose}>
              Accept
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
