import * as React from "react";
import "./index.scss";
import { useAppSelector } from "../../store/hooks";
import {
    getBooksListSelector,
    getBooksLoadingSelector,
} from "../../store/books";
import BooksList from "../../components/ui/cardsList/booksList";

const MainPage = () => {
    const books = useAppSelector(getBooksListSelector());
    const booksLoading = useAppSelector(getBooksLoadingSelector());
    return (
        <div className="text-center">
            {!booksLoading ? (
                <BooksList books={books} />
            ) : (
                <div
                    className="spinner-border mt-5"
                    style={{ width: "5rem", height: "5rem" }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    );
};

export default MainPage;
