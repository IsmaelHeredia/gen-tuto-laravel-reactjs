import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RootState } from "@reduxConfig/index";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, changeTheme } from "@reduxConfig/slices/themesSlice";
import IconButton from "@mui/material/IconButton";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PaletteIcon from "@mui/icons-material/Palette";
import PageTitle from "@components/PageTitle";

const Layout = ({ children }: { children: React.ReactNode }) => {
 
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
            <PageTitle title="Ingreso" />
            <ThemeProvider theme={themes.theme_style}>
                <CssBaseline />
                <div className="navbar-right">
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
                </div>
                <div className="ingreso">
                    {children}
                </div>
                <div>
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

export default Layout;