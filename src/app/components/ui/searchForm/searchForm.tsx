import React, { useState, useEffect } from "react";
import TextField from "../../common/textField";
import "./index.scss";
import SelectField from "../../common/selectField";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../store/categories";
import { getSerchedStatusSelector, loadBooksList } from "../../../store/books";
import { useNavigate } from "react-router-dom";

export interface ParamsState {
    category: string;
    sortBy: "1" | "2";
}

const SearchForm = () => {
    const dispatch = useAppDispatch();
    const navgate = useNavigate();

    const [serchTxt, setSerchTxt] = useState<string>("");
    const [error, setError] = useState<string>("");
    const serchedStatus = useAppSelector(getSerchedStatusSelector());
    const [params, setParams] = useState<ParamsState>({
        category: "1",
        sortBy: "1",
    });
    const categories = useAppSelector(getCategories());
    const sorters: { id: string; name: string; eng: "relevance" | "newest" }[] =
        [
            { id: "1", name: "по релевантности", eng: "relevance" },
            { id: "2", name: "по дате", eng: "newest" },
        ];

    useEffect(() => {
        if (serchedStatus) {
            dispatch(
                loadBooksList(serchedStatus, {
                    sortBy:
                        sorters.find((v) => v.id === params.sortBy)?.eng ||
                        "relevance",
                    category:
                        categories.find((v) => v.id === params.category)?.eng ||
                        "all",
                })
            );
        }
    }, [params]);

    useEffect(() => {
        setError("");
    }, [serchTxt]);

    const handleChangeSerch = (value: string) => {
        setSerchTxt(value);
    };

    const handleChangeParams = (value: { [name: string]: string }) => {
        setParams((p) => ({ ...p, ...value }));
    };

    const handleSubmit = (
        e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>
    ) => {
        e.preventDefault();
        navgate("/");

        if (serchTxt !== "") {
            dispatch(
                loadBooksList(serchTxt, {
                    sortBy:
                        sorters.find((v) => v.id === params.sortBy)?.eng ||
                        "relevance",
                    category:
                        categories.find((v) => v.id === params.category)?.eng ||
                        "all",
                })
            );
        } else {
            setError("Название должно содержать минимум 1 символ");
        }
    };

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <TextField
                placeholder="Введите название книги"
                value={serchTxt}
                name="serchTxt"
                onChange={handleChangeSerch}
                error={error}
            />
            <div className="searchForm__selects">
                <SelectField
                    label="Категория"
                    value={params.category}
                    onChange={handleChangeParams}
                    defaultOption="Выберите категорию"
                    options={categories}
                    name="category"
                />
                <SelectField
                    label="Сортировка"
                    value={params.sortBy}
                    onChange={handleChangeParams}
                    options={sorters}
                    name="sortBy"
                />
            </div>
        </form>
    );
};

export default SearchForm;
