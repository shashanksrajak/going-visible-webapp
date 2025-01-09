import React from "react";
import { Container } from "@chakra-ui/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container centerContent py={10}>
      {children}
    </Container>
  );
}
