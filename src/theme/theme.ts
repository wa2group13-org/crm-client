import { createTheme } from "@mui/material";
import {} from "@mui/material/colors";

export const crmTheme = createTheme({
  palette: {
    primary: {
      main: "#465f9c",
    },
    secondary: {
      main: "#70877d",
    },
    warning: {
      main: "#d8c90c",
    },
    info: {
      main: "#a67eb9",
    },
    success: {
      main: "#76bf79",
    },
  },
  colorSchemes: {
    dark: true,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {},
      },
    },
  },
});
