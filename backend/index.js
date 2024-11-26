const express = require("express");
const cors = require("cors");
const db = require("./db");
const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const port = 3001;

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "seu-email@gmail.com",
        pass: "sua-senha",
    },
});

app.post("/esqueci-minha-senha", (req, res) => {
    const { email } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuário:", err);
            return res.status(500).send("Erro ao buscar usuário.");
        }

        if (results.length === 0) {
            return res.status(404).send("Usuário não encontrado!");
        }

        const token = CryptoJS.AES.encrypt(email, "chaveSecreta").toString();
        const resetLink = `http://localhost:3000/redefinir-senha?token=${encodeURIComponent(token)}`;

        transporter.sendMail(
            {
                from: "seu-email@gmail.com",
                to: email,
                subject: "Redefinição de senha",
                html: `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a></p>`,
            },
            (emailErr, info) => {
                if (emailErr) {
                    console.error("Erro ao enviar e-mail:", emailErr);
                    return res.status(500).send("Erro ao enviar e-mail.");
                }

                res.status(200).send("E-mail enviado com sucesso!");
            }
        );
    });
});

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error("Erro no login:", err);
            return res.status(500).send("Erro ao fazer login");
        }

        if (results.length === 0) {
            return res.status(401).send("Usuário não encontrado!");
        }

        const usuario = results[0];
        const bytes = CryptoJS.AES.decrypt(usuario.senha, "chaveSecreta");
        const senhaDescriptografada = bytes.toString(CryptoJS.enc.Utf8);

        if (senhaDescriptografada !== senha) {
            return res.status(401).send("Senha incorreta!");
        }

        // Login bem-sucedido
        res.status(200).json({
            message: "Login bem-sucedido!",
            redirect: usuario.tipo === "admin" ? "Admin_Start" : "User_Start",
        });
    });
});

app.post("/cadastrar_user", async (req, res) => {
    const { nome, sobrenome, email, senha, organizacao } = req.body;

    try {
        const senhaCriptografada = CryptoJS.AES.encrypt(senha, "chaveSecreta").toString();

        await db.query(
            `INSERT INTO usuarios (nome, sobrenome, email, senha, organizacao, tipo) VALUES (?, ?, ?, ?, ?, 'usuario')`,
            [nome, sobrenome, email, senhaCriptografada, organizacao]
        );

        res.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        res.status(500).send("Erro ao criar usuário");
    }
});


// POST ADMIN
app.post('/cadastrar_admin',(req, res) => {
    const { nome, sobrenome, email, senha, organizacao } = req.body;
    try {
         // Criptografia da senha
         const senhaCriptografada = CryptoJS.AES.encrypt(senha, 'chaveSecreta').toString();
         console.log(nome,sobrenome,email,senha,organizacao)
         db.query(
            `INSERT INTO usuarios (nome, sobrenome, email, senha, organizacao, tipo) VALUES (?, ?, ?, ?, ?, 'admin')`,
            [nome, sobrenome, email, senhaCriptografada, organizacao],
            function (err, results, fields) {
                if (err) {
                    console.error('Erro na inserção:', err);
                    return;
                }
                console.log(results);
                console.log(fields);
            }
           
        );
        res.status(201).send('Admin criado com sucesso!');
        
    } catch (err) {
        res.status(500).send('Erro ao criar admin: ' + err.message);
        
    }
});

// POST TASK
app.post('/cadastrar_task',(req, res) => {
    const {titulo, descricao, status, prazo, id_usuario} = req.body;
    try{
        db.query(
            `INSERT INTO tarefas (id_usuario, titulo, descricao, status, prazo) VALUES (?, ?, ?, ?, ?)`,
            [id_usuario, titulo, descricao, status, prazo],
            function (err, results, fields) {
                if (err) {
                console.error('Erro na inserção:', err);
                    return;
                    }
                    console.log(results);
                    console.log(fields);
                }
            );
            res.status(201).send('Tarefa criada com sucesso!');
            
        } catch (err) {
            res.status(500).send('Erro ao criar tarefa: ' + err.message);
            }
});

