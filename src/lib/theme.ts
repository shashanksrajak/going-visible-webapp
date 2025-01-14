import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    html: {},
  },
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#a3cfff" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#173da6" },
          800: { value: "#1a3478" },
          900: { value: "#14204a" },
          950: { value: "#0c142e" },
        },
        secondary: {
          50: { value: "#fff8e6" },
          100: { value: "#ffecb3" },
          200: { value: "#ffe082" },
          300: { value: "#ffd54f" },
          400: { value: "#ffcc29" },
          500: { value: "#ffb500" },
          600: { value: "#db9600" },
          700: { value: "#b37700" },
          800: { value: "#8b5900" },
          900: { value: "#5c3900" },
          950: { value: "#341f00" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: "{colors.primary.600}" },
          contrast: { value: "{colors.primary.100}" },
          fg: { value: "{colors.primary.700}" },
          muted: { value: "{colors.primary.100}" },
          subtle: { value: "{colors.primary.200}" },
          emphasized: { value: "{colors.primary.300}" },
          focusRing: { value: "{colors.primary.500}" },
        },
        secondary: {
          solid: { value: "{colors.secondary.600}" },
          contrast: { value: "{colors.secondary.100}" },
          fg: { value: "{colors.secondary.700}" },
          muted: { value: "{colors.secondary.100}" },
          subtle: { value: "{colors.secondary.200}" },
          emphasized: { value: "{colors.secondary.300}" },
          focusRing: { value: "{colors.secondary.500}" },
        },
      },
    },
  },
});

const designSystem = createSystem(defaultConfig, config);

export default designSystem;
