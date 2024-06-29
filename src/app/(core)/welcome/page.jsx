// Render this page for first time users & if profile is not completed to take some initial user data

import React from "react";

import { currentUser } from "@/lib/server-actions/user-auth";
import { Typography } from "@mui/material";

export default async function WelcomePage() {
  const user = await currentUser();

  // fetch user from users collection

  return (
    <>
      <Typography variant="h2" color={"secondary"}>
        Welcome
      </Typography>
      <Typography variant="h2" color={"primary"}>
        {user.name}
      </Typography>
    </>
  );
}
