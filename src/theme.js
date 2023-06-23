import { createBreakpoints } from "@mui/system";

export const themeSettings = (mode) => {
  const breakpoints = createBreakpoints({
    values: {
      xs: 0,
      sm: 600,
      md: 920,
      lg: 1280,
      xl: 1920,
    },
  });
  return {
    breakpoints: breakpoints,
    overrides: {
      MuiIconButton: {
        root: {
          "&:hover": {
            backgroundColor: "#ffffff",
          },
        },
      },
      MuiOutlinedInput: {
        root: {
          border: "1px solid red",
        },
      },
    },
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: "#121212",
            },
            secondary: {
              main: "#ffffff",
              link: "#527ab7",
              headerLinks: "#b0b0b0",
            },
            background: {
              default: "#2f2f2f",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: "#ffffff",
            },
            secondary: {
              main: "#000000",
              link: "#527ab7",
              headerLinks: "#b9b9b9",
            },
            background: {
              default: "#ffffff",
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 50,
        fontWeight: 800,
        [breakpoints.down("md")]: {
          fontSize: 30,
        },
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
