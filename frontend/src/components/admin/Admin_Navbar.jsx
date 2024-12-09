import { useEffect, useState } from "react"; //gerenciar estado e ciclo de vida do componente
import { NavLink, useNavigate } from "react-router-dom"; // NavLink para navegação com destaque e useNavigate para redirecionar
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import Logo from "../../assets/images/TaskHive_Black.png"; // Importa a logo do projeto
import Dark_Mode from "../darkmode/Dark_Mode"; // Componente para alternar entre modos claro e escuro

export default function Admin_Navbar() {
    const navigate = useNavigate(); //redirecionar o usuário
    const [userInfo, setUserInfo] = useState({ nome: "", sobrenome: "" }); // Estado para armazenar as informações do administrador logado

    // Efeito para buscar as informações do administrador logado ao montar o componente
    useEffect(() => {
        const fetchAdminInfo = async () => {
            const userId = localStorage.getItem("id_usuario"); // Obtém o ID do usuário armazenado no localStorage
            if (userId) {
                try {
                    // Requisição para buscar as informações do administrador
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserInfo(response.data); // Atualiza o estado com os dados do administrador
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error); // Loga o erro no console
                }
            }
        };
        fetchAdminInfo(); // Chama a função de busca
    }, []); // Executa apenas uma vez, ao montar o componente

    // Função para lidar com o logout do administrador
    const handleLogout = () => {
        const confirmLogout = window.confirm("Você realmente deseja sair?"); // Exibe uma mensagem de confirmação
        if (confirmLogout) {
            localStorage.clear(); // Limpa todos os dados armazenados no localStorage
            navigate("/"); // Redireciona para a página inicial de login
        }
    };

    return (
        <nav className="navbar">
            {/* Logo da aplicação */}
            <img src={Logo} alt="Logo" />

            {/* Saudação ao administrador com nome e sobrenome */}
            <span>
                Olá Admin <b>{userInfo.nome}</b> <b>{userInfo.sobrenome}</b>
            </span>

            {/* Links de navegação */}
            <ul>
                {/* Link para visualizar tarefas */}
                <li>
                    <NavLink to="/admin_visualizar_task" activeClassName="active-link">
                        Tarefas
                    </NavLink>
                </li>

                {/* Link para visualizar usuários */}
                <li>
                    <NavLink to="/admin_visualizar_user" activeClassName="active-link">
                        Usuários
                    </NavLink>
                </li>

                {/* Link para cadastrar um novo administrador */}
                <li>
                    <NavLink to="/admin_cadastro" activeClassName="active-link">
                        Cadastrar Admin
                    </NavLink>
                </li>

                {/* Link para realizar logout */}
                <li>
                    <NavLink
                        to="" // Link vazio para impedir a navegação padrão
                        onClick={(e) => {
                            e.preventDefault(); // Previne o comportamento padrão do link
                            handleLogout(); // Chama a função de logout
                        }}
                        className={({ isActive }) => (isActive ? "active-link-logout" : "")} // Estilização condicional do link
                    >
                        Sair
                    </NavLink>
                </li>
            </ul>

            {/* Componente para alternar entre os modos claro e escuro */}
            <Dark_Mode />
        </nav>
    );
}
