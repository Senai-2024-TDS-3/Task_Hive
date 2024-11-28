import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hive_Card_Login.css";
import Form_Cadastro_User from "../forms/Form_Cadastro_User";
import Form_Esqueci_Senha from "../forms/Form_Esqueci_Senha";

export default function Hive_Card_Login() {
    // useState de login e exibição de form de cadastro
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [exibirCadastro, setExibirCadastro] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [emailModal, setEmailModal] = useState("");

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
            else navigate("/User_Start");
        } catch (err) {
            setError("Erro ao fazer login. Tente novamente.");
        }
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
        setExibirCadastro(false); // Esconde o formulário de cadastro e mostra o login
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
            {!exibirCadastro ? (
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
                        {/* Ao clicar exibira o modal para "esqueci minha senha" ou "cadastrar"*/}
                        <p onClick={() => setMostrarModal(true)}>Esqueci minha senha</p>
                        <p onClick={() => setExibirCadastro(true)}>Cadastrar</p>
                    </div>
                </div>
            ) : (
                <Form_Cadastro_User onSubmit={handleCadastroSubmit} onVoltarLogin={handleVoltarLogin} />
            )}
            <Form_Esqueci_Senha
                isOpen={mostrarModal}
                onClose={() => setMostrarModal(false)}
                onSubmit={handleEsqueciSenha}
                email={emailModal}
                setEmail={setEmailModal}
            />
        </div>
    );
}
