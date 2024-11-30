const mysql = require('mysql2');

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'TaskHive_DB'
});

// Verifique se a conexão foi bem-sucedida
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados');
});
