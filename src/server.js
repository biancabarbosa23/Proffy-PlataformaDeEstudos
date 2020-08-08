/*
    1°) Criação dos modulos
        A) $ npm init -y  --> criação do package.json(configurações do projeto)
        B) $ npm install express --> intalação de outro modulo 
*/

/*
    2°) Criação do servidor
        A) Chamar o express instalado.   */
            const express = require('express')
            const server = express()

            server.use(express.static("public")) //use = configurações do server (executando os arquivos de css/script da pagina)
            .get("/", function(req, res){ //achar a rota do barra
                return res.sendFile(__dirname + "/views/index.html")  // retorna a pagina inicial para o navegador
            })
            .get("/study", function(req, res){ //achar a rota do barra study
                return res.sendFile(__dirname + "/views/study.html")  // retorna a pagina estudar para o navegador (obs: não esquecer de tirar o .html do botão)
            })
            .get("/give-classes", function(req, res){ //achar a rota do barra
                return res.sendFile(__dirname + "/views/give-classes.html")  // retorna a pagina dar aula para o navegador
            })



            .listen(5500) // 500 = numero da porta 

    /*  B) $ node src/server.js  --> buscar essa propria pasta (iniciar o servidor)
                                 --> Ctrl + C fecha o servidor
        B) $ npm install nodemon -D  --> Iniciar e deixar rodando o servidor (poupa de usar o codigo acima)
        C) Alterar o Package.json 
                    "scripts": {
                "dev": "nodemon src/server.js"},  --> no lugar de "teste"  (para encontrar o nodemon)
            
            D) $ npm run dev  --> Rodar e abrir o servidor pelo nodemon
    */
    