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
                setTasks(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            
            }
        };

        fetchtask();
    }, []);

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
                                            <Link to={`/admin_visualizar_task/${tarefa.id}`} className="task-link">
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

