import { useState } from "react"; // Importando o useState para gerenciar o estado do formulário

export default function Form_Cadastro_User({ onSubmit, onVoltarLogin }) {
    // Define o estado inicial do formulário
    const [formData, setFormData] = useState({
        nome: "", // Nome do usuário
        sobrenome: "", // Sobrenome do usuário
        email: "", // Email do usuário
        senha: "", // Senha do usuário
        organizacao: "", // Organização vinculada ao usuário
    });

    // Atualiza os valores do formulário com base na entrada do usuário
    const handleChange = (e) => {
        const { id, value } = e.target; // Obtém o ID e o valor do campo que foi alterado
        setFormData((prevData) => ({
            ...prevData, // Mantém os valores anteriores
            [id]: value, // Atualiza o valor do campo correspondente
        }));
    };

    // Lida com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita o comportamento padrão do envio do formulário
        // Verifica se todos os campos foram preenchidos
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha || !formData.organizacao) {
            alert("Por favor, preencha todos os campos!"); // Exibe um alerta caso algum campo esteja vazio
            return;
        }
        onSubmit(formData); // Chama a função onSubmit passada como prop e envia os dados do formulário
    };

    return (
        <div className="flex justify-center items-center mt-0 h-full">
            {/* Container do formulário */}
            <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
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
                                value={formData.nome}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
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
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
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
                                value={formData.sobrenome}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
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
                                value={formData.senha}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
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
                                value={formData.organizacao}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                            />
                        </div>
                    </div>
                    {/* Botão de enviar */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-black text-white text-weight font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Enviar
                    </button>
                    {/* Botão de atualizar */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-black text-white text-weight font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Atualizar
                    </button>
                    {/* Botão de deletar */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-black text-white text-weight font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Deletar
                    </button>
                    {/* Botão para voltar ao login */}
                    <button
                        type="button"
                        onClick={onVoltarLogin} // Chama a função passada como prop
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Voltar
                    </button>
                </form>
            </div>
        </div>
    );
}
