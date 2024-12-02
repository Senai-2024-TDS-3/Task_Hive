import { useState } from "react";

export default function Form_Cadastro_User({ onSubmit, onVoltarLogin }) {
    const [formData, setFormData] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
        organizacao: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha || !formData.organizacao) {
            alert("Por favor, preencha todos os campos!");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="flex justify-center items-center mt-0 h-full">
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
                                value={formData.nome}
                                onChange={handleChange}
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
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.sobrenome}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                            />
                        </div>
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
                    <button
                        type="submit"
                        className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Enviar
                    </button>
                    <button type="submit"
                            className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition">
                            Atualizar
                        </button>
                        <button type="submit"
                            className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition">
                            Deletar
                        </button>
                        <button
                        type="button"
                        onClick={onVoltarLogin} // Chamando a função passada como prop
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        >
                        Voltar
                        </button>

                </form>
            </div>
        </div>
    );
}
