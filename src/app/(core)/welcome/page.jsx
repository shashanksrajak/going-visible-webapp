// Render this page for first time users & if profile is not completed to take some initial user data

import React from "react";

import { currentUser } from "@/lib/server-actions/user-auth";
import { Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const user = await currentUser();

  // fetch user from users collection

  if (!user) {
    redirect("/");
  }

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
