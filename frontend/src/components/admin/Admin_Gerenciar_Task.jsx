import { useParams, useNavigate } from "react-router-dom"; //capturar parâmetros da URL e realizar navegação
import { useEffect, useState } from "react"; // gerenciar estado e ciclos de vida do componente
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import Admin_Navbar from "./Admin_Navbar"; // Componente para a barra de navegação do administrador

export default function Admin_Gerenciar_Task() {
    const { id } = useParams(); // Captura o ID da tarefa a partir da URL
    const navigate = useNavigate(); // Permite redirecionar o usuário para outras páginas
    const [tarefa, setTarefa] = useState({}); // Estado para armazenar os dados da tarefa
    const [status, setStatus] = useState(""); // Estado para gerenciar o status da tarefa

    // useEffect para buscar os detalhes da tarefa assim que o componente for montado
    useEffect(() => {
        axios
            .get(`http://localhost:3001/visualizar_all_tasks/${id}`) // Faz a requisição para buscar os dados da tarefa pelo ID
            .then((res) => {
                const data = res.data; // Dados retornados pela API

                // Formatar o prazo da tarefa recebido do backend
                if (data.prazo) {
                    data.prazo = data.prazo.split("T")[0]; // Converte o prazo para o formato 'YYYY-MM-DD'

                    // Verifica se o prazo já expirou comparando com a data atual
                    const hoje = new Date();
                    const prazo = new Date(data.prazo);

                    if (prazo < hoje) {
                        alert("O prazo desta tarefa expirou."); // Alerta caso o prazo já tenha passado
                    }
                }

                setTarefa(data); // Atualiza o estado com os dados da tarefa
                setStatus(data.status); // Define o status atual da tarefa
            })
            .catch((err) => console.error("Erro ao buscar tarefa:", err)); // Trata erros da requisição
    }, [id]); // Reexecuta o efeito se o ID da tarefa mudar

    // Função para atualizar os dados da tarefa
    const handleUpdate = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Formatar o prazo antes de enviar para o backend
        const formattedPrazo = tarefa.prazo ? tarefa.prazo.split("T")[0] : null;

        axios
            .put(`http://localhost:3001/update_task/${id}`, {
                titulo: tarefa.titulo,
                descricao: tarefa.descricao,
                status: status,
                prazo: formattedPrazo, // Envia o prazo formatado
            })
            .then(() => alert("Tarefa atualizada com sucesso!")) // Notifica o sucesso da atualização
            .catch((err) => console.error("Erro ao atualizar tarefa:", err)); // Trata erros
    };

    // Função para deletar a tarefa
    const handleDelete = () => {
        // Confirmação antes de deletar a tarefa
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            axios
                .delete(`http://localhost:3001/delete_user/${tarefa.id_usuario}/tasks/${id}`) // Chamada para deletar a tarefa
                .then(() => {
                    alert("Tarefa deletada com sucesso!"); // Notifica o sucesso
                    navigate("/admin_start"); // Redireciona para o painel inicial do admin
                })
                .catch((err) => console.error("Erro ao deletar tarefa:", err)); // Trata erros
        }
    };

    return (
        <>
            {/* Navbar do administrador */}
            <Admin_Navbar />
            
            {/* Formulário para gerenciar a tarefa */}
            <div className="form-container-gerenciar">
                <form onSubmit={handleUpdate} className="form-gerenciar">
                    {/* Exibe o nome do usuário associado à tarefa */}
                    <p>Usuário: {tarefa.nome} {tarefa.sobrenome}</p>

                    <div className="form-row-gerenciar">
                        {/* Campo para editar o título da tarefa */}
                        <label>
                            Nome da Tarefa:
                            <input
                                type="text"
                                value={tarefa.titulo || ""} // Valor padrão caso esteja vazio
                                onChange={(e) => setTarefa({ ...tarefa, titulo: e.target.value })} // Atualiza o estado
                            />
                        </label>

                        {/* Campo para editar o prazo da tarefa */}
                        <label>
                            Prazo:
                            <input
                                type="date"
                                value={tarefa.prazo || ""} // Valor padrão caso esteja vazio
                                onChange={(e) => setTarefa({ ...tarefa, prazo: e.target.value })} // Atualiza o estado
                            />
                        </label>

                        {/* Dropdown para selecionar o status da tarefa */}
                        <label>
                            Status:
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)} // Atualiza o estado
                            >
                                <option value="pendente">Pendente</option>
                                <option value="em_andamento">Em andamento</option>
                                <option value="concluida">Concluída</option>
                            </select>
                        </label>
                    </div>

                    {/* Campo para editar a descrição da tarefa */}
                    <div className="form-row-gerenciar">
                        <label>
                            Descrição:
                            <textarea
                                rows={5}
                                cols={50}
                                value={tarefa.descricao || ""} // Valor padrão caso esteja vazio
                                onChange={(e) => setTarefa({ ...tarefa, descricao: e.target.value })} // Atualiza o estado
                            />
                        </label>
                    </div>
                    <br />

                    {/* Botões para atualizar ou deletar a tarefa */}
                    <div className="form-row-btn-gerenciar">
                        <button type="submit">Atualizar</button> {/* Submete o formulário para atualizar a tarefa */}
                        <br />
                        <button type="button" onClick={handleDelete}>Deletar</button> {/* Deleta a tarefa */}
                    </div>
                </form>
            </div>
        </>
    );
}
