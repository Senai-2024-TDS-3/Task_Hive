import { useEffect, useState } from "react"; //  para gerenciar o estado e efeitos 
import { NavLink, useNavigate } from "react-router-dom"; //  de navegação e para criar links de navegação
import axios from "axios"; // Biblioteca para requisições HTTP
import Logo from "../../assets/images/TaskHive_Black.png"; // Importação da imagem do logo
import Dark_Mode from "../darkmode/Dark_Mode"; // Importando o componente de modo escuro

export default function User_Navbar() {
    const navigate = useNavigate(); //  para navegação 
    const [userInfo, setUserInfo] = useState({ nome: "", sobrenome: "" }); // Estado para armazenar as informações do usuário

    // useEffect para buscar informações do usuário assim que o componente for montado
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userId = localStorage.getItem("id_usuario"); // Obtém o ID do usuário armazenado no localStorage
            if (userId) {
                try {
                    // Faz uma requisição GET para obter as informações do usuário
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserInfo(response.data); // Atualiza o estado com as informações do usuário
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error); // Caso ocorra algum erro
                }
            }
        };
        fetchUserInfo(); // Chama a função para buscar as informações do usuário
    }, []); // O efeito só será executado uma vez após o componente ser montado

    // Função para realizar o logout
    const handleLogout = () => {
        const confirmLogout = window.confirm("Você realmente deseja sair?"); // Pergunta de confirmação
        if (confirmLogout) {
            localStorage.clear(); // Limpa os dados
            navigate("/"); // Redireciona o usuário para a página inicial
        }
    };

    return (
        <nav className="navbar">
            <img src={Logo} alt="Logo" /> {/* Logo da aplicação */}
            <span>Olá <b>{userInfo.nome}</b> <b>{userInfo.sobrenome}</b></span> {/* Exibe o nome e sobrenome do usuário */}
            <ul>
                {/* Links de navegação com NavLink para destacar o link ativo */}
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
                            e.preventDefault(); // Previne o comportamento padrão de navegação
                            handleLogout(); // Chama a função de logout
                        }}
                        className={({ isActive }) => (isActive ? "active-link-logout" : "")}
                    >
                        Sair
                    </NavLink>
                </li>
            </ul>
            <Dark_Mode /> {/* Componente para alterar o modo de tema (escuro/claro) */}
        </nav>
    );
}
