import { useState, useEffect } from "react"; // Importando  para gerenciar estado e efeitos colaterais
import { useParams } from "react-router-dom"; // Importando  useParams para capturar o parâmetro da URL
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import CryptoJS from "crypto-js"; // Biblioteca para criptografar a senha
import User_Navbar from "./User_Navbar"; // Componente de navegação para o usuário

export default function User_Gerenciar_User() {
    const { id } = useParams(); // Captura o parâmetro 'id' da URL
    const [nome, setNome] = useState(""); // Estado para armazenar o nome do usuário
    const [sobrenome, setSobrenome] = useState(""); // Estado para armazenar o sobrenome do usuário
    const [email, setEmail] = useState(""); // Estado para armazenar o email do usuário
    const [organizacao, setOrganizacao] = useState(""); // Estado para armazenar a organização do usuário
    const [senha, setSenha] = useState(""); // Estado para armazenar a senha do usuário

    //  useEffect para carregar os dados do usuário sempre que o ID mudar
    useEffect(() => {
        if (id) {
            carregarDadosUsuario(id); // Chama a função para carregar os dados do usuário
        }
    }, [id]); // Este efeito é acionado sempre que o 'id' mudar

    // Função  para carregar os dados do usuário a partir da API
    const carregarDadosUsuario = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
            const { nome, sobrenome, email, organizacao } = response.data;
            // Atualiza os estados com os dados recebidos da API
            setNome(nome);
            setSobrenome(sobrenome);
            setEmail(email);
            setOrganizacao(organizacao);
        } catch (err) {
            alert("Erro ao carregar dados do usuário."); // Exibe um alerta caso ocorra erro
        }
    };

    // Função para atualizar os dados do usuário
    const handleUpdateUser = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        const dadosAtualizados = {}; // Objeto para armazenar os dados atualizados

        // Adiciona os campos ao objeto somente se não estiverem vazios
        if (nome.trim() !== "") dadosAtualizados.nome = nome;
        if (sobrenome.trim() !== "") dadosAtualizados.sobrenome = sobrenome;
        if (email.trim() !== "") dadosAtualizados.email = email;
        if (organizacao.trim() !== "") dadosAtualizados.organizacao = organizacao;
        if (senha.trim() !== "") {
            // Criptografa a senha antes de enviá-la para o backend
            dadosAtualizados.senha = CryptoJS.AES.encrypt(senha, "chaveSecreta").toString();
        }

        try {
            // Envia uma requisição PUT para atualizar os dados do usuário
            await axios.put(`http://localhost:3001/atualizar_user/${id}`, dadosAtualizados);
            alert("Dados atualizados com sucesso!"); // Exibe um alerta de sucesso
        } catch (err) {
            alert("Erro ao atualizar dados. Os campos não podem ser vazios."); // Exibe um alerta caso ocorra erro
        }
    };

    return (
        <>
            <User_Navbar /> {/* Componente de navegação do usuário */}
            <div className="flex justify-center items-center mt-32 h-full">
                <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
                    <form onSubmit={handleUpdateUser}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="nome" className="text-black font-medium">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-black font-medium">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="sobrenome" className="text-black font-medium">
                                    Sobrenome:
                                </label>
                                <input
                                    type="text"
                                    id="sobrenome"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="senha" className="text-black font-medium">
                                    Senha:
                                </label>
                                <input 
                                    placeholder="Digite aqui sua nova senha (caso queira alterar)"
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col col-span-2">
                                <label htmlFor="organizacao" className="text-black font-medium">
                                    Organização:
                                </label>
                                <input
                                    type="text"
                                    id="organizacao"
                                    value={organizacao}
                                    onChange={(e) => setOrganizacao(e.target.value)}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        >
                            Atualizar
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
