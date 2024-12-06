import './User_Navbar'

export default function FormCard() {

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