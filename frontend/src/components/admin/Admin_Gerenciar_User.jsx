import Admin_Navbar from "../components/Admin_Navbar"

export default function Admin_Gerenciar_User() {
    return (
        <>
            <Admin_Navbar />
            <h1>Admin_Gerenciar_User</h1>
        </>
    )
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
