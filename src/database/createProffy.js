
//inserção no banco de dados

//async --> para poder usar o await
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }){

    //await esperar terminar executar essa linha para executar outra
    const insertedProffy =  await db.run(`
        INSERT INTO proffys (name, avatar, whatsapp, bio) 
        VALUES ("${proffyValue.name}","${proffyValue.avatar}","${proffyValue.whatsapp}","${proffyValue.bio}");
    `)

    //pegando o ultimo ID do proffy cadastrado
    const proffy_id = insertedProffy.lastID

    //inserindo as classes
    const insertedClass = await db.run(`
        INSERT INTO classes (subject, cost, proffy_id) 
        VALUES ("${classValue.subject}", "${classValue.cost}", "${proffy_id}");
    `)

    const class_id = insertedClass.lastID

    //inserindo os horarios

    //map --> repetição e guardando em um array
    const insertedAllClassScheduleValues = classScheduleValues.map(function(ScheduleValue){
        return db.run(`
            INSERT INTO class_schedule(class_id, weekday, time_from, time_to) 
            VALUES ("${class_id}", "${ScheduleValue.weekday}", "${ScheduleValue.time_from}", "${ScheduleValue.time_to}");
        `)
    })

    //executando todos os db.runs da classSchedule
    await Promise.all(insertedAllClassScheduleValues)
}