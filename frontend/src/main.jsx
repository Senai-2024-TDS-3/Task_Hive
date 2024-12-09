import ReactDOM from "react-dom/client"; // Importação do ReactDOM para renderizar a aplicação
import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom"; // Bibliotecas de roteamento
import App from "./App"; // Componente principal da aplicação
import User_Start from "./pages/User_Start"; // Página inicial do usuário
import User_Cadastrar_Task from "./components/user/User_Cadastrar_Task"; // Componente para cadastrar tarefa do usuário
import User_Visualizar_Tasks from "./components/user/User_Visualizar_Tasks"; // Componente para visualizar tarefas do usuário
import User_Gerenciar_Task from "./components/user/User_Gerenciar_Task"; // Componente para gerenciar tarefas do usuário
import User_Gerenciar_User from "./components/user/User_Gerenciar_User"; // Componente para gerenciar conta do usuário
import Redefinir_Senha from "./pages/Redefinir_Senha"; // Página para redefinir senha
import Admin_Start from "./pages/Admin_Start"; // Página inicial do administrador
import Admin_Cadastro from "./pages/Admin_Cadastro"; // Página de cadastro do administrador
import Admin_Visualizar_User from "./components/admin/Admin_Visualizar_User"; // Componente para visualizar usuários do administrador
import Admin_Visualizar_Tasks from "./components/admin/Admin_Visualizar_Tasks"; // Componente para visualizar tarefas do administrador
import Admin_Gerenciar_Task from "./components/admin/Admin_Gerenciar_Task"; // Componente para gerenciar tarefas do administrador
import Admin_Gerenciar_User from "./components/admin/Admin_Gerenciar_User"; // Componente para gerenciar usuários do administrador
import "./index.css"; // Estilos globais

// Definição das rotas da aplicação
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // Componente principal que será renderizado na rota raiz
    },
    {
        path: "/user_start",
        element: <User_Start />, // Página inicial do usuário
    },
    {
        path: "/admin_start",
        element: <Admin_Start />, // Página inicial do administrador
    },
    {
        path: "/user_cadastrar_task",
        element: <User_Cadastrar_Task />, // Componente para cadastrar tarefas do usuário
    },
    {
        path: "/user_visualizar_task",
        element: <User_Visualizar_Tasks /> // Componente para visualizar tarefas do usuário
    },
    {
        path: "/user_visualizar_task/:id", // Rota dinâmica para gerenciar tarefa específica do usuário
        element: <User_Gerenciar_Task /> // Componente que usa o ID da tarefa
    },
    {
        path: "/user_gerenciar_user/:id", // Rota dinâmica para gerenciar conta do usuário
        element: <User_Gerenciar_User />
    },
    {
        path: "/admin_visualizar_user",
        element: <Admin_Visualizar_User /> // Componente para visualizar usuários no painel administrativo
    },
    {
        path: "/admin_visualizar_user/:id", // Rota dinâmica para gerenciar usuário específico
        element: <Admin_Gerenciar_User /> // Componente que usa o ID do usuário
    },
    {
        path: "/admin_visualizar_task",
        element: <Admin_Visualizar_Tasks /> // Componente para visualizar tarefas no painel administrativo
    },
    {
        path: "/admin_visualizar_task/:id", // Rota dinâmica para gerenciar tarefa específica no painel administrativo
        element: <Admin_Gerenciar_Task /> // Componente que usa o ID da tarefa
    },
    {
        path: "/admin_cadastro",
        element: <Admin_Cadastro /> // Componente para cadastro de um novo administrador
    },
    {
        path: "/redefinir-senha",
        element: <Redefinir_Senha /> // Página para redefinir senha
    },
]);

// Renderiza o componente principal com o roteador configurado
ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} /> // O RouterProvider fornece a configuração de roteamento para a aplicação
);
