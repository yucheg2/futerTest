import * as React from "react";
import "./index.scss";
import SearchForm from "../../components/ui/searchForm/searchForm";
import { useAppSelector } from "../../store/hooks";
import {
    getBooksListSelector,
    getBooksLoadingSelector,
} from "../../store/books";
import BooksList from "../../components/ui/cardsList/booksList";

const MainPage = () => {
    const books = useAppSelector(getBooksListSelector());
    const booksLoading = useAppSelector(getBooksLoadingSelector());
    console.log(booksLoading);
    return (
        <div>
            <header className="mainPage__header mb-4">
                <div className="mb-3">
                    <h1>Поиск книг</h1>
                </div>
                <SearchForm />
            </header>
            {!booksLoading ? <BooksList books={books} /> : "Загрузка"}
        </div>
    );
};

export default MainPage;
