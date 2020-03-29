var axios = require('axios')
var user = require('readline-sync')

var ids = ['150: mewtwo', '149: dragonite','140: articuno' ]
var pokedecks= []

function mostraDados(){
    var id = user.question('digite o id do pokemon: ')

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resultado => {
            console.log(resultado.data)
            menu()
        })
    
}


function mostraStatus(){
    
    var id = user.question('digite o id do pokemon: ')

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resultado => {
            console.log(resultado.data.stats)
            menu()
        })
        
}

function PegaPokemon(){
    
var id = user.question('digite um numero para pegar um Pokemon: ')

axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(resultado =>{
    
    console.log(`vc pegou o ${resultado.data.name}!!! \n o numero q vc digitou corresponde ao id do pokemon ${id}`)
    console.log('\n')
    menu()

})

.catch(erro=>{
    console.log('erro ao conectar', erro)
})
return 'boa treinador'

} 

function menu(){
console.clear
console.log('=====================MOSTRE QUE VC É UM TREINADOR=====================')


var interaçoes = user.questionInt('digite 1 parar pegar: \n digite 2 para status: \n digite 3 para adiconar ao seu pokedecks: \n digite 4 para mostrar os dados do pokemon: \n ')



if(interaçoes == 1){
    PegaPokemon()
}if(interaçoes == 2){
    mostraStatus()
}if(interaçoes == 3){
    var addId = user.questionInt('digite o id do pokemon que deseja adicionar: ')
    pokedecks.push(addId)
    console.log(pokedecks)
}if(interaçoes == 4){
    mostraDados()
}
}
menu()




