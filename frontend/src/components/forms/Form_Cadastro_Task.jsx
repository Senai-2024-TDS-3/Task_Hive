import { useState, useEffect } from 'react'; //  do React
import axios from 'axios'; // Biblioteca para requisições HTTP

export default function Form_Cadastro_Task() {
    // Estados para armazenar os valores do formulário
    const [titulo, setTitulo] = useState(''); // Título da tarefa
    const [descricao, setDescricao] = useState(''); // Descrição da tarefa
    const [status, setStatus] = useState('Pendente'); // Status da tarefa
    const [prazo, setPrazo] = useState(''); // Prazo da tarefa
    const [idUsuario, setIdUsuario] = useState(null); // ID do usuário logado
    const [userName, setUserName] = useState({ nome: "", sobrenome: "" }); // Nome do usuário logado

    //buscar o nome do usuário logado ao carregar o componente
    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario"); // Obtém o ID do usuário do localStorage
            if (userId) {
                try {
                    // Requisição para buscar informações do usuário
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserName(response.data); // Atualiza o estado com os dados do usuário
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername();
    }, []); // Executa apenas ao montar o componente

    //obter o ID do usuário logado do localStorage
    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario");
        if (usuarioId) {
            setIdUsuario(usuarioId); // Define o ID do usuário no estado
        } else {
            alert("Usuário não autenticado. Faça login novamente."); // Exibe alerta se o usuário não estiver autenticado
        }
    }, []); // Executa apenas ao montar o componente

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        if (!idUsuario) {
            alert('Usuário não autenticado!'); // Verifica se o ID do usuário está definido
            return;
        }

        // Dados da tarefa a serem enviados para o backend
        const taskData = {
            titulo,
            descricao,
            status,
            prazo,
            id_usuario: idUsuario,
        };

        try {
            // Requisição POST para cadastrar a tarefa
            const response = await fetch('http://localhost:3001/cadastrar_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (response.ok) {
                alert('Tarefa cadastrada com sucesso!'); // Exibe mensagem de sucesso
                // Reseta os campos do formulário
                setTitulo('');
                setDescricao('');
                setStatus('Pendente');
                setPrazo('');
            } else {
                alert('Erro ao cadastrar a tarefa.'); // Exibe mensagem de erro
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error); // Loga o erro no console
            alert('Erro ao enviar dados'); // Exibe alerta de erro
        }
    };

    return (
        // Estrutura do formulário
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                {/* Exibe o nome do usuário logado */}
                <p>{userName.nome} {userName.sobrenome}</p>
                <div className="form-row">
                    {/* Campo para o título da tarefa */}
                    <label>
                        Nome da Tarefa:
                        <input
                            type="text"
                            placeholder="Digite o nome da tarefa"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} // Atualiza o estado do título
                        />
                    </label>
                    {/* Campo para o prazo */}
                    <label>
                        Prazo:
                        <input
                            type="date"
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)} // Atualiza o estado do prazo
                        />
                    </label>
                    {/* Campo para o status */}
                    <label>
                        Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} // Atualiza o estado do status
                        >
                            <option>Pendente</option>
                            <option>Em andamento</option>
                            <option>Concluído</option>
                        </select>
                    </label>
                </div>
                <div className="form-task">
                    {/* Campo para a descrição */}
                    <label>
                        Descrição:
                        <textarea
                            className="text-area"
                            placeholder="Digite a descrição da tarefa"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado da descrição
                        ></textarea>
                    </label>
                </div>
                <br />
                <div className="btn_width">
                    {/* Botão para enviar o formulário */}
                    <button type="submit">Enviar</button>
                    <br />
                    <button type="submit">Atualizar</button>
                    <br />
                    <button type="submit">Deletar</button>
                    <br />
                </div>
            </form>
        </div>
    );
}
