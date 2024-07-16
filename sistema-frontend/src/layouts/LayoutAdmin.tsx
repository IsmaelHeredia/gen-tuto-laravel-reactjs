import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chart from "@components/Chart";
import Account from "@components/Account";
import About from "@components/About";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@reduxConfig/index";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, changeTheme } from "@reduxConfig/slices/themesSlice";
import PageTitle from "@components/PageTitle";

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {

    axios.defaults.headers.common["Authorization"] = "Bearer " + sessionStorage.getItem(String(import.meta.env.VITE_SESSION_NAME));

    const navigate = useNavigate();

    const handleClickLogOut = () => {

        toast.success("La sesion fue cerrada", {autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST)});
    
        sessionStorage.setItem(import.meta.env.VITE_SESSION_NAME, "");

        setTimeout(() => {
            navigate("/ingreso");
        }, Number(import.meta.env.VITE_TIMEOUT_REDIRECT));

    }

    const themes: any = useSelector(
        (state: RootState) => state.themes
    );

    const dispatch = useDispatch();

    const handleClickSetLight = () => {
        dispatch(changeMode());
    };

    const handleClickSetDark = () => {
        dispatch(changeMode());
    };

    const handleClickChangeTheme = () => {
        dispatch(changeTheme());
    };

    return(
        <>
            <PageTitle title="Generador" />
            <ThemeProvider theme={themes.theme_style}>
                <CssBaseline />
                <AppBar position="fixed" enableColorOnDark>
                    <Toolbar color="primary">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Generador de tutoriales
                        </Typography>
                        {themes.theme_mode == 2 &&
                            <IconButton onClick={ handleClickSetDark }>
                                <WbSunnyIcon />
                            </IconButton>
                        }
                        {
                        themes.theme_mode == 1 &&
                            <IconButton onClick={ handleClickSetLight }>
                                <DarkModeIcon />
                            </IconButton>
                        }
                        <IconButton onClick={ handleClickChangeTheme }>
                            <PaletteIcon />
                        </IconButton>
                        <Chart />
                        <About />
                        <Account />
                        <IconButton onClick={ handleClickLogOut }>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {children}
                <div style={{ marginTop: "15px" }}>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </ThemeProvider>
        </>
    );

};

export default LayoutAdmin;