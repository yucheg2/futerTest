import * as React from "react";
import BookCard from "./bookCard";
import {
    Book,
    getMoreBooksLoadingSelector,
    getSerchedStatusSelector,
    getTotalItem,
    loadMoreBooks,
} from "../../../store/books";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const BooksList = ({ books }: { books: Book[] }) => {
    const serchedStatus = useAppSelector(getSerchedStatusSelector());
    const totalItems = useAppSelector(getTotalItem());
    const navigate = useNavigate();

    const dispath = useAppDispatch();
    const handleLoadMore = () => {
        dispath(loadMoreBooks());
    };

    const moreLoading = useAppSelector(getMoreBooksLoadingSelector());
    return (
        <div className="booksList mt-5">
            {books && books.length > 0 ? (
                <>
                    <span className="fs-5 fw-bold">
                        {"Найдено " + totalItems + " книг"}
                    </span>
                    <div className="booksList__list mt-4">
                        {books.map((b) => {
                            return (
                                <BookCard
                                    onClick={() => navigate("/" + b.id)}
                                    key={b.id}
                                    {...b.volumeInfo}
                                />
                            );
                        })}
                    </div>
                    {books.length % 30 === 0 && (
                        <button
                            onClick={handleLoadMore}
                            className="btn btn-primary fs-3"
                        >
                            {moreLoading ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            ) : (
                                "Загрузить"
                            )}
                        </button>
                    )}
                </>
            ) : (
                serchedStatus && (
                    <span className=" fs-2 fw-bold text-black-50">
                        Книги не найдены
                    </span>
                )
            )}
        </div>
    );
};

export default BooksList;
