import {
  Container,
  Box,
  Heading,
  Stack,
  Link as ChakraLink,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { LuMoon } from "react-icons/lu";

import { currentUser } from "@clerk/nextjs/server";

import MobileNavigation from "./mobile-menu";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <Container py={4} shadow={"md"}>
      <Stack direction="row" gap={4} align="center" justify="space-between">
        <Box>
          <Heading
            as={"h1"}
            size="2xl"
            aria-label="Going Visible | Back to home page"
          >
            Going Visible
          </Heading>
        </Box>

        <nav>
          <HStack gap={10} display={{ base: "none", md: "flex" }}>
            <ChakraLink asChild>
              <NextLink href={`/about`}>About</NextLink>
            </ChakraLink>

            <ChakraLink asChild>
              <NextLink href={`/blogs`}>Blogs</NextLink>
            </ChakraLink>

            <ChakraLink asChild>
              <NextLink href={`/contact`}>Contact</NextLink>
            </ChakraLink>

            <IconButton variant={"plain"} aria-label="moon">
              <LuMoon />
            </IconButton>

            {/* {isLoaded && ( */}
            {user ? (
              <NextLink href={`/dashboard`}>
                <Button colorPalette={"primary"}>Dashboard</Button>
              </NextLink>
            ) : (
              <NextLink href={`/sign-in`}>
                <Button colorPalette={"primary"}>Sign In</Button>
              </NextLink>
            )}
            {/* )} */}
          </HStack>

          <MobileNavigation />
        </nav>
      </Stack>
    </Container>
  );
}
