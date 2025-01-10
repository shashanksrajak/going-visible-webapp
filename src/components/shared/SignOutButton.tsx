"use client";

import React from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  const { signOut } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await signOut({});
        setLoading(false);
        router.replace(`/?signedOut=true`);
      }}
      loadingText={"Signing out..."}
      loading={loading}
    >
      Sign Out
    </Button>
  );
}
