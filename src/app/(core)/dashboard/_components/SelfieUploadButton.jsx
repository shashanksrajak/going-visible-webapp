"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Alert from "@mui/material/Alert"; // Add Alert for error messages
import Snackbar from "@mui/material/Snackbar"; // Add Snackbar for notifications

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function SelfieUploadButton({
  setSelfiePreview,
  onImageUpload,
}) {
  const [error, setError] = React.useState(null);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError(
          "Invalid file type. Please upload an image (JPEG, PNG, or GIF)."
        );
        setOpenSnackbar(true);
        return;
      }

      // Validate file size
      const maxSizeMB = 3;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(
          `File size exceeds ${maxSizeMB}MB. Please upload a smaller file.`
        );
        setOpenSnackbar(true);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfiePreview(reader.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload selfie
        <VisuallyHiddenInput
          type="file"
          accept="image/*" // Restricts file picker to images only
          onChange={handleFileChange}
        />
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
