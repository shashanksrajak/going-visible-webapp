"use client";

import React from "react";
import NextLink from "next/link";
import { IconButton, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { Menu } from "lucide-react";
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
import SignOutButton from "./SignOutButton";

export default function MobileNavigation() {
  const { isSignedIn } = useAuth();
  return (
    <>
      <DrawerRoot placement={"bottom"}>
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            display={{ base: "block", md: "none" }}
            variant={"plain"}
            aria-label="main menu"
            color={"white"}
            size={"lg"}
          >
            <Menu />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent bgColor={"blue.700"}>
          <DrawerBody>
            <VStack>
              <ChakraLink asChild color="white">
                <NextLink href={`/about`}>About</NextLink>
              </ChakraLink>

              <ChakraLink asChild color="white">
                <NextLink href={`/about`}>Blog</NextLink>
              </ChakraLink>

              <ChakraLink asChild color="white">
                <NextLink href={`/about`}>Contact</NextLink>
              </ChakraLink>
            </VStack>
          </DrawerBody>
          <DrawerFooter justifyContent={"center"}>
            {!isSignedIn ? (
              <>
                <ChakraLink asChild color="white">
                  <NextLink href={`/sign-in`}>
                    <Button>Sign In</Button>
                  </NextLink>
                </ChakraLink>
                <ChakraLink asChild color="white">
                  <NextLink href={`/sign-up`}>
                    <Button>Sign Up</Button>
                  </NextLink>
                </ChakraLink>
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
