import { useState } from "react";
import axios from "axios";

export default function Cadastrar_Admin() {
  // Const do useState para o formulario de cadastro de admin
    const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    organizacao: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       // Const da rota de cadastro admin
      const response = await axios.post("http://localhost:3001/cadastrar_admin", formData);
      setMessage("Admin cadastrado com sucesso!");
      setFormData({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        organizacao: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data || "Erro ao cadastrar admin. Verifique os dados!"
      );
    }
  };

  return (
    // Formulario de cadastro de admin
    <>
      <div className="flex justify-center items-center mt-64 h-full">
        <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
            <button
              type="submit"
              className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
            >
              Enviar
            </button>
          </form>
          {/* Mensagem de "admin cadastrado com sucesso" */}
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
