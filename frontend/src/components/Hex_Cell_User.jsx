import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hex_Cell_User() {
    const ListaUsuarios = () => {
        const [usuarios, setUsuarios] = useState([]);
    
    
        useEffect(() => {
            // Fazendo a requisição para a API
            axios.get('http://localhost:3001/visualizar_user/:id')
                .then((response) => {
                    setUsuarios(response.data);
                })
                .catch((error) => {
                    console.error('Erro ao buscar usuários:', error);
                });
        }, []);

    
    const [tasks, setTasks] = useState([])

        const MaxLeft = 7
    
        useEffect(() => {
            const fetchtask = async() => {
                const response  = await fetch('http://localhost:3001/visualizar_user/:id');
                const data = await response.json();
                setTasks(data);
            };
    
            fetchtask();
    
            const leftTasks = tasks.slice(0, maxLeft); 
            const rightTasks = tasks.slice(maxLeft);
    
        })
        
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