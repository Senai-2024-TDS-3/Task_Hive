import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form_Cadastro_Task() {
    // Definindo os estados do formulário
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [prazo, setPrazo] = useState('');
    const [idUsuario, setIdUsuario] = useState(null); // O id do usuário será carregado aqui
    const [userName, setUserName] = useState ({ nome: "", sobrenome: ""});

    useEffect(() => {
        const fetchUsername = async () => {
            const userId = localStorage.getItem("id_usuario");
            if (userId) {
                try {
                    const response = await axios.get(`http://localhost:3001/visualizar_user/${userId}`);
                    setUserName(response.data);
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };
        fetchUsername();
    }, []);




    useEffect(() => {
        const usuarioId = localStorage.getItem("id_usuario");
        if (usuarioId) {
            setIdUsuario(usuarioId);
        } else {
            alert("Usuário não autenticado. Faça login novamente.");
        }
    }, []);
    // Esse efeito roda apenas uma vez quando o componente é montado

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!idUsuario) {
            alert('Usuário não autenticado!');
            return;
        }

        // Criar um objeto de dados a serem enviados para o backend
        const taskData = {
            titulo,
            descricao,
            status,
            prazo,
            id_usuario: idUsuario // Passando o id do usuário logado
        };

        try {
            // Enviar os dados para o backend usando fetch ou axios
            const response = await fetch('http://localhost:3001/cadastrar_task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData)
            });

            if (response.ok) {
                alert('Tarefa cadastrada com sucesso!');
            } else {
                alert('Erro ao cadastrar a tarefa.');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados');
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <p>{userName.nome} {userName.sobrenome}</p>
                {/* Aqui pode puxar o nome do usuário do estado ou contexto */}
                <div className="form-row">
                    <label>
                        Nome da Tarefa:
                        <input
                            type="text"
                            placeholder="Digite o nome da tarefa"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </label>
                    <label>
                        Prazo:
                        <input
                            type="date"
                            value={prazo}
                            onChange={(e) => setPrazo(e.target.value)}
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option>Pendente</option>
                            <option>Em andamento</option>
                            <option>Concluído</option>
                        </select>
                    </label>
                </div>
                <div className="form-task">
                    <label>
                        Descrição:
                        <textarea
                            className="text-area"
                            placeholder="Digite a descrição da tarefa"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>
                    </label>
                </div>
                <br />
                <div className="btn_width">
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