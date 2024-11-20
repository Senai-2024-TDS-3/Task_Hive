import React, { useState, useEffect } from 'react';
import './Hive_Card_Login.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function Hive_Card_Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    // Função para lidar com a alteração do email
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Função para lidar com a alteração da senha
    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
    };

    // Função para enviar o login para o backend
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Criptografando a senha antes de enviar
            const senhaCriptografada = CryptoJS.AES.encrypt(senha, 'chaveSecreta').toString();

            // Enviar as credenciais para o backend
            const response = await axios.post('http://localhost:3001/login', {
                email,
                senha: senhaCriptografada
            });

            // Se o login for bem-sucedido
            console.log(response.data);
            // Pode redirecionar ou fazer outra ação aqui

        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
            console.error(err);
        }
    };

    return (
        <div className="hex-grid">
            <div className="hex">
                <label htmlFor="hex-1">Email:</label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Digite seu email" 
                />
                <label htmlFor="hex-2">Senha:</label>
                <input 
                    type="password" 
                    value={senha} 
                    onChange={handleSenhaChange} 
                    placeholder="Digite sua senha" 
                />
                <br />
                <button type="submit" onClick={handleLogin}>Entrar</button>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <br />
                <div className="hex_links">
                    <p>Esqueci minha senha</p>
                    <p>Cadastrar</p>
                </div>
            </div>
        </div>
    );
}