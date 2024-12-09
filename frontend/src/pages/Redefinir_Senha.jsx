import { useState, useEffect } from "react"; // Hooks para gerenciar o estado e efeitos colaterais
import axios from "axios"; // Biblioteca para requisições HTTP
import Header from "../components/Header"; // Importação do componente Header
import { useNavigate } from "react-router-dom"; // Hook para navegação programática

export default function Redefinir_Senha() {
    const [senha, setSenha] = useState(""); // Estado para armazenar a nova senha
    const [token, setToken] = useState(null); // Estado para armazenar o token de redefinição
    const navigate = useNavigate(); // Hook para navegação programática

    // useEffect para recuperar o token da URL
    useEffect(() => {
        // Recupera o token da URL
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (!urlToken) {
            navigate("/"); // Redireciona para a página inicial se não houver token
        } else {
            setToken(decodeURIComponent(urlToken)); // Decodifica o token caso tenha caracteres especiais
        }
    }, [navigate]);

    // Função de envio do formulário para redefinir a senha
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        if (!token) {
            alert("Token ausente ou inválido.");
            return;
        }
        // Lógica para verificar se a senha tem pelo menos 8 caracteres
        if (!senha || senha.length < 8) {
            alert("A senha deve ter pelo menos 8 caracteres.");
            return;
        }

        try {
            // Envia a requisição POST para a API para redefinir a senha
            const response = await axios.post("http://localhost:3001/redefinir-senha", {
                token,
                senha,
            });

            // Exibe uma mensagem de sucesso ou falha
            alert(response.data.message || "Senha atualizada com sucesso!");
            navigate("/"); // Redireciona para a página de login após sucesso
        } catch (err) {
            console.error("Erro ao redefinir senha:", err); // Log do erro
            const errorMessage = err.response?.data || "Erro ao redefinir senha."; // Mensagem de erro da resposta da API
            alert(errorMessage); // Exibe o erro para o usuário
        }
    };

    return (
        <>
            <Header /> {/* Cabeçalho da página */}
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
                            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
                            className="w-full px-4 py-2 rounded-none bg-gray-200 focus:outline-none mb-4"
                        />
                        <button
                            type="submit"
                            className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        >
                            Redefinir
                        </button>
                    </form>
                    {/* Botão para voltar à página inicial */}
                    <a href="/">
                        <button className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition">
                            Voltar
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}
