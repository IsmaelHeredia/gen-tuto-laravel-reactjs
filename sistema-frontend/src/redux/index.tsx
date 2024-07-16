import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "@reduxConfig/slices/filtersSlice";
import themesReducer from "@reduxConfig/slices/themesSlice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    themes: themesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;