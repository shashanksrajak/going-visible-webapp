import React from "react";
import {
  Flex,
  // IconButton,
  Text,
  Container,
  HStack,
  Box,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
// import { LuBell } from "react-icons/lu";
import NextLink from "next/link";

import { Avatar } from "@/components/ui/avatar";

import MobileNavigation from "./MobileNavigation";
import { Bell } from "lucide-react";

const TopNavigation: React.FC = () => {
  return (
    <Container py={2} borderBottomWidth={1}>
      <Flex justify="space-between" align="center">
        <HStack
          alignItems={"center"}
          justifyContent={"space-between"}
          width="100%"
        >
          <HStack gap={0}>
            <MobileNavigation />
            <Box display={{ base: "flex", md: "none" }}>
              <Text fontWeight={"semibold"} fontSize={"lg"}>
                Going Visible
              </Text>
            </Box>
          </HStack>

          <HStack gap={4}>
            <IconButton
              variant={"plain"}
              aria-label="Notifications"
              size={"lg"}
              alignItems={"center"}
            >
              <Bell />
            </IconButton>
            <ChakraLink asChild>
              <NextLink href="/settings/account">
                <Avatar
                  name="Segun Adebayo"
                  src="https://bit.ly/sage-adebayo"
                />
              </NextLink>
            </ChakraLink>
          </HStack>
        </HStack>
      </Flex>
    </Container>
  );
};

export default TopNavigation;
