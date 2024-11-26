import { useEffect, useState } from "react";
import axios from 'axios';

export default function Hex_Cell_Task() {
    const [tasks, setTasks] = useState([]);
    const MaxLeft = 7;

    useEffect(() => {
        const fetchtask = async () => {
            const response = await fetch('http://localhost:3001/visualizar_all_tasks');
            const data = await response.json();
            setTasks(data);  // Atualiza o estado com as tarefas do backend
        };

        fetchtask(); // Chama a função para buscar as tarefas

    }, []); // Passando o array vazio para o useEffect rodar apenas uma vez ao carregar o componente

    const leftTasks = tasks.slice(0, MaxLeft); // Divide as tarefas para a parte esquerda
    const rightTasks = tasks.slice(MaxLeft); // Divide as tarefas para a parte direita

    return (
        <>
            <div className="hex_wrapper">
                <div className="hex_task">
                    {/* Renderiza as tarefas da parte esquerda */}
                    <div className="left_side">
                        {leftTasks.map((tarefa) => (
                            <div className="lista_task" key={tarefa.id}>
                                {/* Exibindo o nome ou descrição da tarefa */}
                                <li>{tarefa.nome}</li>
                            </div>
                        ))}
                    </div>

                    {/* Renderiza as tarefas da parte direita */}
                    <div className="right_side">
                        {rightTasks.map((tarefa) => (
                            <div className="lista_task" key={tarefa.id}>
                                {/* Exibindo o nome ou descrição da tarefa */}
                                <li>{tarefa.nome}</li>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
