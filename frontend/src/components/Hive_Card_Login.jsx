import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hive_Card_Login.css";

export default function Hive_Card_Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleForgotEmailChange = (e) => setForgotEmail(e.target.value);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/login", {
                email,
                senha, // Senha enviada sem criptografia
            });

            const { redirect } = response.data;
            if (redirect === "Admin_Start") navigate("/admin_start");
            else navigate("/User_Start");
        } catch (err) {
            setError("Erro ao fazer login. Tente novamente.");
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/esqueci-minha-senha",
                { email: forgotEmail }
            );
            setMessage("Instruções enviadas para o e-mail.");
        } catch (err) {
            setMessage("Erro ao enviar e-mail. Tente novamente.");
        }
    };

    return (
        <div className="hex-grid">
            <div className="hex">
                <label htmlFor="hex-1">Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Digite seu email"
                />
                <label htmlFor="hex-2">Senha:</label>
                <input
                    type="password"
                    value={senha}
                    onChange={handleSenhaChange}
                    placeholder="Digite sua senha"
                />
                <br />
                <button type="submit" onClick={handleLogin}>
                    Entrar
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <br />
                <div className="hex_links">
                    <p onClick={() => setIsModalOpen(true)}>Esqueci minha senha</p>
                    <p>Cadastrar</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#F0A500] p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Esqueci minha senha</h2>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={forgotEmail}
                            onChange={handleForgotEmailChange}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button
                            onClick={handleForgotPassword}
                            className="bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition px-4 ml-8"
                        >
                            Enviar
                        </button>
                        <br />
                        <br />
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition px-4 ml-8"
                        >
                            Cancelar
                        </button>
                        {message && <p className="text-center mt-4">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}