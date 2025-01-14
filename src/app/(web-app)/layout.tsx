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
      {/* <Container maxWidth={"breakpoint-lg"} mt={4} px={0}> */}
      <Grid templateColumns={{ base: "1fr", md: "290px 1fr" }} height="100vh">
        <GridItem
          overflowY="auto"
          colSpan={1}
          display={{ base: "none", md: "block" }}
          bgColor={"gray.100"}
        >
          {/* side navigation */}
          <SideNavigation />
        </GridItem>

        <GridItem overflowY="auto" colSpan={{ base: 1, md: 1 }}>
          {/* main area */}
          <TopNavigation />
          <Container py={4}>{children}</Container>
        </GridItem>
      </Grid>
      {/* </Container> */}
    </>
  );
}
