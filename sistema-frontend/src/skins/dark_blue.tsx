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
            main: "#cdbeff",
            contrastText: "#32009a",
        },
    }),
    secondary: palette.augmentColor({
        color: {
            main: "#cac3dc",
            contrastText: "#322e41",
        },
    }),
    text: {
        primary: "#e6e1e6",
        secondary: "#e6e1e6",
    },
    background: {
        default: "#1c1b1e",
        paper: "#1c1b1e",
    },
    error: palette.augmentColor({
        color: {
            main: "#ffb4a9",
            contrastText: "#680003",
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
    divider: "#938f99",
    upvote: palette.augmentColor({
        color: {
            main: "#cdbeff",
            contrastText: "#32009a",
        },
    }),
    downvote: palette.augmentColor({
        color: {
            main: "#ffb4a9",
            contrastText: "#680003",
        },
    }),
    containerPrimary: palette.augmentColor({
        color: {
            main: "#4b24ba",
            contrastText: "#e8deff",
        },
    }),
    containerSecondary: palette.augmentColor({
        color: {
            main: "#494458",
            contrastText: "#e7dff8",
        },
    }),
  }
})