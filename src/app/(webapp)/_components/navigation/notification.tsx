import React from "react";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function Notification() {
  return (
    <Button size={"icon"} variant={"outline"}>
      <Bell />
    </Button>
  );
}
