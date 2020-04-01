var axios = require('axios')
var user = require('readline-sync')

var admin = require("firebase-admin");

var serviceAccount = require("./credenciais.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projeto-firebase-9635c.firebaseio.com"
});

var pokedex = 'Pokédex'
var db = ref => admin.database().ref(ref)

var pokedexTreinador = treinador => `${pokedex}/${treinador}`

function mostraPokedex(){
    var treinador = user.question('digite o nome do treinador: ')
    db(pokedexTreinador(treinador)).on('value', snapshot => {
        console.log(snapshot.val())
      menu()
      })
}

function pokemonsDoMesmoTipo(){
    var id = user.question('digite o id ou o nome do seu Pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado => {
            console.log(resultado.data.pokemon)
            menu()
        })
    .catch(erro => {
        console.log('erro ao consultar Pokemon...')
        menu()
    })
}

function detalhesHabilidades(){
    var id = user.question('digite o id ou o nome do Pokemon desejado: ')
    axios.get(`https://pokeapi.co/api/v2/ability/${id}`)
    .then(resultado => {
        var efeito = resultado.data.effect_entries
        for (i = 0; i < efeito.length; i++) {
          console.log(`\n ${efeito[i].effect}`)
        }
        menu()
      })
    .catch(erro =>{
        console.log('erro ao consultar Pokemon...')
        menu()
    })
}

function detalhesTipo(){
    
    var id = user.question('digite o id ou o nome do Pokemon: ')
    
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado =>{
        
            console.log(resultado.data.damage_relations)
            menu()
        })
    .catch(erro =>{
        console.log('erro ao consultar o Pokemon...')
        menu()
    })
}

function cadastraPokemon(){
  var treinador = user.question('digite seu apelido de treinador: ')
  var id = user.question('digite o id ou o nome do seu Pokemon: ')
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        db(pokedexTreinador(treinador)).push({
            treinador: treinador,
            id: id,
            pokemon: resultado.data.name,
            tipo: resultado.data.types,
            habilidades: resultado.data.abilities
    
        })
        console.log('\n seu Pokemon foi adicionado ao pokedex!!!\n')
        menu()
    })
  .catch(erro =>{
      console.log('erro ao cadastrar o pokemon')
      menu()
  })
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


function mostraPokemon(){
    
    var id = user.question('digite o id ou o nome do Pokemon desejado: ')
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        var nome = resultado.data.name
        var tipo = resultado.data.types
        var habilidades = resultado.data.abilities
        console.log(nome)
        tipo.map(pokemon =>{console.log(`Tipo: ${pokemon.type.name}`)})
        habilidades.map(pokemon=>{console.log(`Habilidade: ${pokemon.ability.name}`) })
        console.log('\n')
        menu()
    })
    .catch(erro=>{
        console.log('erro ao consultar, tente novamente')
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
console.log('\n ===================== MOSTRE QUE VC É UM TREINADOR ===================== \n')


var interaçoes = user.questionInt(' digite 1 parar pegar um Pokemon: \n digite 2 para ver o nome, as habilidades e o tipo de um pokemon de sua escolha: \n digite 3 para adicionar o seu Pokemon ao pokedex: \n digite 4 para ver os pokedex dos treinadores: \n digite 5 para mostrar todos os dados do Pokemon: \n digite 6 para ver as relacoes de dano do tipo do seu Pokemon: \n digite 7 para mostrar Pokemons do mesmo tipo que o seu:  \n digite 8 para ver os efeitos passivos de habilidades do seu Pokemon: \n ')



if(interaçoes == 1){
    PegaPokemon()
}if(interaçoes == 2){
    mostraPokemon()    
}if(interaçoes == 3){
    cadastraPokemon()
}if(interaçoes == 4){
    mostraPokedex()
}if(interaçoes == 5){
    mostraDados()
}if(interaçoes == 6){
    detalhesTipo()
}if(interaçoes == 7){
    pokemonsDoMesmoTipo()
}if(interaçoes == 8){
    detalhesHabilidades()
}
}
menu()