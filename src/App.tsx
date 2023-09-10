import { useRoutes } from "react-router-dom";
import "./index.css";
import routes from "./app/routes/routes";
import { useAppSelector } from "./app/store/hooks";
import { getBooksError } from "./app/store/books";
import { useEffect } from "react";

import { toast } from "react-toastify";

function App() {
    const booksErrors = useAppSelector(getBooksError());

    const route = useRoutes(routes);

    useEffect(() => {
        if (booksErrors !== "") {
            toast.error(booksErrors);
        }
    }, [booksErrors]);
    return route;
}

export default App;
