import React from "react";
import { Card, VStack } from "@chakra-ui/react";

import NavigationItems from "./NavigationItems";

export default function SideNavigation() {
  return (
    <Card.Root shadow={"md"}>
      <Card.Body>
        <VStack alignItems={"flex-start"} gap={4}>
          <NavigationItems />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
