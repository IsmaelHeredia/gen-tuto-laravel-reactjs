import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

export const theme = createTheme({
  typography: {
    "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18,
    "fontWeightLight": 300,
    "fontWeightRegular": 700,
    "fontWeightMedium": 500
  },
  palette: {
    mode: "light",
    primary: palette.augmentColor({
      color: {
        main: "#bd0b25",
        contrastText: "#ffffff",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#006874",
        contrastText: "#ffffff",
      },
    }),
    text: {
      primary: "#1C1B1F",
      secondary: "#1C1B1F",
    },
    background: {
      default: "#FFFBFE",
      paper: "#fffbff",
    },
    error: palette.augmentColor({
      color: {
        main: "#B3261E",
        contrastText: "#FFFFFF",
      },
    }),
    success: palette.augmentColor({
      color: {
        main: "#006e10",
        contrastText: "#ffffff",
      },
    }),
    info: palette.augmentColor({
      color: {
        main: "#0062a2",
        contrastText: "#ffffff",
      },
    }),
    warning: palette.augmentColor({
      color: {
        main: "#606200",
        contrastText: "#313300",
      },
    }),
    divider: "#79747E",
    upvote: palette.augmentColor({
      color: {
        main: "#bd0b25",
        contrastText: "#ffffff",
      },
    }),
    downvote: palette.augmentColor({
      color: {
        main: "#006874",
        contrastText: "#ffffff",
      },
    }),
    containerPrimary: palette.augmentColor({
      color: {
        main: "#ffdad6",
        contrastText: "#410005",
      },
    }),
    containerSecondary: palette.augmentColor({
      color: {
        main: "#ffdad8",
        contrastText: "#2d1514",
      },
    }),
  }
})