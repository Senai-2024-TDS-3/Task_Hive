import Admin_Navbar from "./Admin_Navbar"

export default function Admin_Gerenciar_Task() {
    return (
        <>
            <Admin_Navbar />
            <div className="form-container">
                <form>
                    <p>Nome do Usuário</p>
                    {/* puxar nome do Usuario  */}
                    <div className="form-row">
                        <label>
                            Nome da Tarefa:
                            <input type="text" placeholder="Digite o nome da tarefa" />
                        </label>
                        <label>
                            Prazo:
                            <input type="date" />
                        </label>
                        <label>
                            Status:
                            <select>
                                <option>Pendente</option>
                                <option>Em andamento</option>
                                <option>Concluído</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Descrição:
                            <textarea placeholder="Digite a descrição da tarefa"></textarea>
                        </label>
                    </div>
                    <br />
                    <div className="form-row">
                        <button type="submit">Enviar</button>
                        {/* nesse botão admin deve atualizar a tarefa para concluida ou em andamento */}
                        <button type="submit">Atualizar</button>
                        {/* E no deletar, o admin poder deletar a tarefa do usuario  */}
                        <button type="submit">Deletar</button>
                    </div>
                </form>
            </div>
        </>
    )
}


// LÓGICA PARA PUXAR A TAREFA ESCOLHIDA NA PAGINA DE TAREFAS (ESPERANDO OS PIA TERMINAR A PAGINA)

// import React, { useState, useEffect } from "react";
// import Admin_Navbar from "./Admin_Navbar";
// import { useParams } from "react-router-dom"; // Para capturar o ID da tarefa da URL
// import axios from "axios";

// export default function Admin_Gerenciar_Task() {
//     const { taskId } = useParams(); // Captura o ID da tarefa da URL
//     const [task, setTask] = useState(null); // Estado para armazenar os dados da tarefa
//     const [loading, setLoading] = useState(true); // Estado de carregamento
//     const [error, setError] = useState(null); // Estado de erro

//     // Função para buscar os dados da tarefa pelo ID
//     useEffect(() => {
//         const fetchTask = async () => {
//             try {
//                 const response = await axios.get(`/visualizar_all_tasks/${taskId}`);
//                 setTask(response.data); // Define os dados da tarefa no estado
//             } catch (err) {
//                 setError("Erro ao carregar tarefa. Verifique se o ID é válido.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (taskId) fetchTask();
//     }, [taskId]);

//     // Função para atualizar a tarefa
//     const handleUpdate = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.put(`/update_task/${taskId}`, task);
//             alert("Tarefa atualizada com sucesso!");
//         } catch (err) {
//             alert("Erro ao atualizar tarefa.");
//         }
//     };

//     // Função para deletar a tarefa
//     const handleDelete = async () => {
//         try {
//             await axios.delete(`/delete_user/${task.id_usuario}/tasks/${taskId}`);
//             alert("Tarefa deletada com sucesso!");
//         } catch (err) {
//             alert("Erro ao deletar tarefa.");
//         }
//     };

//     if (loading) return <p>Carregando...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <>
//             <Admin_Navbar />
//             <div className="form-container">
//                 <form onSubmit={handleUpdate}>
//                     <p>Nome do Usuário: {task.nome_usuario || "Não disponível"}</p>
//                     <div className="form-row">
//                         <label>
//                             Nome da Tarefa:
//                             <input
//                                 type="text"
//                                 value={task.titulo}
//                                 onChange={(e) => setTask({ ...task, titulo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Prazo:
//                             <input
//                                 type="date"
//                                 value={task.prazo}
//                                 onChange={(e) => setTask({ ...task, prazo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Status:
//                             <select
//                                 value={task.status}
//                                 onChange={(e) => setTask({ ...task, status: e.target.value })}
//                             >
//                                 <option value="pendente">Pendente</option>
//                                 <option value="em_andamento">Em andamento</option>
//                                 <option value="concluida">Concluído</option>
//                             </select>
//                         </label>
//                     </div>
//                     <div className="form-row">
//                         <label>
//                             Descrição:
//                             <textarea
//                                 value={task.descricao}
//                                 onChange={(e) => setTask({ ...task, descricao: e.target.value })}
//                             ></textarea>
//                         </label>
//                     </div>
//                     <br />
//                     <div className="form-row">
//                         <button type="submit">Atualizar</button>
//                         <button type="button" onClick={handleDelete}>
//                             Deletar
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// }
