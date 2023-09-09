import MainLayout from "../layouts/MainLayout";
import BookPage from "../pages/mainPage/bookPage";
import MainPage from "../pages/mainPage/mainPage";

import { Navigate } from "react-router-dom";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            {
                path: ":bookId",
                element: <BookPage />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />,
    },
];

export default routes;
