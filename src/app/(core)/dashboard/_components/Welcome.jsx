import React from "react";
import { Box, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";

export default function Welcome({ user }) {
  return (
    <Box>
      <Typography variant="h4">
        Namaste, {user.name} <WavingHandIcon />
      </Typography>
    </Box>
  );
}
