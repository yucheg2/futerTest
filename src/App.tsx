import { useRoutes } from "react-router-dom";
import "./index.css";
import routes from "./app/routes/routes";
function App() {
    const route = useRoutes(routes);
    return route;
}

export default App;
