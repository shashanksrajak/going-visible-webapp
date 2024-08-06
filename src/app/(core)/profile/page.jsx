import { Typography, Alert } from "@mui/material";
import React from "react";
import { currentUser } from "@/lib/server-actions/user-auth";
import ProfileForm from "./_components/profile-form";

export default async function ProfilePage() {
  const user = await currentUser();

  return (
    <>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body2">
        Manage your personal profile. Keeping your profile up-to-date helps us
        better understand your mood and provide more personalized insights.
      </Typography>

      {(!user.age || !user.gender || !user.bio) && (
        <Alert severity="warning" sx={{ my: 2 }}>
          Please complete your profile to start tracking your mood.
        </Alert>
      )}

      {/* list of users */}
      <ProfileForm user={user} />
    </>
  );
}
