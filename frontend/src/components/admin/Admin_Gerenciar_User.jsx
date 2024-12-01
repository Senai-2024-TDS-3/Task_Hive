import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin_Navbar from "./Admin_Navbar";

export default function Admin_Gerenciar_User() {
    const { id } = useParams(); // Pega o id do usuário na URL
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        organizacao: ""
    });

    // Busca os dados do usuário ao carregar a página
    useEffect(() => {
        axios.get(`http://localhost:3001/visualizar_user/${id}`)
            .then((response) => {
                setUsuario(response.data); // Preenche os campos com os dados do usuário
            })
            .catch((err) => console.error("Erro ao buscar usuário:", err));
    }, [id]);

    // Função para lidar com o envio da atualização
    const handleUpdate = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/atualizar_user/${id}`, usuario)
            .then(() => {
                alert("Usuário atualizado com sucesso!");
                navigate("/admin_start"); // Redireciona após a atualização
            })
            .catch((err) => console.error("Erro ao atualizar usuário:", err));
    };

    // Função para lidar com a exclusão do usuário
    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
            axios.delete(`http://localhost:3001/deletar_user/${id}`)
                .then(() => {
                    alert("Usuário deletado com sucesso!");
                    navigate("/admin_start"); // Redireciona após a exclusão
                })
                .catch((err) => console.error("Erro ao deletar usuário:", err));
        }
    };

    return (
        <>
            <Admin_Navbar />
            <div className="flex justify-center items-center mt-32 h-full">
                <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="nome" className="text-black font-medium">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={usuario.nome}
                                    onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
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
                                    value={usuario.email}
                                    onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
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
                                    value={usuario.sobrenome}
                                    onChange={(e) => setUsuario({ ...usuario, sobrenome: e.target.value })}
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col col-span-1">
                                <label htmlFor="organizacao" className="text-black font-medium">
                                    Organização:
                                </label>
                                <input
                                    type="text"
                                    id="organizacao"
                                    value={usuario.organizacao}
                                    onChange={(e) => setUsuario({ ...usuario, organizacao: e.target.value })}
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
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </>
    );
}


// LOGICA PARA DELETAR USUARIO

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Para capturar o ID da URL e navegar
// import Admin_Navbar from "../components/Admin_Navbar";
// import axios from "axios";

// export default function Admin_Gerenciar_User() {
//     const { userId } = useParams(); // Captura o ID do usuário da URL
//     const navigate = useNavigate(); // Para redirecionar após deletar
//     const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário
//     const [loading, setLoading] = useState(true); // Estado de carregamento
//     const [error, setError] = useState(null); // Estado de erro

//     // Função para buscar os dados do usuário pelo ID
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get(`/visualizar_user/${userId}`);
//                 setUser(response.data); // Define os dados do usuário no estado
//             } catch (err) {
//                 setError("Erro ao carregar usuário. Verifique se o ID é válido.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (userId) fetchUser();
//     }, [userId]);

//     // Função para deletar o usuário
//     const handleDelete = async () => {
//         try {
//             await axios.delete(`/deletar_user/${userId}`);
//             alert("Usuário deletado com sucesso!");
//             navigate("/admin/lista-usuarios"); // Redireciona para a lista de usuários
//         } catch (err) {
//             alert("Erro ao deletar usuário.");
//         }
//     };

//     if (loading) return <p>Carregando...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <>
//             <Admin_Navbar />
//             <div className="form-container">
//                 <h2>Gerenciar Usuário</h2>
//                 <div className="user-card">
//                     <p><strong>Nome:</strong> {user.nome}</p>
//                     <p><strong>Sobrenome:</strong> {user.sobrenome}</p>
//                     <p><strong>Email:</strong> {user.email}</p>
//                     <p><strong>Organização:</strong> {user.organizacao || "Não especificada"}</p>
//                     <button onClick={handleDelete} className="delete-button">
//                         Deletar Usuário
//                     </button>
//                 </div>
//             </div>
//         </>
//     );
// }
