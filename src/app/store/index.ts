import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categoriesReducer from "./categories";
import booksReducer from "./books";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    books: booksReducer,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
