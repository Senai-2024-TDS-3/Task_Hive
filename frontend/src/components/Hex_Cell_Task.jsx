import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hex_Cell_Task() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchtask = async () => {
            try {
                const response = await fetch('http://localhost:3001/visualizar_all_tasks');
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        };

        fetchtask();
    }, []);

    const ArrayDataItems = ({ items }) => {
        const hexagonsLeft = 6; // Número de hexágonos por linha
        const hexagonsRight = 5; // Número de hexágonos por linha

        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_Tasks">
                    {items.map((tarefa, index) => {
                        // Define se é uma linha par ou ímpar
                        const isEvenRow = Math.floor(index / hexagonsLeft) % 2 === 0;
                        const isnotEven = Math.floor(index / hexagonsRight) % 2 !== 0;

                        // Alterna a posição dos hexágonos
                        const classe = isEvenRow ? "layout_left" : "layout_right";
                        const classe2 = isnotEven ? "layout_right" : "layout_left";

                        return (
                            <div className={`hex_item ${classe} ${classe2}`} key={index}>
                                <div className="hex_wrapper">
                                    <div className="hex_task">
                                        <div className="lista_task">
                                            <Link to={`/admin_visualizar_task/${tarefa.id}`} className="task_link">
                                                <span className="span_nome">{tarefa.nome}</span>
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
            <ArrayDataItems items={tasks} />
        </div>
    );
}
