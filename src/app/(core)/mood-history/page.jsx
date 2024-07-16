import React from "react";
import { Typography, Button, Box, Stack, Alert } from "@mui/material";
import MoodTabs from "./_components/MoodTabs";

export default function MoodHistoryPage() {
  return (
    <>
      <Typography variant="h4">Mood History</Typography>
      <Typography variant="body2">Track all your past mood recordsa</Typography>

      <Box my={4}>
        <MoodTabs />
      </Box>
    </>
  );
}
