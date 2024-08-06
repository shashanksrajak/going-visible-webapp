import React from "react";
import { currentUser } from "@/lib/server-actions/user-auth";
import { Box } from "@mui/material";
import Welcome from "./_components/Welcome";
import WeeklyStreak from "./_components/WeeklyStreak";
import Rewards from "./_components/Rewards";
import { redirect } from "next/navigation";
import MoodLogPrompt from "./_components/MoodLogPrompt";

export default async function DashboardPage() {
  const user = await currentUser();
  console.log(user);

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Box>
        <Welcome user={user} />
        <MoodLogPrompt user={user} />
      </Box>

      <WeeklyStreak />

      <Rewards />
    </>
  );
}
