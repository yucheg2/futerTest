import * as React from "react";
import SearchForm from "../components/ui/searchForm/searchForm";
import "./index.scss";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <div className="mainLayout">
            <header className="header">
                <div className="mb-3">
                    <h1>Поиск книг</h1>
                </div>
                <SearchForm />
            </header>
            <Outlet />
        </div>
    );
};

export default MainLayout;
