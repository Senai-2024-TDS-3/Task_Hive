import { useParams, useNavigate } from "react-router-dom"; // Hooks para capturar parâmetros da URL e realizar navegação
import { useEffect, useState } from "react"; // Hooks para gerenciar estado e ciclo de vida do componente
import axios from "axios"; // Biblioteca para realizar requisições HTTP
import Admin_Navbar from "./Admin_Navbar"; // Componente da barra de navegação para administradores

export default function Admin_Gerenciar_User() {
    const { id } = useParams(); // Captura o ID do usuário a partir da URL
    const navigate = useNavigate(); // Permite redirecionar o usuário para outra rota
    const [usuario, setUsuario] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        organizacao: "",
        tipo: "",
    }); // Estado inicial para armazenar as informações do usuário

    // Efeito que é executado ao montar o componente para buscar os dados do usuário
    useEffect(() => {
        axios
            .get(`http://localhost:3001/visualizar_user/${id}`) // Faz uma requisição GET para obter os dados do usuário
            .then((response) => {
                setUsuario(response.data); // Atualiza o estado com os dados recebidos
            })
            .catch((err) => console.error("Erro ao buscar usuário:", err)); // Trata erros caso a requisição falhe
    }, [id]); // O efeito depende do ID do usuário. Será reexecutado se o ID mudar.

    // Função para atualizar os dados do usuário
    const handleUpdate = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Criação de um objeto com apenas os campos preenchidos
        const dadosAtualizados = {};
        if (usuario.nome.trim()) dadosAtualizados.nome = usuario.nome;
        if (usuario.sobrenome.trim()) dadosAtualizados.sobrenome = usuario.sobrenome;
        if (usuario.email.trim()) dadosAtualizados.email = usuario.email;
        if (usuario.organizacao.trim()) dadosAtualizados.organizacao = usuario.organizacao;

        // Verifica se há algum campo para atualizar
        if (Object.keys(dadosAtualizados).length === 0) {
            alert("Nenhum dado para atualizar."); // Exibe um alerta se nenhum dado foi preenchido
            return;
        }

        axios
            .put(`http://localhost:3001/atualizar_user/${id}`, dadosAtualizados) // Envia os dados atualizados para o backend
            .then(() => {
                alert("Usuário atualizado com sucesso!"); // Notifica o sucesso da atualização
                navigate("/admin_start"); // Redireciona para a página inicial do administrador
            })
            .catch((err) => console.error("Erro ao atualizar usuário:", err)); // Trata erros
    };

    // Função para deletar o usuário
    const handleDelete = () => {
        if (window.confirm("Tem certeza que deseja deletar este usuário?")) { // Pede confirmação do administrador
            axios
                .delete(`http://localhost:3001/deletar_user/${id}`) // Envia uma requisição DELETE para remover o usuário
                .then(() => {
                    alert("Usuário deletado com sucesso!"); // Notifica o sucesso da exclusão
                    navigate("/admin_start"); // Redireciona para a página inicial do administrador
                })
                .catch((err) => console.error("Erro ao deletar usuário:", err)); // Trata erros
        }
    };

    return (
        <>
            {/* Barra de navegação para o administrador */}
            <Admin_Navbar />

            {/* Container para centralizar e estilizar o formulário */}
            <div className="flex justify-center items-center mt-32 h-full">
                <div className="bg-[#F0A500] p-6 shadow-md w-96 rounded-none">
                    <form onSubmit={handleUpdate}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Campo para editar o nome do usuário */}
                            <div className="flex flex-col">
                                <label htmlFor="nome" className="text-black font-medium">
                                    Nome:
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={usuario.nome} // Exibe o valor atual do nome
                                    onChange={(e) =>
                                        setUsuario({ ...usuario, nome: e.target.value }) // Atualiza o estado ao digitar
                                    }
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>

                            {/* Campo para editar o email do usuário */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-black font-medium">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={usuario.email} // Exibe o valor atual do email
                                    onChange={(e) =>
                                        setUsuario({ ...usuario, email: e.target.value }) // Atualiza o estado ao digitar
                                    }
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>

                            {/* Campo para editar o sobrenome do usuário */}
                            <div className="flex flex-col">
                                <label htmlFor="sobrenome" className="text-black font-medium">
                                    Sobrenome:
                                </label>
                                <input
                                    type="text"
                                    id="sobrenome"
                                    value={usuario.sobrenome} // Exibe o valor atual do sobrenome
                                    onChange={(e) =>
                                        setUsuario({ ...usuario, sobrenome: e.target.value }) // Atualiza o estado ao digitar
                                    }
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>

                            {/* Campo para editar a organização do usuário */}
                            <div className="flex flex-col col-span-1">
                                <label htmlFor="organizacao" className="text-black font-medium">
                                    Organização:
                                </label>
                                <input
                                    type="text"
                                    id="organizacao"
                                    value={usuario.organizacao} // Exibe o valor atual da organização
                                    onChange={(e) =>
                                        setUsuario({ ...usuario, organizacao: e.target.value }) // Atualiza o estado ao digitar
                                    }
                                    className="mt-1 p-2 border rounded-none bg-gray-200 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Campo somente leitura para mostrar o tipo de usuário */}
                        <div className="flex flex-col col-span-2">
                            <label htmlFor="tipo" className="text-black font-medium">
                                Tipo:
                            </label>
                            <input
                                type="text"
                                id="tipo"
                                value={usuario.tipo} // Exibe o valor do tipo
                                readOnly // Campo é somente leitura
                                className="mt-1 p-2 border rounded-none bg-gray-300 focus:outline-none text-gray-600 cursor-not-allowed"
                            />
                        </div>

                        {/* Botão para submeter a atualização */}
                        <button
                            type="submit"
                            className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                        >
                            Atualizar
                        </button>
                    </form>

                    {/* Botão para excluir o usuário */}
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="mt-4 w-full bg-black text-white font-bold py-2 rounded-none hover:bg-[#CF7500] transition"
                    >
                        Deletar
                    </button>
                </div>
            </div>
        </>
    );
}
