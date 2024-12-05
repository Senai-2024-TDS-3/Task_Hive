import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importando o useParams
import axios from "axios";
import CryptoJS from "crypto-js";
import User_Navbar from "./User_Navbar";

export default function User_Gerenciar_User() {
    const { id } = useParams(); // Pega o parâmetro 'id' da URL
    const [nome, setNome] = useState("");
    const [sobrenome, setSobrenome] = useState("");
    const [email, setEmail] = useState("");
    const [organizacao, setOrganizacao] = useState("");
    const [senha, setSenha] = useState("");

    // Obter dados do usuário com base no ID
    useEffect(() => {
        if (id) {
            carregarDadosUsuario(id);
        }
    }, [id]);

    const carregarDadosUsuario = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
            const { nome, sobrenome, email, organizacao } = response.data;
            setNome(nome);
            setSobrenome(sobrenome);
            setEmail(email);
            setOrganizacao(organizacao);
        } catch (err) {
            alert("Erro ao carregar dados do usuário.");
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const dadosAtualizados = {};
    
        // Adicionar somente os campos que não estão em branco
        if (nome.trim() !== "") dadosAtualizados.nome = nome;
        if (sobrenome.trim() !== "") dadosAtualizados.sobrenome = sobrenome;
        if (email.trim() !== "") dadosAtualizados.email = email;
        if (organizacao.trim() !== "") dadosAtualizados.organizacao = organizacao;
        if (senha.trim() !== "") {
            dadosAtualizados.senha = CryptoJS.AES.encrypt(senha, "chaveSecreta").toString();
        }
    
        try {
            await axios.put(`http://localhost:3001/atualizar_user/${id}`, dadosAtualizados);
            alert("Dados atualizados com sucesso!");
        } catch (err) {
            alert("Erro ao atualizar dados. Os campos não podem ser vazios.");
        }
    };
    

    return (
        <>
            <User_Navbar />
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
