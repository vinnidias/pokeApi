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
  var id = user.question('digite o id do seu Pokemon: ')
  var nome = user.question('digite o nome do seu Pokemon: ')

  db.push({
      treinador: treinador,
      id: id,
      pokemon: nome
  })
  console.log('\n o professor recebeu os seu Pokemon!!!\n')
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
console.log('\n =====================MOSTRE QUE VC É UM TREINADOR===================== \n')


var interaçoes = user.questionInt(' digite 1 parar pegar um Pokemon: \n digite 2 para ver os statusdo do Pokemon: \n digite 3 para mostrar todos os dados do Pokemon: \n digite 4 para mandar para o professor: \n digite 5 para ver os pokedex dos treinadores: \n  ')



if(interaçoes == 1){
    PegaPokemon()
}if(interaçoes == 2){
    mostraStatus()
}if(interaçoes == 3){
    mostraDados()   
}if(interaçoes == 4){
    cadastraPokemon()
}if(interaçoes == 5){
    mostraPokedex()
}
}
menu()




