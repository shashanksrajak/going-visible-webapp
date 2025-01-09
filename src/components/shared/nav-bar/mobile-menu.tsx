"use client";

import React from "react";
import NextLink from "next/link";
import { IconButton, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";

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
            onClick={() => console.log("clicked")}
          >
            <LuMenu />
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
            <Button>Sign In</Button>
            <Button>Sign Up</Button>
          </DrawerFooter>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>
    </>
  );
}
