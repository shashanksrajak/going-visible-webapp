import React from "react";
import { HStack, Link as ChakraLink, Text, Box } from "@chakra-ui/react";
import NextLink from "next/link";

import {
  LuCalendarClock,
  LuFlaskConical,
  LuGauge,
  LuHouse,
  LuPill,
  LuSmilePlus,
  LuCircleUser,
} from "react-icons/lu";

import { navigationList } from "./navigationList";

const iconMap = {
  LuCalendarClock,
  LuFlaskConical,
  LuGauge,
  LuHouse,
  LuPill,
  LuSmilePlus,
  LuCircleUser,
};

export default function NavigationItems() {
  return (
    <>
      {navigationList.map((item) => {
        return (
          <Box key={item.group} mb={5}>
            <Text
              px={5}
              textTransform={"uppercase"}
              fontSize={"sm"}
              fontWeight={"semibold"}
              color={"gray.500"}
            >
              {item.group}
            </Text>
            {item.menu.map((menuItem) => {
              const IconComponent =
                iconMap[menuItem.icon as keyof typeof iconMap]; // Get the icon component
              return (
                <ChakraLink
                  key={menuItem.href}
                  asChild
                  px={5}
                  py={2}
                  width={"100%"}
                  borderRight={menuItem.active ? "4px solid blue" : "none"}
                >
                  <NextLink href={menuItem.href}>
                    <HStack>
                      {IconComponent && <IconComponent />}{" "}
                      {/* Render the icon */}
                      <Text fontWeight={"semibold"}> {menuItem.title}</Text>
                    </HStack>
                  </NextLink>
                </ChakraLink>
              );
            })}
          </Box>
        );
      })}
    </>
  );
}
