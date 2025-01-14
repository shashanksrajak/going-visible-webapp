"use client";

import React from "react";
import { IconButton, VStack } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerRoot,
  DrawerTrigger,
} from "@/components/ui/drawer";
import NavigationItems from "./NavigationItems";
import SignOutButton from "@/components/shared/SignOutButton";

export default function MobileNavigation() {
  const { isSignedIn } = useAuth();
  return (
    <>
      <DrawerRoot placement={"bottom"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            display={{ base: "flex", md: "none" }}
            variant={"plain"}
            aria-label="main menu"
            onClick={() => console.log("clicked")}
          >
            <LuMenu />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent py={4}>
          <DrawerBody>
            <VStack alignItems={"flex-start"} gap={8}>
              <NavigationItems />
            </VStack>
          </DrawerBody>
          <DrawerFooter justifyContent={"center"}>
            {!isSignedIn ? (
              <>
                {" "}
                <Button>Sign In</Button>
                <Button>Sign Up</Button>
              </>
            ) : (
              <SignOutButton />
            )}
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
