import React from "react";

import SignOutButton from "@/components/shared/SignOutButton";
import PageHeader from "@/components/shared/page-header";

export default function Page() {
  return (
    <>
      <PageHeader type="app" title="My Account" />
      <SignOutButton />
    </>
  );
}
