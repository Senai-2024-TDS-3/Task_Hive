import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/TaskHive_Black.png";
import Dark_Mode from "./Dark_Mode";

export default function User_Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Limpa os dados do localStorage
        navigate("/"); // Redireciona para a página inicial
    };

    return (
        <nav className="navbar">
            <img src={Logo} alt="Logo" />
            <ul>
                <li>
                    <NavLink to="/user_visualizar_tasks" activeClassName="active-link">
                        Visualizar Tarefas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user_cadastrar_task" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Cadastrar Tarefa
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user-gerenciar-task" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Gerenciar Tarefa
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user-gerenciar-task" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Gerenciar Usuário
                    </NavLink>
                </li>
                <li>
                <NavLink to="" onClick={handleLogout} className={({ isActive }) => (isActive ? "active-link-logout" : "")}>
                        Sair
                    </NavLink>
                </li>
            </ul>
            <Dark_Mode />
        </nav>
    );
}
