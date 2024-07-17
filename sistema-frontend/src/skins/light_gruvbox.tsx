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
        main: "#A7882C",
        contrastText: "#E8DFBB",
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: "#D4954D",
        contrastText: "#625842",
      },
    }),
    text: {
      primary: "#464740",
      secondary: "#1b1c17",
    },
    background: {
      default: "#FBF1CB",
      paper: "#EFE6C1",
    },
    error: palette.augmentColor({
      color: {
        main: "#9d0006",
        contrastText: "#ffffff",
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
        contrastText: "#ffffff",
      },
    }),
    divider: "#75786a"
  }
})