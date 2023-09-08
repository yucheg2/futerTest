import React from "react";
import { VoliumInfo } from "../../../store/books";

const BookCard = ({ title, imageLinks, categories, authors }: VoliumInfo) => {
    return (
        <div className="bookCard" key={title + imageLinks.thumbnail}>
            <img src={imageLinks.thumbnail} alt="Обложка" />
            <div className="bookCard__categories">
                {categories &&
                    categories.length > 0 &&
                    categories.map((v, i) => {
                        return <div key={v + i}>{v}</div>;
                    })}
            </div>
            <span>{title}</span>
            <div className="bookCard__authors">
                {authors &&
                    authors.length > 0 &&
                    authors.map((v) => {
                        return <div key={v}>{v}</div>;
                    })}
            </div>
        </div>
    );
};

export default BookCard;
