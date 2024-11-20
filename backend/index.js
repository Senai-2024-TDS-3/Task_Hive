const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

// COM A PORTA 3000 NÃO ESTAVA FUNCIONANDO
const port = 3001;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// PRECISA TESTAR TODOS OS PATHS COM O POSTMAN (AQUI DEU ERRO, MAS ENVIOU PARA O BANCO DE DADOS)

// POST ADMIN
app.post('/cadastrar_admin', async (req, res) => {
    const { nome, sobrenome, email, senha, organizacao } = req.body;
    try {
        await db.query(
            `INSERT INTO usuarios (nome, sobrenome, email, senha, organizacao, tipo) VALUES (?, ?, ?, ?, ?, 'admin')`,
            [nome, sobrenome, email, senha, organizacao]
        );
        res.status(201).send('Admin criado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao criar admin: ' + err.message);
    }
});

// GET ALL ADMINS
app.get('/visualizar_admins', async (req, res) => {
    try {
        const [admins] = await db.query(`SELECT * FROM usuarios WHERE tipo = 'admin'`);
        res.status(200).json(admins);
    } catch (err) {
        res.status(500).send('Erro ao buscar admins: ' + err.message);
    }
});

// DELETE ADMIN
app.delete('/deletar_admin/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(`DELETE FROM usuarios WHERE id = ? AND tipo = 'admin'`, [id]);
        res.status(200).send('Admin deletado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao deletar admin: ' + err.message);
    }
});

// GET ALL TASKS
app.get('/visualizar_all_tasks', async (req, res) => {
    try {
        const [tarefas] = await db.query(`SELECT * FROM tarefas`);
        res.status(200).json(tarefas);
    } catch (err) {
        res.status(500).send('Erro ao buscar tarefas: ' + err.message);
    }
});

// PUT TASK
app.put('/update_task/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, prazo } = req.body;
    try {
        await db.query(
            `UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, prazo = ? WHERE id = ?`,
            [titulo, descricao, status, prazo, id]
        );
        res.status(200).send('Tarefa atualizada com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao atualizar tarefa: ' + err.message);
    }
});

// POST USER
app.post('/cadastrar_user', async (req, res) => {
    const { nome, sobrenome, email, senha, organizacao } = req.body;
    try {
        await db.query(
            `INSERT INTO usuarios (nome, sobrenome, email, senha, organizacao, tipo) VALUES (?, ?, ?, ?, ?, 'usuario')`,
            [nome, sobrenome, email, senha, organizacao]
        );
        res.status(201).send('Usuário criado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao criar usuário: ' + err.message);
    }
});

// GET USER
app.get('/visualizar_user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [usuario] = await db.query(`SELECT * FROM usuarios WHERE id = ? AND tipo = 'usuario'`, [id]);
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).send('Erro ao buscar usuário: ' + err.message);
    }
});

// GET USER TASKS
app.get('/visualizar_user/:id/tasks', async (req, res) => {
    const { id } = req.params;
    try {
        const [tarefas] = await db.query(`SELECT * FROM tarefas WHERE id_usuario = ?`, [id]);
        res.status(200).json(tarefas);
    } catch (err) {
        res.status(500).send('Erro ao buscar tarefas do usuário: ' + err.message);
    }
});

// PUT USER TASK
app.put('/update_user/:id/tasks/:idTask', async (req, res) => {
    const { id, idTask } = req.params;
    const { titulo, descricao, status, prazo } = req.body;
    try {
        await db.query(
            `UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, prazo = ? WHERE id = ? AND id_usuario = ?`,
            [titulo, descricao, status, prazo, idTask, id]
        );
        res.status(200).send('Tarefa atualizada com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao atualizar tarefa: ' + err.message);
    }
});

// DELETE USER TASK
app.delete('/delete_user/:id/tasks/:idTask', async (req, res) => {
    const { id, idTask } = req.params;
    try {
        const [result] = await db.query(
            `DELETE FROM tarefas WHERE id = ? AND id_usuario = ?`,
            [idTask, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send('Tarefa não encontrada ou não pertence a este usuário.');
        }

        res.status(200).send('Tarefa deletada com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao deletar tarefa: ' + err.message);
    }
});
