import { useEffect, useState } from "react";

export default function Hex_Cell_User() {
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        const fetchuser = async () => {
            try {
                const response = await fetch('http://localhost:3001/visualizar_user/:id');
                const data = await response.json();
                console.log(data);
                setUsuario(data);
            } catch (error) {
                console.error("Erro ao buscar tarefas:", error);
            }
        };

        fetchuser(); // Chama a função para buscar as tarefas
    }, []); // Roda apenas uma vez ao carregar o componente

    const ArrayDataItems = ({ items }) => {
        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_User">
                    {items.map((usuario, index) => {
                        // Alterna entre 'layout_left' e 'layout_right' com base no índice
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (

                            <div className={`Hex_Layout_User ${classe}`} key={index} >
                                <div className="hex_wrapper">
                                    <div className="hex_user">
                                        <div className="lista_user">
                                            {/* Exibe os dados da tarefa */}
                                            <span className="span_titulo">{usuario.id}{usuario.nome}</span>
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
            <ArrayDataItems items={usuario} />
        </div>
    );
}