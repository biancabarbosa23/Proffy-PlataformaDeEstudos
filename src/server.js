/*
    1°) Criação dos modulos
        A) $ npm init -y  --> criação do package.json(configurações do projeto)
        B) $ npm install express --> intalação de outro modulo 
        C) $ npm install nunjucks --> template engine
*/

const express = require('express') //importando express
const server = express()
const {pageLanding, pageStudy, pageGiveClasses} = require('./pages') //importando os objetos e funcões de pages 
const nunjucks = require('nunjucks') //inportando nunjucks

//configuração do nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})

server.use(express.static("public")) //use = configurações do server (executando os arquivos de css/script da pagina)
.get("/", pageLanding) //achar a rota do barra 
.get("/study", pageStudy) //achar a rota do barra estudar
.get("/give-classes", pageGiveClasses)  //achar a rota do barra

.listen(5500) // 500 = numero da porta */




    /*  B) $ node src/server.js  --> buscar essa propria pasta (iniciar o servidor)
                                 --> Ctrl + C fecha o servidor
        B) $ npm install nodemon -D  --> Iniciar e deixar rodando o servidor (poupa de usar o codigo acima)
        C) Alterar o Package.json 
                    "scripts": {
                "dev": "nodemon src/server.js"},  --> no lugar de "teste"  (para encontrar o nodemon)
            
            D) $ npm run dev  --> Rodar e abrir o servidor pelo nodemon
    */
    