import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hex_Cell_Task() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchtask = async () => {
            try {
                const response = await fetch('http://localhost:3001/visualizar_all_tasks');
                const data = await response.json();
                // Garante que `data` seja um array antes de definir no estado
                setTasks(Array.isArray(data) ? data : []);
                console.log(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
                setTasks([]); // Define como array vazio em caso de erro
            } finally {
                setLoading(false);
            }
        };

        fetchtask();
    }, []);

    const ArrayDataItems = ({ items }) => {
        if (!items.length) {
            return <p className="text-[#F0A500]">Nenhuma tarefa encontrada.</p>; // Mensagem para quando não houver tarefas
        }

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
                                            <Link to={`/admin_visualizar_task/${tarefa.id}`} className="task-link">
                                                {/* Nome e sobrenome do usuário que cadastrou a tarefa */}
                                                <span className="span_nome">{tarefa.nome}</span>
                                                <br />
                                                <span className="span_nome">{tarefa.sobrenome}</span>
                                                <br />
                                                <span className="span_titulo">{tarefa.titulo}</span>
                                                <br />
                                                <span className="span_prazo">{tarefa.prazo}</span>
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