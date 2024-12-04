import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import User_Navbar from "./User_Navbar";

export default function User_Gerenciar_Task() {
    const { id } = useParams(); // Captura o ID da tarefa da URL
    const navigate = useNavigate();
    const [tarefa, setTarefa] = useState({});
    const [status, setStatus] = useState("");
    const [userName, setUserName] = useState ({ nome: "", sobrenome: ""});

    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserName(response.data);
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername();
    }, []);


    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario");
    
        axios
            .get(`http://localhost:3001/visualizar_user/${usuarioId}/tasks/${id}`)
            .then((res) => {
                const data = res.data;
    
                // Formatar o prazo retornado do backend
                if (data.prazo) {
                    data.prazo = data.prazo.split("T")[0]; // Converter para 'YYYY-MM-DD'
    
                    // Verifica se o prazo já expirou
                    const hoje = new Date();
                    const prazo = new Date(data.prazo);
    
                    if (prazo < hoje) {
                        alert("O prazo desta tarefa expirou.");
                    }
                }
    
                setTarefa(data); // Define a tarefa no estado
                setStatus(data.status); // Define o status no estado
            })
            .catch((err) => console.error("Erro ao buscar tarefa:", err));
    }, [id]);
    
    

    const handleUpdate = (e) => {
        e.preventDefault();
        const usuarioId = localStorage.getItem("id_usuario");
    
        // Formatar prazo para 'YYYY-MM-DD'
        const formattedPrazo = tarefa.prazo ? tarefa.prazo.split('T')[0] : null;
    
        axios.put(`http://localhost:3001/update_user/${usuarioId}/tasks/${id}`, {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            status: status,
            prazo: formattedPrazo, // Enviar a data formatada
        })
            .then(() => alert("Tarefa atualizada com sucesso!"))
            .catch((err) => console.error("Erro ao atualizar tarefa:", err));
    };
    
    const handleDelete = () => {
        const usuarioId = localStorage.getItem("id_usuario");
    
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            axios.delete(`http://localhost:3001/delete_user/${usuarioId}/tasks/${id}`)
                .then(() => {
                    alert("Tarefa deletada com sucesso!");
                    navigate("/user_start"); // Redireciona para o painel do usuário
                })
                .catch((err) => console.error("Erro ao deletar tarefa:", err));
        }
    };
    
    return (
        <>
            <User_Navbar />
            <div className="form-container-gerenciar">
                <form onSubmit={handleUpdate} className="form-gerenciar">
                    <p>{userName.nome} {userName.sobrenome}</p>
                    <div className="form-row-gerenciar">
                        <label>
                            Nome da Tarefa:
                            <input
                                type="text"
                                value={tarefa.titulo || ""}
                                onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })}
                            />
                        </label>
                        <label>
                            Prazo:
                            <input
                                type="date"
                                value={tarefa.prazo || ""}
                                onChange={(e) => setTarefa({ ...tarefa, prazo: e.target.value })}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pendente">Pendente</option>
                                <option value="em_andamento">Em andamento</option>
                                <option value="concluida">Concluída</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-row-gerenciar">
                        <label>
                            Descrição:
                            <textarea rows={5} cols={50}
                                value={tarefa.descricao || ""}
                                onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
                            />
                        </label>
                    </div>
                    <br />
                    <div className="form-row-btn-gerenciar">
                        <button type="submit">Atualizar</button>
                        <br />
                        <button type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
