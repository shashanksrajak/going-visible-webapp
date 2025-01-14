import React from "react";

import { Container, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <Container
      maxWidth={"6xl"}
      py={16}
      textAlign="center"
      bgColor={"primary.500"}
      boxShadow={"md"}
      mb={16}
    >
      <Heading size={"4xl"} color={"white"}>
        Join thousands of users improving their health today!
      </Heading>

      <Button mt={4} size={"lg"}>
        Sign Up
      </Button>
    </Container>
  );
}
