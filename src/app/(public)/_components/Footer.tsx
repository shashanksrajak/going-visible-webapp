import React from "react";

import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bgColor={"gray.900"} as="footer">
      <Box py={8} textAlign="center">
        <Text color={"white"}>
          © {new Date().getFullYear()} Going Visible. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
