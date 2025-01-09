import React from "react";
import { Flex, Text, IconButton, Container, HStack } from "@chakra-ui/react";
import { LuBell } from "react-icons/lu";

import MobileNavigation from "./MobileNavigation";

const TopNavigation: React.FC = () => {
  return (
    <Container bg="blue.700" py={4}>
      <Flex justify="space-between" align="center">
        <Text color="white" fontSize="lg" fontWeight="bold">
          Going Visible
        </Text>

        <HStack>
          <IconButton variant={"ghost"}>
            <LuBell />
          </IconButton>

          <MobileNavigation />
        </HStack>
      </Flex>
    </Container>
  );
};

export default TopNavigation;
