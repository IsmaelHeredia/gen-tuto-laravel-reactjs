import InitialState, { UpdateNameAction } from "@customTypes/redux/themes";
import { createSlice } from "@reduxjs/toolkit";
import { theme as light_green } from "@skins/light_green";
import { theme as dark_green } from "@skins/dark_green";
import { theme as light_red } from "@skins/light_red";
import { theme as dark_red } from "@skins/dark_red";
import { theme as light_blue } from "@skins/light_blue";
import { theme as dark_blue } from "@skins/dark_blue";
import { theme as light_gruvbox } from "@skins/light_gruvbox";
import { theme as dark_gruvbox } from "@skins/dark_gruvbox";

/*

Theme Mode : [1] Light [2] Dark
Theme Color : [1] Green [2] Red [3] Blue [4] Gruvbox 

*/

const initialState: InitialState = {
    theme_mode: 2,
    theme_color: 4, 
    theme_style: dark_gruvbox
};

export const themesSlice = createSlice({
  name: UpdateNameAction,
  initialState: initialState,
  reducers: {

    changeMode: (state) => {

        if(state.theme_mode == 1) {
            state.theme_mode = 2;
        } else {
            state.theme_mode = 1;
        }

        if(state.theme_color == 1) {

            if(state.theme_mode == 1) {
                state.theme_style = light_green;
            } else {
                state.theme_style = dark_green;
            }

        } else if (state.theme_color == 2) {

            if(state.theme_mode == 1) {
                state.theme_style = light_red;
            } else {
                state.theme_style = dark_red;
            }

        } else if (state.theme_color == 3) {

            if(state.theme_mode == 1) {
                state.theme_style = light_blue;
            } else {
                state.theme_style = dark_blue;
            }

        } else if (state.theme_color == 4) {

            if(state.theme_mode == 1) {
                state.theme_style = light_gruvbox;
            } else {
                state.theme_style = dark_gruvbox;
            }
        }

    },

    changeTheme: (state) => {

        if(state.theme_color == 1) {

            state.theme_color = 2;

            if(state.theme_mode == 1) {
                state.theme_style = light_red;
            } else {
                state.theme_style = dark_red;
            }

        } else if (state.theme_color == 2) {

            state.theme_color = 3;

            if(state.theme_mode == 1) {
                state.theme_style = light_blue;
            } else {
                state.theme_style = dark_blue;
            }

        } else if (state.theme_color == 3) {

            state.theme_color = 4;

            if(state.theme_mode == 1) {
                state.theme_style = light_gruvbox;
            } else {
                state.theme_style = dark_gruvbox;
            }

        } else if (state.theme_color == 4) {

            state.theme_color = 1;

            if(state.theme_mode == 1) {
                state.theme_style = light_green;
            } else {
                state.theme_style = dark_green;
            }
        }
    },
  },
});

export const {  changeMode, changeTheme } = themesSlice.actions;

export default themesSlice.reducer;