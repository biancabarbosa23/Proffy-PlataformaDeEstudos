// $ npm install sqlite-async  ---> Instala o Bnaco de Dados sqlite
// $ npm src/database/db.js  ---> executar o database  

const Database = require('sqlite-async')  //importando o sqlite

function execute(db){

    //Criar as tabelas do BD
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (  
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

//module.exports recebendo os dados para mandar a outros arquivos
module.exports =  Database.open(__dirname + '/database.sqlite')  //abrindo o banco de dados
.then(execute) //se abriu então chama a função execute
