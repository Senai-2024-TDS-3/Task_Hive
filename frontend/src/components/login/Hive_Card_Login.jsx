import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hive_Card_Login.css";
import Form_Cadastro_User from "../forms/Form_Cadastro_User";
import Form_Esqueci_Senha from "../forms/Form_Esqueci_Senha";

export default function Hive_Card_Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [exibirCadastro, setExibirCadastro] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [emailModal, setEmailModal] = useState("");
    const [mostrarLogin, setMostrarLogin] = useState(true);

    const navigate = useNavigate();

    // Const de login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", { email, senha });
            const { redirect, id_usuario } = response.data;
    
            // Salvar o ID do usuário no localStorage
            localStorage.setItem("id_usuario", id_usuario);
    
            if (redirect === "Admin_Start") navigate("/admin_start");
            else navigate("/user_start");
        } catch (err) {
            setError("Erro ao fazer login. Tente novamente.");
        }
        console.log("Senha enviada para login:", senha);
    };

    // Const para exibir o card/form de cadastro de usuário
    const handleCadastroSubmit = async (formData) => {
        try {
            const response = await axios.post("http://localhost:3001/cadastrar_user", formData);
            alert(response.data.message);
            setExibirCadastro(false);
        } catch (error) {
            console.error(error);
            const errorMessage =
                error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            alert(errorMessage);
        }
    };

    // Função para voltar ao login
    const handleVoltarLogin = () => {
        setMostrarLogin(true); // Mostra o card de login novamente
        setExibirCadastro(false); // Garante que o formulário de cadastro seja escondido
        setMostrarModal(false); // Fecha o modal de "Esqueci minha senha", caso esteja aberto
    };
    

    const handleEsqueciSenha = async () => {
        try {
            await axios.post("http://localhost:3001/esqueci-minha-senha", { email: emailModal });
            alert("Email de redefinição enviado com sucesso!");
            setMostrarModal(false);
        } catch (err) {
            alert("Erro ao enviar email. Verifique o endereço e tente novamente.");
        }
    };

    return (
        // Form de login
        <div className="hex-grid">
            {/* Exibir o card de login apenas quando 'mostrarLogin' for true */}
            {mostrarLogin && !exibirCadastro && (
                <div className="hex">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                    />
                    <br />
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite sua senha"
                    />
                    <br />
                    <button type="submit" onClick={handleLogin}>
                        Entrar
                    </button>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <br />
                    <div className="hex_links">
                        <p onClick={() => { setMostrarModal(true); setMostrarLogin(false); }}>
                            Esqueci minha senha
                        </p>
                        <p onClick={() => setExibirCadastro(true)}>Cadastrar</p>
                    </div>
                </div>
            )}

            {exibirCadastro && (
                <Form_Cadastro_User onSubmit={handleCadastroSubmit} onVoltarLogin={handleVoltarLogin} />
            )}

            {/* Modal de Esqueci Minha Senha */}
            <Form_Esqueci_Senha
                isOpen={mostrarModal}
                onClose={handleVoltarLogin} // A função 'handleVoltarLogin' fecha o modal e mostra o login novamente
                onSubmit={handleEsqueciSenha}
                email={emailModal}
                setEmail={setEmailModal}
            />
        </div>
    );
}
