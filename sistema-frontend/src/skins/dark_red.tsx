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
    mode: "dark",
    primary: palette.augmentColor({
      color: {
        main: "#ffb3b0",
        contrastText: "#68000c",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#4fd8eb",
        contrastText: "#00363d",
      },
    }),
    text: {
      primary: "#E6E1E5",
      secondary: "#E6E1E5",
    },
    background: {
      default: "#1C1B1F",
      paper: "#1C1B1F",
    },
    error: palette.augmentColor({
      color: {
        main: "#F2B8B5",
        contrastText: "#601410",
      },
    }),
    success: palette.augmentColor({
      color: {
        main: "#79dd72",
        contrastText: "#003a03",
      },
    }),
    info: palette.augmentColor({
      color: {
        main: "#99cbff",
        contrastText: "#003257",
      },
    }),
    warning: palette.augmentColor({
      color: {
        main: "#cace09",
        contrastText: "#313300",
      },
    }),
    divider: "#938F99",
    upvote: palette.augmentColor({
      color: {
        main: "#bd0b25",
        contrastText: "#68000c",
      },
    }),
    downvote: palette.augmentColor({
      color: {
        main: "#4fd8eb",
        contrastText: "#00363d",
      },
    }),
    containerPrimary: palette.augmentColor({
      color: {
        main: "#920016",
        contrastText: "#ffdad6",
      },
    }),
    containerSecondary: palette.augmentColor({
      color: {
        main: "#5c3f3d",
        contrastText: "#ffdad8",
      },
    }),
  }
})