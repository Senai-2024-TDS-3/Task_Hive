import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
	},
	{
		path: "/cadastrar-task",
		element: "<Tarefas />"
	},
	{
		path: "/admin-gerenciar-use",
		element: "<Usuários />"
	}
])

ReactDOM.createRoot(document.getElementById("root")).render(
		<RouterProvider router={router}/>


);