import { useEffect, useState } from "react";
import axios from 'axios';

export default function Hex_Cell_Task() {
    const [tasks, setTasks] = useState([]);
    const [classe, setClasse] = useState("layout_left");
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const fetchtask = async () => {
            const response = await fetch('http://localhost:3001/visualizar_all_tasks');
            const data = await response.json();
            console.log(data)
            setTasks(data);
        };

        fetchtask(); // Chama a função para buscar as tarefas

    }, []); // Passando o array vazio para o useEffect rodar apenas uma vez ao carregar o componente

    
    console.log(idx)

    function alterValue(index) {
        if (index % 7 === 0) {
            console.log("7!!!!!!!!!!!!!!")
            classe == "layout_left" ? setClasse('layout_right') : setClasse('layout_left')

            return
        }
    }

    const ArrayDataItems = ({ items }) => {

        return items.map((tarefa, index) =>
            <>
                {
                    setIdx(index += 1)
                },
                {
                    alterValue(index)
                }
                <div className="Hex_Layout_Tasks" >
                    {/* NUMERO MÁXIMO = 7 */}
                    <div className={classe} >
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
