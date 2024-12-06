import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa o Link para criar as rotas
import axios from 'axios';


export default function Hex_Cell_User_Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [usuario, setUserName] = useState({ nome: "", sobrenome: "" });

    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    console.log("Dados do usuário:", response.data);
                    setUserName(response.data);
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername();
    }, []);

    useEffect(() => {
        // Recupera o id do usuário do localStorage
        const usuarioId = localStorage.getItem("id_usuario");

        if (!usuarioId) {
            alert("Usuário não autenticado. Faça login novamente.");
            return;
        }

        const fetchTasks = async () => {
            try {
                // Requisição para pegar as tarefas do usuário
                const response = await fetch(`http://localhost:3001/visualizar_user/${usuarioId}/tasks`);
                const data = await response.json();

                // Verifique se o retorno é um array
                if (Array.isArray(data)) {
                    setTasks(data); // Atualiza o estado com as tarefas
                } else {
                    alert('Você não tem nenhuma tarefa cadastrada.');
                }
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        fetchTasks();
    }, []); // Executa o efeito uma vez quando o componente é montado

    const ArrayDataItems = ({ items }) => {
        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_Tasks">
                    {items.map((tarefa, index) => {
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (
                            <div className={`Hex_Layout_Tasks ${classe}`} key={index}>
                                <div className="hex_wrapper">
                                    <div className="hex_task">
                                        <div className="lista_task">
                                            <Link to={`/user_visualizar_task/${tarefa.id}`} className="task-link">
                                                {/* Aqui, você exibe os dados do usuário */}
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
                <p>Carregando tarefas...</p>
            ) : (
                <ArrayDataItems items={tasks} />
            )}
        </div>
    );
}
