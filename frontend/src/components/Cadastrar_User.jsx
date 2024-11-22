import User_Navbar from "../components/User_Navbar"
import axios from 'axios';
import Form_Cadastro_User from "./Form_Cadastro_User";




export default function Cadastrar_User() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nome: document.getElementById('nome').value,
            sobrenome: document.getElementById('sobrenome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            organizacao: document.getElementById('organizacao').value,
        };
    
        try {
            const response = await axios.post('http://localhost:3001/cadastrar_user', formData);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.error || 'Erro ao cadastrar usuário');
        }
    };
    return (
        <>
            <Form_Cadastro_User/>



        </>
    )
}