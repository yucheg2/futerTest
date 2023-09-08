import booksService from "../service/books.service";
import { AppDispatch, AppGetState } from "./index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

export interface VoliumInfo {
    title: string;
    imageLinks: {
        thumbnail: string;
    };
    categories: string[];
    authors: string[];
}
export interface Book {
    id: string;
    volumeInfo: VoliumInfo;
}

interface StateInterface {
    entieties: Book[];
    loding: {
        entieties: boolean;
    };
    quantity: number;
}

const initialState: StateInterface = {
    entieties: [],
    loding: {
        entieties: false,
    },
    quantity: 30,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        listRequested(state) {
            state.loding.entieties = true;
        },
        resived(state, { payload }: PayloadAction<[]>) {
            state.entieties = payload;
            state.loding.entieties = false;
        },
    },
});

const { reducer: booksReducer, actions } = booksSlice;
const { listRequested, resived } = actions;

export const loadBooksList =
    (
        serchTxt: string,
        params: { sortBy: "relevance" | "newest"; category: string }
    ) =>
    async (dispatch: AppDispatch, getState: AppGetState) => {
        dispatch(listRequested());
        try {
            const data = await booksService.getBooks(
                serchTxt,
                params,
                getState().books.quantity
            );
            dispatch(resived(data.items));
        } catch (error) {
            console.log(error);
        }
    };

//selectors

export const getBooksListSelector = () => (state: RootState) =>
    state.books.entieties;
export const getBooksLoadingSelector = () => (state: RootState) =>
    state.books.loding.entieties;

export default booksReducer;
