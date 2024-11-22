CREATE DATABASE TaskHive_DB;

USE TaskHive_DB;

CREATE TABLE usuarios 
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    sobrenome VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    organizacao VARCHAR(50),
    tipo ENUM('admin', 'usuario') DEFAULT 'usuario' NOT NULL
);

-- Tabela de tarefas
CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    descricao TEXT,
    status ENUM('pendente', 'em_andamento', 'concluida') DEFAULT 'pendente' NOT NULL,
    prazo DATETIME DEFAULT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

SELECT * FROM usuarios;

SELECT * FROM tarefas;
