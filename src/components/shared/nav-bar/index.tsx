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
import MobileNavigation from "./mobile-menu";

export default function Navbar() {
  return (
    <Container bgColor={"blue.700"} py={4}>
      <Stack direction="row" gap={4} align="center" justify="space-between">
        <Box>
          <Heading
            as={"h1"}
            size="lg"
            color="white"
            aria-label="Going Visible | Back to home page"
          >
            Going Visible
          </Heading>
        </Box>

        <nav>
          <HStack gap={10} display={{ base: "none", md: "flex" }}>
            <ChakraLink asChild color="white">
              <NextLink href={`/about`}>About</NextLink>
            </ChakraLink>

            <ChakraLink asChild color="white">
              <NextLink href={`/about`}>Blog</NextLink>
            </ChakraLink>

            <ChakraLink asChild color="white">
              <NextLink href={`/about`}>Contact</NextLink>
            </ChakraLink>

            <IconButton
              variant={"plain"}
              colorScheme={"white"}
              aria-label="moon"
            >
              <LuMoon />
            </IconButton>

            <ChakraLink asChild color="white">
              <NextLink href={`/auth/signin`}>
                <Button>Sign In</Button>
              </NextLink>
            </ChakraLink>
          </HStack>

          <MobileNavigation />
        </nav>
      </Stack>
    </Container>
  );
}