// GET ALL ADMINS
app.get('/visualizar_admins', async (req, res) => {
    try {
        // Realiza a consulta assíncrona
        const [admins] = await db.promise().query(`SELECT * FROM usuarios WHERE tipo = 'admin'`);
        
        // Verifica se encontrou algum admin
        if (admins.length === 0) {
            return res.status(404).json({ message: 'Nenhum admin encontrado' });
        }

        // Retorna todos os admins encontrados
        res.status(200).json(admins);
    } catch (err) {
        console.error('Erro ao buscar admins:', err.message);
        res.status(500).send('Erro ao buscar admins: ' + err.message);
    }
});

// DELETE ADMIN
app.delete('/deletar_admin/:id',(req, res) => {
    const { id } = req.params;
    try {
         db.query(`DELETE FROM usuarios WHERE id = ? AND tipo = 'admin'`, [id]);
        res.status(200).send('Admin deletado com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao deletar admin: ' + err.message);
    }
});

// GET ALL TASKS
app.get('/visualizar_all_tasks', async (req, res) => {
    try {
        // Realiza a consulta assíncrona para buscar todas as tarefas
        const [tarefas] = await db.promise().query(`SELECT * FROM tarefas`);
        
        // Verifica se encontrou tarefas
        if (tarefas.length === 0) {
            return res.status(404).json({ message: 'Nenhuma tarefa encontrada' });
        }

        // Retorna todas as tarefas encontradas
        res.status(200).json(tarefas);
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err.message);
        res.status(500).send('Erro ao buscar tarefas: ' + err.message);
    }
});

// PUT TASK
app.put('/update_task/:id',(req, res) => {
    const { id } = req.params;
    const { titulo, descricao, status, prazo } = req.body;
    try {
         db.query(
            `UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, prazo = ? WHERE id = ?`,
            [titulo, descricao, status, prazo, id]
        );
        res.status(200).send('Tarefa atualizada com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao atualizar tarefa: ' + err.message);
    }
});

// GET USER
app.get('/visualizar_user/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Realiza a consulta assíncrona
        const [usuarios] = await db.promise().query(`SELECT * FROM usuarios WHERE id = ? AND tipo = 'usuario'`, [id]);
        
        if (usuarios.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna o usuário encontrado
        res.status(200).json(usuarios[0]); // Se quiser retornar o primeiro usuário, ou altere conforme necessário
    } catch (err) {
        console.error('Erro ao buscar usuário:', err.message);
        res.status(500).send('Erro ao buscar usuário: ' + err.message);
    }
});

// GET USER TASKS
app.get('/visualizar_user/:id/tasks', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Realiza a consulta assíncrona para buscar as tarefas do usuário com id específico
        const [tarefas] = await db.promise().query(`SELECT * FROM tarefas WHERE id_usuario = ?`, [id]);
        
        // Verifica se encontrou tarefas
        if (tarefas.length === 0) {
            return res.status(404).json({ message: `Nenhuma tarefa encontrada para o usuário com ID ${id}` });
        }

        // Retorna as tarefas encontradas
        res.status(200).json(tarefas);
    } catch (err) {
        console.error('Erro ao buscar tarefas do usuário:', err.message);
        res.status(500).send('Erro ao buscar tarefas do usuário: ' + err.message);
    }
});

// PUT USER TASK
app.put('/update_user/:id/tasks/:idTask',(req, res) => {
    const { id, idTask } = req.params;
    const { titulo, descricao, status, prazo } = req.body;
    try {
        db.query(
            `UPDATE tarefas SET titulo = ?, descricao = ?, status = ?, prazo = ? WHERE id = ? AND id_usuario = ?`,
            [titulo, descricao, status, prazo, idTask, id]
        );
        res.status(200).send('Tarefa atualizada com sucesso!');
    } catch (err) {
        res.status(500).send('Erro ao atualizar tarefa: ' + err.message);
    }
});

// DELETE USER TASK
app.delete('/delete_user/:id/tasks/:idTask',(req, res) => {
    const { id, idTask } = req.params;
    try {
        const [result] = db.query(
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
