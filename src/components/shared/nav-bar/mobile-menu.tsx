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

export default function MobileNavigation() {
  const { isSignedIn } = useAuth();
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DrawerRoot
        placement={"bottom"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <DrawerBackdrop />

        <DrawerTrigger asChild>
          <IconButton
            display={{ base: "flex", md: "none" }}
            variant={"plain"}
            aria-label="main menu"
            size={"lg"}
          >
            <Menu />
          </IconButton>
        </DrawerTrigger>

        <DrawerContent py={10}>
          <DrawerBody>
            <VStack gap={8}>
              <ChakraLink asChild onClick={() => setOpen(false)}>
                <NextLink href={`/about`}>About</NextLink>
              </ChakraLink>

              <ChakraLink asChild onClick={() => setOpen(false)}>
                <NextLink href={`/blogs`}>Blog</NextLink>
              </ChakraLink>

              <ChakraLink asChild onClick={() => setOpen(false)}>
                <NextLink href={`/contact`}>Contact</NextLink>
              </ChakraLink>
            </VStack>
          </DrawerBody>

          <DrawerFooter justifyContent={"center"} pt={8}>
            {!isSignedIn ? (
              <>
                <NextLink href={`/sign-in`}>
                  <Button colorPalette={"primary"}>Sign In</Button>
                </NextLink>

                <NextLink href={`/sign-up`}>
                  <Button colorPalette={"primary"}>Sign Up</Button>
                </NextLink>
              </>
            ) : (
              <NextLink href={`/dashboard`}>
                <Button colorPalette={"primary"}>Dashboard</Button>
              </NextLink>
            )}
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
