import User_Navbar from "../components/User_Navbar"
import axios from 'axios';
import Form_Cadastro_User from "./Form_Cadastro_User";




export default function Cadastrar_User() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Pegando os valores do formulário
        const formData = {
            nome: document.getElementById('nome').value.trim(),
            sobrenome: document.getElementById('sobrenome').value.trim(),
            email: document.getElementById('email').value.trim(),
            senha: document.getElementById('senha').value,
            organizacao: document.getElementById('organizacao').value.trim(),
        };

        // Validação dos campos
        if (!formData.nome || !formData.sobrenome || !formData.email || !formData.senha || !formData.organizacao) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        console.log('Dados enviados:', formData);

        // Enviando os dados para o backend
        try {
            const response = await axios.post('http://localhost:3001/cadastrar_user', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar usuário. Tente novamente.';
            alert(errorMessage);
        }
    };
    return (
        <>
            <Form_Cadastro_User />
        </>
    )
}