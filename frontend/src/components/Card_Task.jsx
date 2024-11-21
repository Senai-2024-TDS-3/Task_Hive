import './User_Navbar'

export default function FormCard() {
    // POST Cadastrar tarefa
    // const [formData, setFormData] = useState({
    //     id_usuario: '', // ID do usuário relacionado à tarefa
    //     titulo: '',
    //     descricao: '',
    //     status: 'pendente', // Valor padrão
    //     prazo: '', // Data no formato ISO (yyyy-MM-ddTHH:mm)
    // });

    // const handleChange = (e) => {
    //     const { id, value } = e.target;
    //     setFormData({ ...formData, [id]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3001/cadastrar_tarefa', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });
    //         const data = await response.text();
    //         if (response.ok) {
    //             alert('Tarefa cadastrada com sucesso!');
    //         } else {
    //             alert('Erro ao cadastrar tarefa: ' + data);
    //         }
    //     } catch (err) {
    //         console.error('Erro ao cadastrar tarefa:', err);
    //     }
    // };


    // PUT atualizar tarefa

    // const [formData, setFormData] = useState({
    //     id_usuario: '',
    //     titulo: '',
    //     descricao: '',
    //     status: 'pendente',
    //     prazo: '',
    // });

    // useEffect(() => {
    //     // Carregar os dados da tarefa quando o componente for montado
    //     const fetchTarefa = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:3000/tarefa/${tarefaId}`);
    //             const data = await response.json();
    //             if (response.ok) {
    //                 setFormData({
    //                     id_usuario: data.id_usuario,
    //                     titulo: data.titulo,
    //                     descricao: data.descricao,
    //                     status: data.status,
    //                     prazo: data.prazo,
    //                 });
    //             } else {
    //                 alert('Erro ao carregar tarefa: ' + data);
    //             }
    //         } catch (err) {
    //             console.error('Erro ao carregar tarefa:', err);
    //         }
    //     };

    //     if (tarefaId) {
    //         fetchTarefa();
    //     }
    // }, [tarefaId]);

    // const handleChange = (e) => {
    //     const { id, value } = e.target;
    //     setFormData({ ...formData, [id]: value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`http://localhost:3001/update_task/:id`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(formData),
    //         });
    //         const data = await response.text();
    //         if (response.ok) {
    //             alert('Tarefa atualizada com sucesso!');
    //         } else {
    //             alert('Erro ao atualizar tarefa: ' + data);
    //         }
    //     } catch (err) {
    //         console.error('Erro ao atualizar tarefa:', err);
    //     }
    // };


    
    // DELETE Deletar Tarefa

    // const [tarefaId, setTarefaId] = useState('');

    // const handleChange = (e) => {
    //     setTarefaId(e.target.value);
    // };

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     if (!tarefaId) {
    //         alert("Por favor, insira o ID da tarefa.");
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`http://localhost:3000/delete_user/:id/tasks/:idTask`, {
    //             method: 'DELETE',
    //             headers: { 'Content-Type': 'application/json' },
    //         });

    //         const data = await response.text();
    //         if (response.ok) {
    //             alert('Tarefa deletada com sucesso!');
    //         } else {
    //             alert('Erro ao deletar tarefa: ' + data);
    //         }
    //     } catch (err) {
    //         console.error('Erro ao deletar tarefa:', err);
    //     }
    // };






    return (
        <>
            <div>
                <div>
                    <h1>Cadastrar Tarefa</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="id_usuario">ID do Usuário:</label>
                            <input
                                type="number"
                                id="id_usuario"
                                value={formData.id_usuario}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="titulo">Título:</label>
                            <input
                                type="text"
                                id="titulo"
                                value={formData.titulo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea
                                id="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                        <div>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="pendente">Pendente</option>
                                <option value="em_andamento">Em andamento</option>
                                <option value="concluida">Concluída</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="prazo">Prazo:</label>
                            <input
                                type="datetime-local"
                                id="prazo"
                                value={formData.prazo}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>


            <div>
                <h1>Atualizar Tarefa</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id_usuario">ID do Usuário:</label>
                        <input
                            type="number"
                            id="id_usuario"
                            value={formData.id_usuario}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="titulo">Título:</label>
                        <input
                            type="text"
                            id="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                            id="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="pendente">Pendente</option>
                            <option value="em_andamento">Em andamento</option>
                            <option value="concluida">Concluída</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="prazo">Prazo:</label>
                        <input
                            type="datetime-local"
                            id="prazo"
                            value={formData.prazo}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Atualizar</button>
                </form>
            </div>


            <div>
            <h1>Deletar Tarefa</h1>
            <form onSubmit={handleDelete}>
                <div>
                    <label htmlFor="tarefaId">ID da Tarefa:</label>
                    <input
                        type="number"
                        id="tarefaId"
                        value={tarefaId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Deletar</button>
            </form>
        </div>



        </>
    )
}