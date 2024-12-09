import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hive_Card_Login.css";
import Form_Cadastro_User from "../forms/Form_Cadastro_User";
import Form_Esqueci_Senha from "../forms/Form_Esqueci_Senha";

export default function Hive_Card_Login() {
    // Estados do componente
    const [email, setEmail] = useState(""); // Armazena o email do usuário para login
    const [senha, setSenha] = useState(""); // Armazena a senha do usuário para login
    const [error, setError] = useState(""); // Armazena mensagens de erro de login
    const [exibirCadastro, setExibirCadastro] = useState(false); // Controla a exibição do formulário de cadastro
    const [mostrarModal, setMostrarModal] = useState(false); // Controla a exibição do modal "Esqueci Minha Senha"
    const [emailModal, setEmailModal] = useState(""); // Armazena o email digitado no modal
    const [mostrarLogin, setMostrarLogin] = useState(true); // Controla a exibição do formulário de login

    const navigate = useNavigate(); //   navegação entre rotas

    // Função para realizar o login
    const handleLogin = async (e) => {
        e.preventDefault(); // Evita o reload da página ao enviar o formulário
        try {
            const response = await axios.post("http://localhost:3001/login", { email, senha });
            const { redirect, id_usuario } = response.data;

            // Armazena o ID do usuário no localStorage para manter a sessão
            localStorage.setItem("id_usuario", id_usuario);

            // Redireciona o usuário conforme seu papel (Admin ou Usuário)
            if (redirect === "Admin_Start") navigate("/admin_start");
            else navigate("/user_start");
        } catch (err) {
            setError("Erro ao fazer login. Tente novamente."); // Exibe mensagem de erro em caso de falha
        }
    };

    // Função para processar o cadastro de usuário
    const handleCadastroSubmit = async (formData) => {
        try {
            const response = await axios.post("http://localhost:3001/cadastrar_user", formData);
            alert(response.data.message); // Exibe mensagem de sucesso ou erro retornada pelo backend
            setExibirCadastro(false); // Volta para o formulário de login
        } catch (error) {
            console.error(error);
            const errorMessage =
                error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            alert(errorMessage);
        }
    };

    // Função para voltar ao login
    const handleVoltarLogin = () => {
        setMostrarLogin(true); // Mostra o card de login
        setExibirCadastro(false); // Esconde o formulário de cadastro
        setMostrarModal(false); // Fecha o modal de "Esqueci Minha Senha"
    };

    // Função para enviar o email de redefinição de senha
    const handleEsqueciSenha = async () => {
        try {
            await axios.post("http://localhost:3001/esqueci-minha-senha", { email: emailModal });
            alert("Email de redefinição enviado com sucesso!");
            setMostrarModal(false); // Fecha o modal após o envio do email
        } catch (err) {
            alert("Erro ao enviar email. Verifique o endereço e tente novamente.");
        }
    };

    return (
        // Estrutura principal do componente
        <div className="hex-grid">
            {/* Exibe o card de login se 'mostrarLogin' for true e o cadastro não estiver visível */}
            {mostrarLogin && !exibirCadastro && (
                <div className="hex">
                    <label className="login_label">Email:</label>
                    <input
                        className="login_input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <br />
                    <label className="login_label senha">Senha:</label>
                    <input
                        className="login_input"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                    <br />
                    <button className="login_button" type="submit" onClick={handleLogin}>
                        Entrar
                    </button>
                    {/* Exibe erros de login, se houver */}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <br />
                    <div className="hex_links">
                        {/* Links para as ações de recuperação de senha e cadastro */}
                        <p onClick={() => { setMostrarModal(true); setMostrarLogin(false); }}>
                            Esqueci minha senha
                        </p>
                        <p onClick={() => setExibirCadastro(true)}>Cadastrar</p>
                    </div>
                </div>
            )}

            {/* Exibe o formulário de cadastro de usuário */}
            {exibirCadastro && (
                <Form_Cadastro_User
                    onSubmit={handleCadastroSubmit} // Função para processar o cadastro
                    onVoltarLogin={handleVoltarLogin} // Função para voltar ao login
                />
            )}

            {/* Modal de recuperação de senha */}
            <Form_Esqueci_Senha
                isOpen={mostrarModal} // Exibição condicional do modal
                onClose={handleVoltarLogin} // Fecha o modal e retorna ao login
                onSubmit={handleEsqueciSenha} // Envia o email de recuperação
                email={emailModal} // Estado para armazenar o email do modal
                setEmail={setEmailModal} // Função para atualizar o estado do email
            />
        </div>
    );
}
