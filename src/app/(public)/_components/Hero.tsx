"use client";

import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Play } from "lucide-react";
import NextLink from "next/link";

export default function Hero() {
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        gap={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
          color={"primary.600"}
        >
          Empowering People with{" "}
          <Text color={"secondary.600"}>Invisible Illnesses </Text>
          <Text as={"span"} maxW={"3xl"}>
            to Truly Going Visible
          </Text>
        </Heading>

        <Heading>
          Monitor your mood, pain, medications, and appointments all in one
          place.
        </Heading>

        <Stack gap={6} direction={"row"}>
          <NextLink href="/sign-up" passHref>
            <Button
              rounded={"full"}
              px={6}
              colorPalette={"primary"}
              size={"lg"}
            >
              Get Started
            </Button>
          </NextLink>
          <Button
            rounded={"full"}
            px={6}
            colorPalette={"primary"}
            variant={"outline"}
            size={"lg"}
          >
            <Play />
            Watch Demo
          </Button>
        </Stack>
        <Flex w={"full"}>
          {/* <Illustration
            height={{ sm: "24rem", lg: "28rem" }}
            mt={{ base: 12, sm: 16 }}
          /> */}
        </Flex>
      </Stack>
    </Container>
  );
}
