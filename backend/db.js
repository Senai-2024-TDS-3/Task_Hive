// Importa o módulo mysql2 para criar uma conexão com o banco de dados MySQL
const mysql = require('mysql2');

// Cria uma instância do pool de conexões MySQL
const db = mysql.createPool({
    host: 'localhost', // Host do banco de dados (neste caso, localmente)
    user: 'root', // Nome de usuário para autenticação no banco de dados
    password: 'root', // Senha para autenticação no banco de dados
    database: 'TaskHive_DB', // Nome do banco de dados a ser utilizado
    waitForConnections: true, // Permite aguardar por conexões quando o pool estiver cheio
    connectionLimit: 10, // Número máximo de conexões simultâneas no pool
    queueLimit: 0, // Não limita o número de conexões na fila (valor 0 significa sem limite)
});

// Tenta estabelecer uma conexão com o banco de dados e exibe uma mensagem no console
db.getConnection((err, connection) => {
    if (err) {
        // Caso ocorra um erro ao tentar se conectar ao banco, exibe uma mensagem de erro
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        // Caso a conexão seja bem-sucedida, exibe uma mensagem de sucesso
        console.log("Conectado ao banco de dados");
        // Libera a conexão após o teste de conexão, para que ela seja reutilizada pelo pool
        connection.release();
    }
});

// Exporta o pool de conexões para que seja utilizado em outros módulos do sistema
module.exports = db;
