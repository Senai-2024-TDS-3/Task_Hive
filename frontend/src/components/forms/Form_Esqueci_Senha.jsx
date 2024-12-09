import React from "react";

// FORM/MODAL ESQUECI MINHA SENHA
export default function Form_Esqueci_Senha({ isOpen, onClose, onSubmit, email, setEmail }) {
    // Se o modal não estiver aberto, retorna null (não exibe nada)
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center mt-80 items-center z-50">
            {/* Contêiner do modal */}
            <div className="bg-[#F0A500] rounded-none w-96 p-6">
                {/* Título do modal */}
                <h2 className="text-black mb-4">Esqueci minha senha</h2>

                {/* Campo de entrada para o email */}
                <label className="block text-black mb-2">Email:</label>
                <input
                    type="email"
                    value={email} // Valor controlado do estado externo
                    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado externo quando o valor muda
                    placeholder="Digite seu email"
                    className="w-full px-4 py-2 rounded-none bg-gray-200 focus:outline-none mb-4"
                />

                {/* Botões de ação */}
                <div className="flex-col justify-between">
                    {/* Botão para enviar o email de recuperação */}
                    <button
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        onClick={onSubmit} // Função passada como prop para tratar o envio do email
                    >
                        Enviar email
                    </button>
                    {/* Botão para fechar o modal */}
                    <button
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        onClick={onClose} // Função passada como prop para fechar o modal
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
