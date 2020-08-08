/*1°) Criação dos modulos
    A) $ npm init -y  --> criação do package.json(configurações do projeto)
    B) $ npm install express --> intalação de outro modulo */

/*2°) Criação do servidor
    A) Chamar o express instalado.
*/
require('express')().get("/", function(req, res){ //achar a rota do barra
    return res.send("Hi from NLW")
})
.listen(5500) /* 500 = numero da porta */

/*  B) $ node src/server.js  --> buscar essa propria pasta (iniciar o servidor)
                             --> Ctrl + C fecha o servidor
    B) $ npm install nodemon -D  --> Iniciar e deixar rodandoo servidor (poupa de usar o codigo acima)*/