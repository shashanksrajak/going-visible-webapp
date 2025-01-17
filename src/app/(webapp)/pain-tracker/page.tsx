"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Mail } from "lucide-react";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  return (
    <div>
      <div className="container mx-auto bg-green-500">
        This is home page for signed in users
      </div>

      <div className="container mx-auto my-10 flex gap-5">
        <Button>Add Me</Button>

        <Button>Sign In</Button>

        <Button variant={"outline"}>Forgot My Password</Button>

        <Button variant={"secondary"}>Forgot My Password</Button>

        <Button variant={"ghost"}>Forgot My Password</Button>

        <Button>
          <Mail /> Login with Email
        </Button>

        <Button loading={loading} onClick={() => setLoading(!loading)}>
          <Mail /> Login Now
        </Button>
      </div>
    </div>
  );
}
