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
        const hexagonsPerRowOdd = 7;  // Hexágonos na linha ímpar
        const hexagonsPerRowEven = 6; // Hexágonos na linha par

        const rows = [];
        let currentRow = [];

        // Dividindo as tarefas em linhas de 7 e 6
        items.forEach((tarefa, index) => {
            if (currentRow.length === (index % 2 === 0 ? hexagonsPerRowOdd : hexagonsPerRowEven)) {
                rows.push(currentRow);
                currentRow = [];
            }
            currentRow.push(tarefa);
        });

        // Adiciona a última linha se não for adicionada
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_Tasks">
                    {rows.map((row, rowIndex) => (
                        <div 
                            key={rowIndex} 
                            className="hex_wrapper" 
                            style={{
                                justifyContent: 'center', 
                                marginLeft: rowIndex % 2 === 1 ? '40px' : '0'
                            }}
                        >
                            {row.map((tarefa, index) => (
                                <div className="hex_task" key={index}>
                                    <div className="hex_task_content">
                                        <Link to={`/admin_visualizar_task/${tarefa.id}`} className="task_link">
                                            <span className="span_nome">{tarefa.nome}</span>
                                            <br />
                                            <span className="span_titulo">{tarefa.titulo}</span>
                                            <br />
                                            <span className="span_prazo">{tarefa.prazo}</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
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
