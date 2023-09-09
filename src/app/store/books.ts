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
    description: string;
}
export interface Book {
    id: string;
    volumeInfo: VoliumInfo;
}

interface StateInterface {
    entieties: Book[];
    loding: {
        entieties: boolean;
        more: boolean;
    };

    status: {
        serched: string;
        params: { sortBy: "relevance" | "newest"; category: string };
    };
    quantity: number;
    totalItem: number;
}

const initialState: StateInterface = {
    entieties: [],
    status: {
        serched: "",
        params: { sortBy: "relevance", category: "all" },
    },
    loding: {
        entieties: false,
        more: false,
    },
    quantity: 30,
    totalItem: 0,
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        listRequested(state) {
            state.loding.entieties = true;
        },
        loadMoreRequested(state) {
            state.loding.more = true;
        },
        resived(
            state,
            {
                payload,
            }: PayloadAction<{
                item: [];
                serchTxt: string;
                params: { sortBy: "relevance" | "newest"; category: string };
                totalItem: number;
            }>
        ) {
            state.entieties = payload.item;
            state.loding.entieties = false;
            state.totalItem = payload.totalItem;
            state.status.serched = payload.serchTxt;
            state.status.params = payload.params;
        },
        resivedMore(state, { payload }: PayloadAction<[]>) {
            state.entieties = [...state.entieties, ...payload];
            state.loding.more = false;
        },
    },
});

const { reducer: booksReducer, actions } = booksSlice;
const { listRequested, resived, loadMoreRequested, resivedMore } = actions;

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
            dispatch(
                resived({
                    item: data.items,
                    serchTxt,
                    params,
                    totalItem: data.totalItems,
                })
            );
        } catch (error) {
            console.log(error);
        }
    };

export const loadMoreBooks =
    () => async (dispatch: AppDispatch, getState: AppGetState) => {
        dispatch(loadMoreRequested());
        const state = getState();
        try {
            const data = await booksService.getBooks(
                state.books.status.serched,
                state.books.status.params,
                state.books.quantity,
                state.books.entieties.length + 10
            );
            dispatch(resivedMore(data.items));
        } catch (error) {
            console.log(error);
        }
    };

//selectors

export const getBooksListSelector = () => (state: RootState) =>
    state.books.entieties;
export const getBooksLoadingSelector = () => (state: RootState) =>
    state.books.loding.entieties;
export const getSerchedStatusSelector = () => (state: RootState) =>
    state.books.status.serched;
export const getBookSelector = (id: string | undefined) => (state: RootState) =>
    state.books.entieties.find((book) => book.id === id);
export const getMoreBooksLoadingSelector = () => (state: RootState) =>
    state.books.loding.more;
export const getTotalItem = () => (state: RootState) => state.books.totalItem;

export default booksReducer;
