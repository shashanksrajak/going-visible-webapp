import PageHeader from "@/components/shared/page-header";
import React from "react";
import NextLink from "next/link";

import { EmptyState } from "@/components/ui/empty-state";
import { Frown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MoodTrackerPage() {
  // Fetch logs from the API for current date

  return (
    <>
      <PageHeader type="app" title="Pain Tracker" />

      <NextLink href="/pain-tracker/log">
        <Button colorPalette={"primary"}>
          <Plus />
          Log Your Pain
        </Button>
      </NextLink>
      <>
        <EmptyState
          icon={<Frown />}
          title="No logs found for today"
          description="Log your pain levels to keep track of your health."
        />
      </>
    </>
  );
}
