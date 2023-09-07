import * as React from "react";
import "./index.scss";
import SearchForm from "../../components/searchForm/searchForm";

const MainPage = () => {
    return (
        <div>
            <header className="mainPage__header">
                <div className="mb-3">
                    <h2>Поиск книг</h2>
                </div>
                <SearchForm />
            </header>
        </div>
    );
};

export default MainPage;
