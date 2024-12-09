import { useEffect, useState } from "react"; // Importa useEffect e useState do React
import { Link } from "react-router-dom"; // Importa o componente Link para navegação entre páginas

export default function Hex_Cell_User() {
    // Define o estado para armazenar os usuários
    const [usuario, setUsuario] = useState([]); // Inicializado como um array vazio

    useEffect(() => {
        // Função  para buscar os usuários da API
        const fetchUser = async () => {
            try {
                // Faz uma requisição GET para o endpoint que retorna todos os usuários
                const response = await fetch('http://localhost:3001/visualizar_user/');
                const data = await response.json(); // Converte a resposta em JSON
                console.log(data); // Exibe os dados no console para depuração
                setUsuario(data); // Atualiza o estado com os dados recebidos
            } catch (error) {
                // Caso ocorra algum erro na requisição, exibe no console
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUser(); // Chama a função para buscar os usuários
    }, []); // O array vazio garante que o efeito será executado apenas uma vez na montagem do componente

    // Componente para renderizar os itens do array de usuários
    const ArrayDataItems = ({ items }) => {
        return (
            <div className="hex_bigbox"> {/* Contêiner principal */}
                <div className="Hex_Layout_User">
                    {/* Mapeia o array de usuários para criar os elementos na interface */}
                    {items.map((usuario, index) => {
                        // Alterna entre as classes CSS 'layout_left' e 'layout_right' com base no índice
                        const classe = Math.floor(index / 7) % 2 === 0 ? "layout_left" : "layout_right";

                        return (
                            <div className={`Hex_Layout_User ${classe}`} key={index}> {/* Define a classe dinamicamente */}
                                <div className="hex_wrapper"> {/* Contêiner para o layout hexagonal */}
                                    <div className="hex_user">
                                        <div className="lista_user">
                                            {/* Link para redirecionar para a página do usuário ao clicar */}
                                            <Link to={`/admin_visualizar_user/${usuario.id}`} className="user-link">
                                                {/* Exibe o nome e sobrenome do usuário */}
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
            {/* Renderiza o componente ArrayDataItems com os dados de usuário */}
            <ArrayDataItems items={usuario} />
        </div>
    );
}

