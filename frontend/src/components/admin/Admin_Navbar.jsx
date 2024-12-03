import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/TaskHive_Black.png";
import Dark_Mode from "../darkmode/Dark_Mode";

export default function Admin_Navbar() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ nome: "", sobrenome: "" });

    useEffect(() => {
        const fetchAdminInfo = async () => {
            const userId = localStorage.getItem("id_usuario");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserInfo(response.data);
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchAdminInfo();
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Você realmente deseja sair?");
        if (confirmLogout) {
            localStorage.clear();
            navigate("/");
        }
    };

    return (
        <nav className="navbar">
                <img src={Logo} alt="Logo" />
                <span>Olá Admin <b>{userInfo.nome}</b> <b>{userInfo.sobrenome}</b></span>
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
                    <NavLink
                        to=""
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        className={({ isActive }) => (isActive ? "active-link-logout" : "")}
                    >
                        Sair
                    </NavLink>
                </li>
            </ul>
            <Dark_Mode />
        </nav>
    );
}
