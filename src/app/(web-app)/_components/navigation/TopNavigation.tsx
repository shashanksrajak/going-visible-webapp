import React from "react";
import {
  Flex,
  Text,
  // IconButton,
  Container,
  HStack,
  Box,
  Link as ChakraLink,
} from "@chakra-ui/react";
// import { LuBell } from "react-icons/lu";
import NextLink from "next/link";

import { Avatar } from "@/components/ui/avatar";

import MobileNavigation from "./MobileNavigation";

const TopNavigation: React.FC = () => {
  return (
    <Container bg="blue.700" py={4}>
      <Flex justify="space-between" align="center">
        <Text color="white" fontSize="lg" fontWeight="bold">
          Going Visible
        </Text>

        <HStack alignItems={"center"} justifyContent={"space-between"}>
          {/* <IconButton variant={"ghost"}>
            <LuBell />
          </IconButton> */}

          <Box>
            <ChakraLink asChild>
              <NextLink href="/settings/account">
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
              </NextLink>
            </ChakraLink>
          </Box>

          <MobileNavigation />
        </HStack>
      </Flex>
    </Container>
  );
};

export default TopNavigation;
