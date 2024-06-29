"use client";

import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { login, logout } from "@/lib/server-actions/user-auth";
import React from "react";

export default function HeaderHomePage({ user }) {
  const signInHandler = async () => {
    console.log("signInHandler");
    const credentials = await signInWithGoogle();
    console.log(credentials);
    const token = await credentials.user?.getIdToken();
    console.log(token);
    await login(token);
    console.log("signed in...");
  };

  const signOutHandler = async () => {
    console.log("signOutHandler");
    const credentials = await signOut();

    await logout();
    console.log(credentials);
    console.log("signed out...");
  };

  return (
    <div>
      {user ? (
        <button onClick={signOutHandler}>Sign Out</button>
      ) : (
        <button onClick={signInHandler}>Sign In</button>
      )}
    </div>
  );
}
