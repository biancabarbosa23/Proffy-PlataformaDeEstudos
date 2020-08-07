document.querySelector("#add-time").addEventListener('click', cloneField) //evento clique

function cloneField(){
   
    //pegando a div e clonando --> guardar em uma variavel
    const newfieldContainer = document.querySelector('.schedule-item').cloneNode(true) // true = pegar a div e os filhos
                                                                                       //false = pegar so a div vazia
    //pegando os inputs
    const fields = newfieldContainer.querySelectorAll('input')

    //limpando os todos os inputs encontrados
    fields.forEach(function(fieldMoment){ //fieldMoment = variavel de controle do ForEach
        fieldMoment.value= "";
    })
    
    //dizendo onde sera clonado e o vai ser feito
    document.querySelector('#schedule-items').appendChild(newfieldContainer)
}