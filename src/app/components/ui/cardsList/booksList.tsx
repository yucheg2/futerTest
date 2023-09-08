import * as React from "react";
import BookCard from "./bookCard";
import { Book } from "../../../store/books";
import "./index.scss";

const BooksList = ({ books }: { books: Book[] }) => {
    return (
        <div className="booksList">
            {books &&
                books.length > 0 &&
                books.map((b) => {
                    return <BookCard key={b.id} {...b.volumeInfo} />;
                })}
        </div>
    );
};

export default BooksList;
