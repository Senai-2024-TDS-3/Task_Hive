import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hex_Cell_User() {
    const ListaUsuarios = () => {
        const [usuarios, setUsuarios] = useState([]);
    
        useEffect(() => {
            // Fazendo a requisição para a API
            axios.get('http://localhost:3001/usuarios')
                .then((response) => {
                    setUsuarios(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar usuários:', error);
                });
        }, []);
        
        return (
            <>
                <div className="hex_wrapper">
                    <div className="hex_teste">
                        {usuarios.map((usuario) => (
                            <li key={usuario.id}>{usuario.nome}</li> 
                        ))}
                    </div>
                </div>

            </>
        )
    }
}