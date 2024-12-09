import { useEffect, useState } from "react"; // Importa hooks do React para gerenciar estados e efeitos colaterais
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas

export default function Hex_Cell_Task() {
    // Define o estado para armazenar as tarefas e o indicador de carregamento
    const [tasks, setTasks] = useState([]); // Estado para a lista de tarefas, inicialmente vazio
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento, inicialmente true

    useEffect(() => {
        // Função assíncrona para buscar as tarefas da API
        const fetchtask = async () => {
            try {
                // Faz uma requisição GET para o endpoint que retorna todas as tarefas
                const response = await fetch('http://localhost:3001/visualizar_all_tasks');
                const data = await response.json(); // Converte a resposta em JSON

                // Garante que `data` seja um array antes de atualizar o estado
                setTasks(Array.isArray(data) ? data : []);
                console.log(data); // Exibe os dados no console para depuração
            } catch (error) {
                // Caso ocorra algum erro na requisição, exibe no console e define as tarefas como uma lista vazia
                console.error("Erro ao buscar tarefas:", error);
                setTasks([]); // Atualiza o estado com um array vazio em caso de erro
            } finally {
                // Define o estado de carregamento como falso após a conclusão da requisição
                setLoading(false);
            }
        };

        fetchtask(); // Chama a função para buscar as tarefas
    }, []); // O array vazio garante que o efeito só seja executado na montagem do componente

    // Componente para renderizar os itens do array de tarefas
    const ArrayDataItems = ({ items }) => {
        // Caso o array de tarefas esteja vazio, exibe uma mensagem informando que não há tarefas
        if (!items.length) {
            return <p className="text-[#F0A500]">Nenhuma tarefa encontrada.</p>;
        }

        return (
            <div className="hex_bigbox"> {/* Contêiner para as tarefas */}
                <div className="Hex_Layout_Tasks">
                    {items.map((tarefa, index) => {
                        // Alterna a classe CSS com base na posição do índice
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (
                            <div className={`Hex_Layout_Tasks ${classe}`} key={index}> {/* Define a classe com base na posição */}
                                <div className="hex_wrapper"> {/* Wrapper para o layout em hexágono */}
                                    <div className="hex_task">
                                        <div className="lista_task">
                                            <Link to={`/admin_visualizar_task/${tarefa.id}`} className="task-link">
                                                {/* Exibe informações da tarefa: nome, sobrenome, título e prazo */}
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
            {/* Exibe uma mensagem de carregamento enquanto as tarefas estão sendo buscadas */}
            {loading ? (
                <p>Carregando tarefas...</p>
            ) : (
                // Renderiza o componente ArrayDataItems com as tarefas obtidas
                <ArrayDataItems items={tasks} />
            )}
        </div>
    );
}
