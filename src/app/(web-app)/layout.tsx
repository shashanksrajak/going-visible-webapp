import React from "react";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import TopNavigation from "./_components/navigation/TopNavigation";
import SideNavigation from "./_components/navigation/SideNavigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavigation />

      <Container maxWidth={"breakpoint-lg"} mt={4} px={0}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          <GridItem
            colSpan={{ base: 0, md: 1 }}
            display={{ base: "none", md: "block" }}
          >
            {/* side navigation */}
            <SideNavigation />
          </GridItem>

          <GridItem colSpan={{ base: 1, md: 4 }}>
            {/* main area */}
            {children}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
}
