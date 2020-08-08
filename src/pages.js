//impotando banco de dados
const Database = require('./database/db')
//importando as listas de objeto do format.js
const { subjects, weekdays, getSubject, convertHoursToMinute} = require('./utils/format')

 // 2°) Criação do servidor

 function pageLanding(req, res){
    return res.render("index.html")  // retorna a pagina inicial para o navegador
}

async function pageStudy(req, res){ 
    const filters = req.query //pegando dados que o formulario enviou

    //se qualquer um desses forem vazio
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})  // retorna a pagina estudar para o navegador com os dados do objeto proffys (obs: não esquecer de tirar o .html do botão)
    
    }


    //convertendo horas em minutos
    const timeToMinutes = convertHoursToMinute(filters.time)

    //fazendo o filtro do form de estudar (pesquisar professor)
     const query = `
        SELECT classes.*, proffys.* 
        FROM proffys JOIN classes 
        ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.* FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes} 
        )
        AND classes.subject = '${filters.subject}'
    `
    
    try {
        
        const db = await Database
        const proffys = await db.all(query)

        return res.render('study.html', {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res){ 
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0

    //adicionando os dados a lista de proffys
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
        
        proffys.push(data)
        return res.redirect("/study")
    }

    return res.render("give-classes.html", {subjects, weekdays} )  // retorna a pagina dar aula para o navegador
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}