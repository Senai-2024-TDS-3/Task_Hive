import React from "react";

// FORM/MODAL ESQUECI MINHA SENHA
export default function Form_Esqueci_Senha({ isOpen, onClose, onSubmit, email, setEmail }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex justify-center items-center z-50">
            <div className="bg-[#F0A500] rounded-lg w-96 p-6">
                <h2 className=" text-black mb-4">Esqueci minha senha</h2>
                <label className="block text-black mb-2">Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                    className="w-full px-4 py-2 rounded bg-gray-200 focus:outline-none mb-4"
                />
                <div className="flex-col justify-between">
                    <button
                        className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        onClick={onSubmit}
                    >
                        Enviar email
                    </button>
                    <button
                        className="mt-4 w-full bg-black text-white text-weigt font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        onClick={onClose}
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
}
