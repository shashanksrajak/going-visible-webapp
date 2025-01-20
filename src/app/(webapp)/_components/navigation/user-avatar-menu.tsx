import React from "react";
import NextLink from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export default function UserAvatarMenu() {
  return (
    <NextLink href={"/settings/account"}>
      <Button size={"icon"} variant={"ghost"}>
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
      </Button>
    </NextLink>
  );
}
