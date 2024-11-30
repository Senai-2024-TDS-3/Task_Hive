import ReactDOM from "react-dom/client";
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import User_Start from "./pages/User_Start";
import User_Cadastrar_Task from "./components/user/User_Cadastrar_Task";
import User_Visualizar_Tasks from "./components/user/User_Visualizar_Tasks";
import User_Gerenciar_Task from "./components/user/User_Gerenciar_Task";
import Redefinir_Senha from "./pages/Redefinir_Senha";
import Admin_Start from "./pages/Admin_Start";
import Admin_Cadastro from "./pages/Admin_Cadastro";
import Admin_Visualizar_User from "./components/admin/Admin_Visualizar_User";
import Admin_Visualizar_Tasks from "./components/admin/Admin_Visualizar_Tasks";
import Admin_Gerenciar_Task from "./components/admin/Admin_Gerenciar_Task";
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
        path: "/user_visualizar_task",
        element: <User_Visualizar_Tasks />
    },
    {
        path: "/user_visualizar_task/:id", // Rota com parâmetro dinâmico
        element: <User_Gerenciar_Task /> // Componente que usa o ID
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
        path: "/admin_visualizar_task/:id", // Rota com parâmetro dinâmico
        element: <Admin_Gerenciar_Task /> // Componente que usa o ID
    },
    
    {
        path: "/admin_cadastro",
        element: <Admin_Cadastro />
    },
    {
        path: "/redefinir-senha",
        element: <Redefinir_Senha />
    },
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);