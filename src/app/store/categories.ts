import { RootState } from "./index";
import { createSlice } from "@reduxjs/toolkit";

interface StateInterface {
    entieties: { name: string; id: string; eng: string }[];
}

const initialState: StateInterface = {
    entieties: [
        { name: "Все", id: "1", eng: "all" },
        { name: "Художественная", id: "2", eng: "art" },
        { name: "Биография", id: "3", eng: "biography" },
        { name: "Информатика", id: "4", eng: "computers" },
        { name: "История", id: "5", eng: "history" },
        { name: "Медицина", id: "6", eng: "medical" },
        { name: "Поэзия", id: "7", eng: "poetry" },
    ],
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
});

const { reducer: categoriesReducer } = categoriesSlice;

//selectors

export const getCategories = () => (state: RootState) =>
    state.categories.entieties;

export default categoriesReducer;
