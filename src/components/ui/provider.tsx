"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import designSystem from "@/lib/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={designSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
