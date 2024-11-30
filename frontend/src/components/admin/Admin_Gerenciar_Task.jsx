import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Admin_Navbar from "./Admin_Navbar";

export default function Admin_Gerenciar_Task() {
    const { id } = useParams(); // Captura o ID da tarefa da URL
    const navigate = useNavigate();
    const [tarefa, setTarefa] = useState({});
    const [status, setStatus] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/visualizar_all_tasks/${id}`)
            .then((res) => {
                setTarefa(res.data);
                setStatus(res.data.status);
            })
            .catch((err) => console.error(err));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/update_task/${id}`, {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            status: status,
            prazo: tarefa.prazo
        })
            .then(() => alert("Tarefa atualizada com sucesso!"))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            axios.delete(`http://localhost:3001/delete_user/${tarefa.id_usuario}/tasks/${id}`)
                .then(() => {
                    alert("Tarefa deletada com sucesso!");
                    navigate("/admin_dashboard"); // Redireciona para o painel admin
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <Admin_Navbar />
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                    <p>Usuário: {tarefa.nome} {tarefa.sobrenome}</p>
                    <div className="form-row">
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
                    <div className="form-row">
                        <label>
                            Descrição:
                            <textarea
                                value={tarefa.descricao || ""}
                                onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })}
                            />
                        </label>
                    </div>
                    <br />
                    <div className="form-row">
                        <button type="submit">Atualizar</button>
                        <button type="button" onClick={handleDelete}>Deletar</button>
                    </div>
                </form>
            </div>
        </>
    );
}
