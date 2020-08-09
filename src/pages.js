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

        proffys.map(function(proffy){
            proffy.subject = getSubject(proffy.subject)
        })

        return res.render('study.html', {proffys, subjects, filters, weekdays})

    } catch (error) {
        console.log(error)
    }

}

function pageGiveClasses(req, res){ 
    
    return res.render("give-classes.html", {subjects, weekdays} )  // retorna a pagina dar aula para o navegador
}

async function saveClasses(req, res){
    //exportar função de criar proffy
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        name : req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }
   
    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    //repetição para salvar todos os horarios
    const classScheduleValues = req.body.weekday.map(function(weekday, index){

        return{
            weekday,
            time_from: convertHoursToMinute(req.body.time_from[index]),
            time_to: convertHoursToMinute(req.body.time_to[index])
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]


        return res.redirect("/study" + queryString)
    } catch (error) {
       console.log(error) 
    }
    
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}