var axios = require('axios')
var user = require('readline-sync')
var sql = require('sqlite3')
var admin = require("firebase-admin");

var serviceAccount = require("./credenciais.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-firebase-9635c.firebaseio.com"
});

var pokedex = 'Pokédex'
var db = admin.database().ref(pokedex)

function mostraPokedex(){
    db.on('value', snapshot => {
        console.log(snapshot.val())
      menu()
      })
}

function cadastraPokemon(){
  var treinador = user.question('digite seu apelido de treinador: ')
  var id = user.question('digite o id do seu pokemon: ')
  var nome = user.question('digite o nome do seu pokemon: ')

  db.push({
      treinador: treinador,
      id: id,
      pokemon: nome
  })
menu()
}


function mostraDados(){
    var id = user.question('digite o id do pokemon: ')

    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(resultado => {
            console.log(resultado.data)
            menu()
        })
        .catch(erro => {
            console.log('pokemon não encontrado',)
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
        .catch(erro =>{
            console.log('pokemon não encontrado')
            menu()
        })
}

function PegaPokemon(){
    
var id = user.question('digite um numero para pegar um Pokemon: ')

axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
.then(resultado =>{
    
    console.log(`vc pegou o ${resultado.data.name}!!! \n o numero q vc digitou corresponde ao id do pokemon: ${id}`)
    console.log('\n')
    menu()

})

.catch(erro=>{
    console.log('nenhum pokemon capturado, mas tudo bem, tente novamente')
    menu()
})
return console.log('boa treinador')

} 

function menu(){
console.clear
console.log('=====================MOSTRE QUE VC É UM TREINADOR=====================')


var interaçoes = user.questionInt('digite 1 parar pegar: \n digite 2 para status: \n digite 3 para adiconar ao seu pokedecks: \n digite 4 para ver os pokedex: \n digite 5 para mostrar os dados do pokemon: \n ')



if(interaçoes == 1){
    PegaPokemon()
}if(interaçoes == 2){
    mostraStatus()
}if(interaçoes == 3){
    
    cadastraPokemon()
    
}if(interaçoes == 4){
    
    mostraPokedex()

}if(interaçoes == 5){
    mostraDados()

}
}
menu()




