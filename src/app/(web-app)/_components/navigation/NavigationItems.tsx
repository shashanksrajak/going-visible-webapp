import React from "react";
import { HStack, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

import {
  LuCalendarClock,
  LuFlaskConical,
  LuGauge,
  LuHouse,
  LuPill,
  LuSmilePlus,
} from "react-icons/lu";

import { navigationList } from "./navigationList";

const iconMap = {
  LuCalendarClock,
  LuFlaskConical,
  LuGauge,
  LuHouse,
  LuPill,
  LuSmilePlus,
};

export default function NavigationItems() {
  return (
    <>
      {navigationList.map((item) => {
        // @ts-expect-error - We know that item.icon is a string
        const IconComponent = iconMap[item.icon]; // Get the icon component
        return (
          <ChakraLink key={item.href} asChild>
            <NextLink href={item.href}>
              <HStack>
                {IconComponent && <IconComponent />} {/* Render the icon */}
                {item.title}
              </HStack>
            </NextLink>
          </ChakraLink>
        );
      })}
    </>
  );
}
