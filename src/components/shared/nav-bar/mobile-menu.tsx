"use client";

import React from "react";
import NextLink from "next/link";
import { IconButton, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { ArrowRight, Menu } from "lucide-react";
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
            color={"white"}
            size={"lg"}
          >
            <Menu />
          </IconButton>
        </DrawerTrigger>

        <DrawerContent bgColor={"blue.700"} py={10}>
          <DrawerBody>
            <VStack gap={8}>
              <ChakraLink asChild color="white" onClick={() => setOpen(false)}>
                <NextLink href={`/about`}>About</NextLink>
              </ChakraLink>

              <ChakraLink asChild color="white" onClick={() => setOpen(false)}>
                <NextLink href={`/blogs`}>Blog</NextLink>
              </ChakraLink>

              <ChakraLink asChild color="white" onClick={() => setOpen(false)}>
                <NextLink href={`/contact`}>Contact</NextLink>
              </ChakraLink>
            </VStack>
          </DrawerBody>

          <DrawerFooter justifyContent={"center"} pt={8}>
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
              <ChakraLink asChild color="white">
                <NextLink href={`/dashboard`}>
                  <Button>
                    Dashboard <ArrowRight />
                  </Button>
                </NextLink>
              </ChakraLink>
            )}
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
