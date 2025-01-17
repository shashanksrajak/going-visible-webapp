import React from "react";

import { Separator } from "@/components/ui/separator";

import { SidebarTrigger } from "./sidebar-trigger";
import { ModeToggle } from "@/components/ui/dark-mode-toggle-button";
import UserAvatarMenu from "./user-avatar-menu";
import Notification from "./notification";

export default function TopHeader() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex w-full items-center justify-between gap-2 px-0 ">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-0 h-4" />

            <h1 className="font-semibold text-primary">Going Visible</h1>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />

            <Notification />

            {/* REVIEW: if we should keep this button */}
            <UserAvatarMenu />
          </div>
        </div>
      </header>
    </>
  );
}
