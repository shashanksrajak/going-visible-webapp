import React from "react";
import { Typography, Button, Box, Stack, Alert } from "@mui/material";
import MoodTabs from "./_components/MoodTabs";
import { currentUser } from "@/lib/server-actions/user-auth";

export default async function MoodHistoryPage() {
  const user = await currentUser();

  return (
    <>
      <Typography variant="h4">Mood History</Typography>
      <Typography variant="body2">Track all your past mood records</Typography>

      <Box my={4}>
        <MoodTabs userId={user.uid} />
      </Box>
    </>
  );
}
