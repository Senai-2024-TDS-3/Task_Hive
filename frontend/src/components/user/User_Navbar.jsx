import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/images/TaskHive_Black.png";
import Dark_Mode from "../darkmode/Dark_Mode";

export default function User_Navbar() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({ nome: "", sobrenome: "" });

    useEffect(() => {
        const fetchUserInfo = async () => {
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
        fetchUserInfo();
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Você realmente deseja sair?");
        if (confirmLogout) {
            localStorage.clear(); // Limpa os dados do localStorage
            navigate("/"); // Redireciona para a página inicial
        }
    };

    return (
        <nav className="navbar">
                <img src={Logo} alt="Logo" />
                <span>Olá <b>{userInfo.nome}</b> <b>{userInfo.sobrenome}</b></span>
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
                <li>
                    <NavLink
                        to={`/user_gerenciar_user/${localStorage.getItem("id_usuario")}`}
                        className={({ isActive }) => (isActive ? "active-link" : "")}
                    >
                        Gerenciar Minha Conta
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
