import { Container, Heading } from "@chakra-ui/react";
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
        <Container maxW={"full"} py={5} boxShadow="md">
          <Heading as={"h1"} size={"3xl"}>
            {title}
          </Heading>
          {description && <p>{description}</p>}
        </Container>
      );
    case "page":
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
