import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/TaskHive_Black.png";
import Dark_Mode from "../darkmode/Dark_Mode";

export default function User_Navbar() {
    const navigate = useNavigate();

    const userId = localStorage.getItem("id_usuario");

    const handleLogout = () => {
        localStorage.clear(); // Limpa os dados do localStorage
        navigate("/"); // Redireciona para a página inicial
    };

    return (
        <nav className="navbar">
            <img src={Logo} alt="Logo" />
            <ul>
                <li>
                    <NavLink to="/user_visualizar_task" activeClassName="active-link">
                        Visualizar Tarefas
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user_cadastrar_task" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Cadastrar Tarefa
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to="/user-gerenciar-task" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        Gerenciar Tarefa
                    </NavLink>
                </li> */}
                <li>
                <NavLink to={`/user_gerenciar_user/${userId}`} className={({ isActive }) => (isActive ? "active-link" : "")}>
                Gerenciar Minha Conta
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
