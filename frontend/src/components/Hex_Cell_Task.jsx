import { useEffect, useState } from "react";
import axios from 'axios';

export default function Hex_Cell_Task() {
    const [tasks, setTasks] = useState([]);
    const [limite, setLimites] = useState();

    const MaxLeft = 7;

    useEffect(() => {
        const fetchtask = async () => {
            const response = await fetch('http://localhost:3001/visualizar_all_tasks');
            const data = await response.json();
            console.log(data)
            setTasks(data);
        };

        fetchtask(); // Chama a função para buscar as tarefas

    }, []); // Passando o array vazio para o useEffect rodar apenas uma vez ao carregar o componente

    const leftTasks = Array.isArray(tasks) ? tasks.slice(7, MaxLeft) : []; // Divide as tarefas para a parte esquerda
    const rightTasks = Array.isArray(tasks) ? tasks.slice(MaxLeft) : []; // Divide as tarefas para a parte direita

    const ArrayDataItems = ({ items }) => {

        return items.map((tarefa, index) =>
            <>

                    <div className="hex_wrapper " key={index}>
                        
                        <div className="hex_task">
                            <div className="lista_task">
                                {/* puxar o nome do usuário atraves do ID */}
                                <span className="span_titulo">{tarefa.titulo}</span>
                                <br />
                                <span className="span_prazo">{tarefa.prazo}</span>
                            </div>
                        </div>
                    </div>
            </>
        )
    }

    return (
        <>
            <div className="Hex_Layout_Tasks">
                <ArrayDataItems items={tasks} />
            </div>
        </>
    );
}
