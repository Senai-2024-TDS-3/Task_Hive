const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express()
app.use(express.json())
const port = 3000

// npm i cors
app.use(cors({
    origin: '*'
}))

app.get('/params/:id', (req, res) =>{
    const { id } = req.params

    res.send(id)
})

// Post para cadastrar novos usuários no banco de dados
app.post('/cadastro', (req, res) => {
    const {nome, email, senha, pontos, nivel, data_criacao, tipo} = req.body
    console.log('O frontend requisitou uma rota api')
    db.query(
        `INSERT INTO users (nome, email, senha, pontos, nivel, data_criacao, tipo) VALUES (?,?,?,?,?,?,?)`,
        [nome, email, senha, Number(pontos), nivel, data_criacao, tipo],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção', err)
                return
            }
            console.log(results)
            console.log(fields)
        }
    )
    res.send(`Usuário cadastrado com sucesso!\nNome: ${nome}\nEmail: ${email}\nData de criação: ${data_criacao}`)
})

// Post para registrar novas tarefas
app.post('/registrotarefa', (req, res) => {
    const {titulo, descricao, resposta_correta, nivel_minimo, data_criacao} = req.body
    console.log('O frontend requisitou uma rota api')
    db.query(
        `INSERT INTO users (titulo, descricao, resposta_correta, nivel_minimo, data_criacao) VALUES (?,?,?,?,?)`,
        [titulo, descricao, resposta_correta, nivel_minimo, data_criacao],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção', err)
                return
            }
            console.log(results)
            console.log(fields)
        }
    )
    res.send(`Tarefa registrada com sucesso!\nTítulo: ${titulo}\nDescrição: ${descricao}\nData de criação: ${data_criacao}`)
})

// Tabela responses
app.post('/registroresposta', (req, res) => {
    const {resposta, status, data_envio} = req.body
    console.log('O frontend requisitou uma rota api')
    db.query(
        `INSERT INTO responses (resposta, status, data_envio) VALUES (?,?,?)`,
        [resposta, status, data_envio],
        function (err, results, fields) {
            if (err) {
                console.error('Erro na inserção', err)
                return
            }
            console.log(results)
            console.log(fields)
        }
    )
    res.send(`Resposta cadastrada com sucesso!\nResposta: ${resposta}\nStatus: ${status}\nData de envio: ${data_envio}`)
})






// Atualizar tabela
app.put('/atualizar/:id', (req, res) =>{
    const {id} = req.params
    const{marca, modelo, ano, proprietario, cor} = req.body
    console.log('Veiculo atualizado com sucesso!')
 
    db.query(
        `UPDATE veiculos set marca = ?, modelo = ?, ano = ?, cor = ?, proprietario = ? WHERE id = ?`,
        [marca, modelo, Number(ano), cor, proprietario, id],
        function (err, results, fields){
            if (err) {
                console.error('Erro na atualização:', err)
                return
            }
            console.log(results)
            console.log(results)
        }
    )

})

// Deletar veículo por id
app.delete('/deletarid/:id', (req, res) => {
    const id  = req.params.id;
  
    db.query(
        `DELETE FROM veiculos WHERE id = ?`,
        [id],

        function (err, results, fidels) {
            if (err) {
                console.error('Erro na consulta', err)
                return res.status(500).json({error : 'Erro ao deletar veículo(s)'})
            }
            return res.json(results);
        }
    )
    
    });
    
// Deletar veículo por modelo
app.delete('/deletarmodelo/:modelo', (req, res) => {
    const modelo = req.params.modelo.toLowerCase();
    
    db.query(
        `DELETE FROM veiculos WHERE modelo = ? `,
        [modelo],
        function (err, results, fidels) {
        if (err) {
            console.error('Erro na consulta', err)
            return res.status(500).json({error : 'Erro ao deletar veículo(s)'})
        }
        return res.json(results);
    }
)

});

// Selecionar todos os veículos
app.get('/selecionartodos', (req, res) => {
    db.query(
        `SELECT * FROM veiculos`,
        function (err, results, fields) {
            if (err) {
                console.error('Erro na consulta', err)
                return res.status(500).json({ error: 'Erro ao consultar veículos'})
            }
            return res.json(results);
        }
    )
   
})

// Selecionar veículos por id
app.get('/selecionarporid/:id', (req, res) => {
    const id = req.params.id;
    
    db.query(
        `SELECT * FROM veiculos WHERE id = ?`,
        [id],
        function (err, results, fidels) {
            if (err) {
                console.error('Erro na consulta', err)
                return res.status(500).json({error : 'Erro ao consultar veículos'})
            }
            return res.json(results);
        }
    )
  
});

// Selecionar veículos por ano
app.get('/selecionarano/:ano', (req, res) => {
    const ano = parseInt(req.params.ano);

    db.query(
        `SELECT * FROM veiculos WHERE ano = ?`,
        [ano],
        function (err, results, fidels) {
            if (err) {
                console.error('Erro na consulta', err)
                return res.status(500).json({error : 'Erro ao consultar veículos'})
            }
            return res.json(results);
        }
    )
  
})

// Selecionar veículos por cor azul
app.get('/selecionarcor/:cor', (req, res) => {
    const cor = req.params.cor.toLowerCase();
    
    db.query(
        `SELECT * FROM veiculos WHERE cor = 'Azul'`,
        [cor],
        function (err, results, fidels) {
            if (err) {
                console.error('Erro na consulta', err)
                return res.status(500).json({error : 'Erro ao consultar veículos'})
            }
            return res.json(results);
        }
    )
  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})