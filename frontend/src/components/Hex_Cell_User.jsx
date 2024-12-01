import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa o Link

export default function Hex_Cell_User() {
    const [usuario, setUsuario] = useState([]); // Mantido como array

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:3001/visualizar_user/');
                const data = await response.json();
                console.log(data);
                setUsuario(data); // Garante que os dados sejam armazenados como array
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUser(); // Chama a função para buscar os dados
    }, []); // Roda apenas uma vez ao carregar o componente

    const ArrayDataItems = ({ items }) => {
        return (
            <div className="hex_bigbox">
                <div className="Hex_Layout_User">
                    {items.map((usuario, index) => {
                        // Alterna entre 'layout_left' e 'layout_right' com base no índice
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (
                            <div className={`Hex_Layout_User ${classe}`} key={index}>
                                <div className="hex_wrapper">
                                    <div className="hex_user">
                                        <div className="lista_user">
                                            {/* Usa o Link para redirecionar ao clicar */}
                                            <Link to={`/admin_visualizar_user/${usuario.id}`}>
                                                <span className="span_titulo">
                                                    {usuario.nome} - {usuario.sobrenome}
                                                </span>
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
            <ArrayDataItems items={usuario} />
        </div>
    );
}
