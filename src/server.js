//Lista de Objetos

const proffys = [
    {
        name: "Diego Fernandes", 
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "015999999999", 
        bio: "Entusiasta das melhores tecnologias de química avançada. " +
        "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. " +
        "Mais de 200.000 pessoas já passaram por uma das minhas explosões", 
        subject: "Química", 
        cost: "20",
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    },

    {
        name: "Lucas de Moraes", 
        avatar: "https://scontent.fsod2-1.fna.fbcdn.net/v/t1.0-9/92354819_3735552533185611_6324541271247421440_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=dFRL-eR3_DUAX-tmd1S&_nc_ht=scontent.fsod2-1.fna&oh=14f39b1236338c793b7d3c5084eec0ce&oe=5F559AD0",
        whatsapp: "015997703000", 
        bio: "Sou lindo e namoro uma programadora maravilhosa", 
        subject: "Designer", 
        cost: "50",
        weekday: [0], 
        time_from: [720], 
        time_to: [1220]
    }  
]

/*
    1°) Criação dos modulos
        A) $ npm init -y  --> criação do package.json(configurações do projeto)
        B) $ npm install express --> intalação de outro modulo 
        C) $ npm install nunjucks --> template engine
*/

 // 2°) Criação do servidor
 function pageLanding(req, res){
    return res.render("index.html")  // retorna a pagina inicial para o navegador
}

function pageStudy(req, res){ 
    return res.render("study.html", {proffys})  // retorna a pagina estudar para o navegador com os dados do objeto proffys (obs: não esquecer de tirar o .html do botão)
}

function pageGiveClasses(req, res){ 
    return res.render("give-classes.html")  // retorna a pagina dar aula para o navegador
}

const express = require('express') //importando express
const server = express()
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
    