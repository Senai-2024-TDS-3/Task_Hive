import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import User_Start from "./pages/User_Start";
import User_Cadastrar_Task from "./components/user/User_Cadastrar_Task";
import Admin_Start from "./pages/Admin_Start";
import Admin_Cadastro from "./pages/Admin_Cadastro";
import Admin_Visualizar_User from "./components/admin/Admin_Visualizar_User";
import Admin_Visualizar_Tasks from "./components/admin/Admin_Visualizar_Tasks";

import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/user_start",
        element: <User_Start />,
    },
    {
        path: "/admin_start",
        element: <Admin_Start />,
    },
	{
		path: "/user_cadastrar_task",
		element: <User_Cadastrar_Task />,
	},
	{
		path: "/admin_visualizar_user",
		element: <Admin_Visualizar_User />,
	},
	{
		path: "/admin_visualizar_task",
		element: <Admin_Visualizar_Tasks />
	},
    {
        path: "/admin_cadastro",
        element: <Admin_Cadastro />
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);