import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

const theme = extendTheme(
  {
    shadows: {
      bottomOutline: "0 0 5px 3px rgba(0, 0, 0, 0.1)",
    },
    fonts: {
      Poppins: `'Poppins', sans-serif`,
    },
    colors: {
      text: {
        primary: "#1E1D22",
        secondary: "#720045",
        tertiary: "#6B6773",
      },
      button: {
        gray: "#FAFAFA",
        primary: "#185C99",
        error: "#D42727",
      },
      status: {
        success: "#36AD2C",
        error: "#F43535",
      },
      brand: {
        maroon: "#720045",
        orange: {
          900: "#1a0e00",
          800: "#4d2b00",
          700: "#804800",
          600: "#b36500",
          500: "#e68100",
          400: "#ff9b1a",
          300: "#ffb14d",
          200: "#ffc780",
          100: "#ffdeb3",
        },
      },
    },
  },
  withProse()
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Routes />
    </ChakraProvider>
  </React.StrictMode>
);
