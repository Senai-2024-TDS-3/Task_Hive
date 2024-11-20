import User_Navbar from "../components/User_Navbar"
import axios from 'axios';




export default function Cadastrar_User() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            organizacao: document.getElementById('organizacao').value,
        };
    
        try {
            const response = await axios.post('http://localhost:3001/cadastrar_user', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'Erro ao cadastrar usuário');
        }
    };
    return (
        <>
            <User_Navbar />
            <h1>Cadastrar_User</h1>
            <div className="flex justify-center items-center mt-64 h-full">
                <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
                    <form>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="nome" className="text-black font-medium">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
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
                    </form>
                </div>
            </div>



        </>
    )
}