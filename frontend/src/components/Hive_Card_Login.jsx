import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hive_Card_Login.css";
import Form_Cadastro_User from "./Form_Cadastro_User";

export default function Hive_Card_Login() {
    // useState de login e exibição de form de cadastro
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [showCadastro, setShowCadastro] = useState(false);

    const navigate = useNavigate();

    // Const de login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                email,
                senha,
            });

            // const { redirect, id_usuario } = response.data; // Supondo que o backend retorne o id_usuario

            // // Armazenando o id_usuario no localStorage
            // localStorage.setItem("id_usuario", id_usuario);

            const { redirect } = response.data;
            // Se o usuário for admin será redirecionado para pagina de admin
            if (redirect === "Admin_Start") navigate("/admin_start");
            // Se for usuário, para usuário
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
            setShowCadastro(false);
        } catch (error) {
            console.error(error);
            const errorMessage =
                error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            alert(errorMessage);
        }
    };

    

    return (
        // Form de login
        <div className="hex-grid">
            {!showCadastro ? (
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
                        {/* Ao clicar exibira o modal para "esqueci minha senha" */}
                        <p onClick={() => alert("Esqueci minha senha ainda não implementado")}>
                            Esqueci minha senha
                        </p>
                        <p onClick={() => setShowCadastro(true)}>Cadastrar</p>
                    </div>
                </div>
            ) : (
                <Form_Cadastro_User onSubmit={handleCadastroSubmit} />
            )}
        </div>
    );
}
