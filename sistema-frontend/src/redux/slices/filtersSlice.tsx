import InitialState, { UpdateCounterAction } from "@customTypes/redux/filters";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
    nombre: "",
    id_genero: 0,
    nombre_genero: "",
    id_dificultad: 0,
    nombre_dificultad: "",
    id_afinacion: 0,
    nombre_afinacion: ""
};

export const filtersSlice = createSlice({
  name: UpdateCounterAction,
  initialState: initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<any>) => {
      state.nombre = action.payload.nombre;
      state.id_genero = action.payload.id_genero;
      state.nombre_genero = action.payload.nombre_genero;
      state.id_dificultad = action.payload.id_dificultad;
      state.nombre_dificultad = action.payload.nombre_dificultad;
      state.id_afinacion = action.payload.id_afinacion;
      state.nombre_afinacion = action.payload.nombre_afinacion;
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export default filtersSlice.reducer;