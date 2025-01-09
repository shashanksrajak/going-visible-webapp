"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <Button
      onClick={async () => {
        await signOut({ redirectUrl: `/?signedOut=true` });
      }}
    >
      Sign Out
    </Button>
  );
}
