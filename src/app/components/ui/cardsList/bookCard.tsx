import React from "react";
import { VoliumInfo } from "../../../store/books";

interface BookCardProps extends VoliumInfo {
    onClick: () => void;
}

const BookCard = ({
    title,
    imageLinks,
    categories,
    authors,
    onClick,
}: BookCardProps) => {
    return (
        <div
            className="bookCard"
            onClick={onClick}
            key={title + imageLinks?.thumbnail}
        >
            <div className="bookCard__img">
                <img
                    src={imageLinks?.thumbnail ? imageLinks.thumbnail : ""}
                    alt="Обложка отсутствует"
                />
            </div>
            <div className="bookCard__categories">
                {categories && categories.length > 0 && (
                    <span className="badge text-bg-secondary ">
                        {categories[0]}
                    </span>
                )}
            </div>
            <span className="bookCard__title fw-bold">{title}</span>
            <div className="bookCard__authors">
                {authors &&
                    authors.length > 0 &&
                    authors.map((v, i) => {
                        return (
                            <span key={v + i}>
                                {v + (i + 1 === authors.length ? "" : ", ")}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
};

export default BookCard;
