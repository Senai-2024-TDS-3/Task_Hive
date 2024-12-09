import { useEffect, useState } from "react"; // Importa  do React para estados e efeitos colaterais
import { Link } from "react-router-dom"; // Importa o Link para navegação
import axios from 'axios'; // Importa a biblioteca axios para realizar requisições HTTP

export default function Hex_Cell_User_Task() {
    // Define os estados
    const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas do usuário
    const [loading, setLoading] = useState(true); // Estado para controlar o indicador de carregamento
    const [usuario, setUserName] = useState({ nome: "", sobrenome: "" }); // Estado para armazenar os dados do usuário

    // useEffect para buscar os dados do usuário
    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario"); // Recupera o ID do usuário.
            if (userId) {
                try {
                    // Faz uma requisição GET para buscar os dados do usuário pelo ID
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    console.log("Dados do usuário:", response.data);
                    setUserName(response.data); // Atualiza o estado com os dados do usuário
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername(); // Chama a função para buscar os dados do usuário
    }, []); // Executa o efeito apenas uma vez ao montar o componente

    // useEffect para buscar as tarefas do usuário
    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario"); // Recupera o ID do usuário.

        if (!usuarioId) {
            // Caso o ID não esteja disponível, exibe um alerta e interrompe o processo
            alert("Usuário não autenticado. Faça login novamente.");
            return;
        }

        const fetchTasks = async () => {
            try {
                // Faz uma requisição GET para buscar as tarefas do usuário pelo ID
                const response = await fetch(`http://localhost:3001/visualizar_user/${usuarioId}/tasks`);
                const data = await response.json();

                // Verifica se o retorno é um array
                if (Array.isArray(data)) {
                    setTasks(data); // Atualiza o estado com as tarefas recebidas
                } else {
                    alert('Você não tem nenhuma tarefa cadastrada.'); // Alerta caso não haja tarefas
                }
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error); // Loga o erro no console
            } finally {
                setLoading(false); // Finaliza o indicador de carregamento
            }
        };

        fetchTasks(); // Chama a função para buscar as tarefas
    }, []); // Executa o efeito apenas uma vez ao montar o componente

    // Componente que renderiza as tarefas
    const ArrayDataItems = ({ items }) => {
        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_Tasks">
                    {/* Mapeia as tarefas para criar os elementos na interface */}
                    {items.map((tarefa, index) => {
                        // Alterna as classes CSS com base no índice da tarefa
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (
                            <div className={`Hex_Layout_Tasks ${classe}`} key={index}>
                                <div className="hex_wrapper">
                                    <div className="hex_task">
                                        <div className="lista_task">
                                            {/* Link para redirecionar ao clicar em uma tarefa */}
                                            <Link to={`/user_visualizar_task/${tarefa.id}`} className="task-link">
                                                {/* Exibe informações do usuário e da tarefa */}
                                                <span className="span_nome">{usuario.nome}</span> {/* Nome do usuário */}
                                                <br />
                                                <span className="span_nome">{usuario.sobrenome}</span> {/* Sobrenome do usuário */}
                                                <br />
                                                <span className="span_titulo">{tarefa.titulo}</span> {/* Título da tarefa */}
                                                <br />
                                                <span className="span_prazo">{tarefa.prazo}</span> {/* Prazo da tarefa */}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div>
            {loading ? (
                // Exibe um indicador de carregamento enquanto os dados estão sendo buscados
                <p>Carregando tarefas...</p>
            ) : (
                // Renderiza o componente ArrayDataItems com as tarefas obtidas
                <ArrayDataItems items={tasks} />
            )}
        </div>
    );
}
