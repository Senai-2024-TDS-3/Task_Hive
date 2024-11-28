import Admin_Navbar from "../components/Admin_Navbar"

export default function Admin_Gerenciar_Task() {
    return (
        <>
            <Admin_Navbar />
            <div className="form-container">
                <form>
                    <p>Nome do Usuário</p>
                    {/* puxar nome do Usuario  */}
                    <div className="form-row">
                        <label>
                            Nome da Tarefa:
                            <input type="text" placeholder="Digite o nome da tarefa" />
                        </label>
                        <label>
                            Prazo:
                            <input type="date" />
                        </label>
                        <label>
                            Status:
                            <select>
                                <option>Pendente</option>
                                <option>Em andamento</option>
                                <option>Concluído</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Descrição:
                            <textarea placeholder="Digite a descrição da tarefa"></textarea>
                        </label>
                    </div>
                    <br />
                    <div className="form-row">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </>
    )
}