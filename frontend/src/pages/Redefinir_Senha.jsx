import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Redefinir_Senha() {
    const [senha, setSenha] = useState("");
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Recupera o token da URL
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (!urlToken) {
            navigate("/"); // Redireciona para a página inicial se não houver token
        } else {
            setToken(decodeURIComponent(urlToken)); // Decodifica o token caso tenha caracteres especiais
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Token ausente ou inválido.");
            return;
        }
        // Lógica para a senha ter mais de 8 caracteres
        if (!senha || senha.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3001/redefinir-senha", {
                token,
                senha,
            });

            alert(response.data.message || "Senha atualizada com sucesso!");
            navigate("/"); // Redireciona para a página de login após sucesso
        } catch (err) {
            console.error("Erro ao redefinir senha:", err);
            const errorMessage = err.response?.data || "Erro ao redefinir senha.";
            alert(errorMessage);
        }
    };

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-80">
                <div className="bg-[#F0A500] p-6 w-96 mt-96">
                    <h1 className="text-black text-xl font-bold mb-4 text-center">Redefinir Senha</h1>
                    {/* Formulário para redefinir a senha */}
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <label className="block text-black mb-2">Nova Senha:</label>
                        <input
                            type="password"
                            placeholder="Digite sua nova senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="w-full px-4 py-2 rounded-none bg-gray-200 focus:outline-none mb-4"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        >
                            Redefinir
                        </button>
                    </form>
                    <a href="/">
                    <button className="mt-4 align- w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition">
                        Voltar
                    </button>
                    </a>
                </div>
            </div>
        </>
    );
}
