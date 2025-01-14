import {
  Container,
  Box,
  Heading,
  Stack,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import MobileNavigation from "./mobile-menu";
import { ColorModeButton } from "@/components/ui/color-mode";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <Box shadow={"md"} bg={"bg.panel"} position={"sticky"} top={0} zIndex={100}>
      <Container py={4}>
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
            <HStack gap={{ base: 4, md: 10 }}>
              <HStack
                gap={{ base: 4, md: 10 }}
                display={{ base: "none", md: "flex" }}
              >
                <ChakraLink asChild>
                  <NextLink href={`/about`}>About</NextLink>
                </ChakraLink>

                <ChakraLink asChild>
                  <NextLink href={`/blogs`}>Blogs</NextLink>
                </ChakraLink>

                <ChakraLink asChild>
                  <NextLink href={`/contact`}>Contact</NextLink>
                </ChakraLink>
              </HStack>

              <ColorModeButton />

              <HStack
                gap={{ base: 4, md: 10 }}
                display={{ base: "none", md: "flex" }}
              >
                {user ? (
                  <NextLink href={`/dashboard`}>
                    <Button colorPalette={"primary"}>Dashboard</Button>
                  </NextLink>
                ) : (
                  <NextLink href={`/sign-in`}>
                    <Button colorPalette={"primary"}>Sign In</Button>
                  </NextLink>
                )}
              </HStack>

              <MobileNavigation />
            </HStack>
          </nav>
        </Stack>
      </Container>
    </Box>
  );
}
