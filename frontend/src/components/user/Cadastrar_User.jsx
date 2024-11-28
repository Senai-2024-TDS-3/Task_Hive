import React, { useState } from "react";
import axios from "axios";

export default function Cadastrar_User() {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        organizacao: "",
    });

    // Atualizar estado ao digitar nos campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação dos campos
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha || !formData.organizacao) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        console.log("Dados enviados:", formData);

        try {
            // Enviando os dados para o backend
            const response = await axios.post("http://localhost:3001/cadastrar_user", formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Erro ao cadastrar usuário. Tente novamente.";
            alert(errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Sobrenome:
                <input
                    type="text"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Senha:
                <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Organização:
                <input
                    type="text"
                    name="organizacao"
                    value={formData.organizacao}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Cadastrar</button>
        </form>
    );
}
