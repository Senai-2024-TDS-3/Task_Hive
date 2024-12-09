import { useParams, useNavigate } from "react-router-dom"; // Hooks para manipular a URL e navegação
import { useEffect, useState } from "react"; // Hooks para efeitos colaterais e gerenciamento de estado
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import User_Navbar from "./User_Navbar"; // Componente de Navbar para o usuário

export default function User_Gerenciar_Task() {
    const { id } = useParams(); // Captura o ID da tarefa a partir da URL
    const navigate = useNavigate(); // Hook de navegação para redirecionamento após ações
    const [tarefa, setTarefa] = useState({}); // Estado para armazenar as informações da tarefa
    const [status, setStatus] = useState(""); // Estado para armazenar o status da tarefa
    const [userName, setUserName] = useState({ nome: "", sobrenome: "" }); // Estado para armazenar o nome do usuário

    // UseEffect para buscar as informações do usuário logado
    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario"); // Recupera o ID do usuário do localStorage
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserName(response.data); // Atualiza o estado com o nome do usuário
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername();
    }, []); // Este efeito roda apenas uma vez após o componente ser montado

    // UseEffect para buscar a tarefa específica do usuário
    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario"); // Recupera o ID do usuário logado

        // Requisição para buscar os detalhes da tarefa
        axios
            .get(`http://localhost:3001/visualizar_user/${usuarioId}/tasks/${id}`)
            .then((res) => {
                const data = res.data;

                // Formatar o prazo da tarefa (caso exista)
                if (data.prazo) {
                    data.prazo = data.prazo.split("T")[0]; // Converter para formato 'YYYY-MM-DD'

                    // Verificar se o prazo da tarefa já expirou
                    const hoje = new Date();
                    const prazo = new Date(data.prazo);
                    if (prazo < hoje) {
                        alert("O prazo desta tarefa expirou.");
                    }
                }

                setTarefa(data); // Atualiza as informações da tarefa
                setStatus(data.status); // Atualiza o estado do status da tarefa
            })
            .catch((err) => console.error("Erro ao buscar tarefa:", err));
    }, [id]); // Este efeito é acionado toda vez que o ID da tarefa mudar

    // Função para atualizar a tarefa
    const handleUpdate = (e) => {
        e.preventDefault(); // Evita o recarregamento da página ao enviar o formulário
        const usuarioId = localStorage.getItem("id_usuario");

        // Formatar o prazo da tarefa para o formato correto
        const formattedPrazo = tarefa.prazo ? tarefa.prazo.split('T')[0] : null;

        // Requisição para atualizar a tarefa
        axios.put(`http://localhost:3001/update_user/${usuarioId}/tasks/${id}`, {
            titulo: tarefa.titulo,
            descricao: tarefa.descricao,
            status: status,
            prazo: formattedPrazo, // Envia o prazo formatado
        })
            .then(() => alert("Tarefa atualizada com sucesso!"))
            .catch((err) => console.error("Erro ao atualizar tarefa:", err));
    };

    // Função para deletar a tarefa
    const handleDelete = () => {
        const usuarioId = localStorage.getItem("id_usuario");

        // Confirmação antes de deletar
        if (window.confirm("Tem certeza que deseja deletar esta tarefa?")) {
            axios.delete(`http://localhost:3001/delete_user/${usuarioId}/tasks/${id}`)
                .then(() => {
                    alert("Tarefa deletada com sucesso!");
                    navigate("/user_start"); // Redireciona o usuário para o painel principal
                })
                .catch((err) => console.error("Erro ao deletar tarefa:", err));
        }
    };

    return (
        <>
            <User_Navbar /> {/* Exibe a Navbar do usuário */}
            <div className="form-container-gerenciar">
                <form onSubmit={handleUpdate} className="form-gerenciar">
                    <p>{userName.nome} {userName.sobrenome}</p> {/* Exibe o nome completo do usuário */}
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
                            <textarea
                                rows={5}
                                cols={50}
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
