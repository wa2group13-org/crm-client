import { createTheme } from "@mui/material";

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
    MuiLink: {
      defaultProps: {
        target: "_blank",
      },
    },
  },
});
