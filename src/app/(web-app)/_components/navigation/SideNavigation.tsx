import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

import NavigationItems from "./NavigationItems";

export default function SideNavigation() {
  return (
    <Box py={5}>
      <Box px={5} mb={5}>
        {/* logo */}

        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Going Visible
        </Text>
      </Box>
      <VStack alignItems={"flex-start"} gap={0}>
        <NavigationItems />
      </VStack>
    </Box>
  );
}
