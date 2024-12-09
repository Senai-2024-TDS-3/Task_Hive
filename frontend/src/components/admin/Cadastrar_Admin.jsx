import { useState } from "react"; // Hook para gerenciar estados no React
import axios from "axios"; // Biblioteca para realizar requisições HTTP

export default function Cadastrar_Admin() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "", // Nome do administrador
    sobrenome: "", // Sobrenome do administrador
    email: "", // Email do administrador
    senha: "", // Senha do administrador
    organizacao: "", // Organização do administrador
  });

  // Estado para exibir mensagens de sucesso ou erro
  const [message, setMessage] = useState("");

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (e) => {
    const { id, value } = e.target; // Obtém o ID e o valor do campo que foi alterado
    setFormData({ ...formData, [id]: value }); // Atualiza o estado do formulário de forma dinâmica
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)
    try {
      // Envia os dados do formulário para o backend via requisição POST
      const response = await axios.post("http://localhost:3001/cadastrar_admin", formData);
      setMessage("Admin cadastrado com sucesso!"); // Exibe mensagem de sucesso
      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        organizacao: "",
      }); // Reseta os campos do formulário
    } catch (error) {
      // Exibe mensagem de erro personalizada ou padrão
      setMessage(
        error.response?.data || "Erro ao cadastrar admin. Verifique os dados!"
      );
    }
  };

  return (
    // Estrutura do formulário de cadastro de administrador
    <>
      <div className="flex justify-center items-center mt-64 h-full">
        <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Campo para o nome */}
              <div className="flex flex-col">
                <label htmlFor="nome" className="text-black font-medium">
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              {/* Campo para o email */}
              <div className="flex flex-col">
                <label htmlFor="email" className="text-black font-medium">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* Campo para o sobrenome */}
              <div className="flex flex-col">
                <label htmlFor="sobrenome" className="text-black font-medium">
                  Sobrenome:
                </label>
                <input
                  type="text"
                  id="sobrenome"
                  className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                  value={formData.sobrenome}
                  onChange={handleChange}
                />
              </div>
              {/* Campo para a senha */}
              <div className="flex flex-col">
                <label htmlFor="senha" className="text-black font-medium">
                  Senha:
                </label>
                <input
                  type="password"
                  id="senha"
                  className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>
              {/* Campo para a organização */}
              <div className="flex flex-col col-span-2">
                <label htmlFor="organizacao" className="text-black font-medium">
                  Organização:
                </label>
                <input
                  type="text"
                  id="organizacao"
                  className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                  value={formData.organizacao}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Botão para enviar o formulário */}
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
            >
              Enviar
            </button>
          </form>

          {/* Exibição da mensagem de sucesso ou erro */}
          {message && (
            <p className="mt-4 text-center text-sm text-black font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
