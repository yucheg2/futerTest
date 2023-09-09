import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { Book, getBookSelector } from "../../store/books";
import booksService from "../../service/books.service";

const BookPage = () => {
    const navigate = useNavigate();
    const { bookId } = useParams();
    const bookInStore = useAppSelector(getBookSelector(bookId));
    const [book, setBook] = useState<Book | undefined>(bookInStore);

    const loadBook = async () => {
        try {
            const loaded = await booksService.getBookById(bookId || "");
            if (!loaded) {
                navigate("/");
            } else {
                setBook(loaded);
            }
        } catch (error) {
            navigate("/");
        }
    };

    useEffect(() => {
        if (!book) {
            loadBook();
        }
    }, [bookId]);

    console.log(book);
    return book ? (
        <div className="bookPage">
            <div className="bookPage__img">
                <img
                    src={book?.volumeInfo?.imageLinks?.thumbnail}
                    alt="Обложка отсутствует"
                />
            </div>
            <div className="bookPage__info">
                <div className="mb-3">
                    {book.volumeInfo?.categories &&
                        book.volumeInfo.categories.map((category) => {
                            return (
                                <span
                                    className="mr-2 badge text-bg-secondary fs-6"
                                    key={category}
                                >
                                    {category}
                                </span>
                            );
                        })}
                </div>
                <span className="fw-bold">{book.volumeInfo.title}</span>
                <div className="bookPage__authors">
                    {book.volumeInfo.authors &&
                        book.volumeInfo.authors.length > 0 &&
                        book.volumeInfo.authors.map((v, i) => {
                            return (
                                <span key={v + i}>
                                    {v +
                                        (i + 1 ===
                                        book.volumeInfo.authors.length
                                            ? ""
                                            : ", ")}
                                </span>
                            );
                        })}
                </div>
                {book.volumeInfo.description && (
                    <div className="bookPage__description">
                        {book.volumeInfo.description}
                    </div>
                )}
            </div>
        </div>
    ) : (
        <div className="text-center mt-6">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default BookPage;
