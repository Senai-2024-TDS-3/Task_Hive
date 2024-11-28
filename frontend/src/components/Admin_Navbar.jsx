import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/images/TaskHive_Black.png";
import Dark_Mode from "./Dark_Mode";

export default function Admin_Navbar() {
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
                    <NavLink to="/admin_visualizar_task" activeClassName="active-link">
                        Tarefas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin_visualizar_user" activeClassName="active-link">
                        Usuários
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin_cadastro" activeClassName="active-link">
                        Cadastrar Admin
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
