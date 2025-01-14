import { Container, Heading, Box } from "@chakra-ui/react";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  type?: "app" | "page";
}

export default function PageHeader({
  title,
  description,
  type,
}: PageHeaderProps) {
  switch (type) {
    case "app":
      return (
        <Box mb={5}>
          <Heading as={"h1"} size={"3xl"} textTransform={"uppercase"}>
            {title}
          </Heading>
          {description && <p>{description}</p>}
        </Box>
      );
    case "page":
      return (
        <Container
          centerContent={true}
          maxW={"full"}
          py={20}
          boxShadow="xl"
          bgColor={"secondary.300"}
        >
          <Heading as={"h1"} size={"6xl"}>
            {title}
          </Heading>
          {description && <p>{description}</p>}
        </Container>
      );
    default:
      return (
        <Container
          centerContent={true}
          maxW={"full"}
          py={20}
          boxShadow="xl"
          bgColor={"blue.400"}
        >
          <Heading as={"h1"} size={"6xl"}>
            {title}
          </Heading>
          {description && <p>{description}</p>}
        </Container>
      );
  }
}
