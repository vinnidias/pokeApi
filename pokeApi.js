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

function mostraPokedex(){
    var treinador = user.question('digite o nome do treinador: ')
    db(pokedexTreinador(treinador)).on('value', snapshot => {
        console.log(snapshot.val())
        menu()
    })
}

function pokemonsDoMesmoTipo(){
    console.log('ids dos tipo:\n 1 normal;\n 2 lutador;\n 3 voador;\n 4 venenoso;\n 5 terra;\n 6 pedra;\n 7 inseto;\n 8 fantansma;\n 9 aço;\n 10 fogo;\n 11 agua;\n 12 grama; \n 13 eletrico;\n 14 psiquíco; 15 gelo;\n 16 dragao;\n 17 escuridao;\n 18 fada;\n ')
    var id = user.question('digite o id tipo do seu Pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/type/${id}/`)
        .then(resultado => {
         var pokemonsDoMesmoTipo = resultado.data.pokemon
            console.log(pokemonsDoMesmoTipo)
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
    console.log('ids dos tipo:\n 1 normal;\n 2 lutador;\n 3 voador;\n 4 venenoso;\n 5 terra;\n 6 pedra;\n 7 inseto;\n 8 fantansma;\n 9 aço;\n 10 fogo;\n 11 agua;\n 12 grama; \n 13 eletrico;\n 14 psiquíco; 15 gelo;\n 16 dragao;\n 17 escuridao;\n 18 fada;\n ')
    var id = user.question('digite o id tipo do Pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado =>{
            var recebeDobro = resultado.data.damage_relations.double_damage_from
            var aplicaDobro = resultado.data.damage_relations.double_damage_to
            var recebeMeioDano = resultado.data.damage_relations.half_damage_from
            var aplicaMeioDano = resultado.data.damage_relations.half_damage_to
            var recebeDanoNulo = resultado.data.damage_relations.no_damage_from
            var aplicaDanoNulo = resultado.data.damage_relations.no_damage_to
            console.log(`\n ${resultado.data.name}`)
            for(i=0; i < recebeDobro.length; i++){
                console.log(`\n recebe o dobro de: ${recebeDobro[i].name}`)
            }
            for(i=0;i<aplicaDobro.length;i++){
                console.log(`\n aplica dobro para: ${aplicaDobro[i.name]}`)
            }
            for(i=0;i<recebeMeioDano.length;i++){
                console.log(`\n recebe metade de dano de: ${recebeMeioDano[i].name}`)
            }for(i=0;aplicaMeioDano.length;i++){
                console.log(`\n aplica metade de dano para: ${aplicaMeioDano[i].name}`)
            }for(i=0;i<recebeDanoNulo.length;i++){
                console.log(`\n recebe dano nulo de: ${recebeDanoNulo[i].name}`)
            }for(i=0;i<aplicaDanoNulo;i++){
                console.log(`\n aplica dano nulo para: ${aplicaDanoNulo[i].name}`)
            }
            menu()
        })
        .catch(erro =>{
        console.log('erro ao consultar o Pokemon...')
        menu()
    })
}

function mostraDados(){
    var id = user.question('digite o id do pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/type/${id}`)
        .then(resultado => {
            console.log(resultado.data.pokemon)
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

function sair(){
    process.exit()
}

function menu(){
console.clear
console.log('\n ===================== MOSTRE QUE VC É UM TREINADOR ===================== \n')

var interaçoes = user.question(' digite 1 parar pegar um Pokemon: \n digite 2 para ver o nome, as habilidades e o tipo de um pokemon de sua escolha: \n digite 3 para adicionar o seu Pokemon ao pokedex: \n digite 4 para ver os pokedex dos treinadores: \n digite 5 para mostrar todos os dados do Pokemon: \n digite 6 para ver as relacoes de dano do tipo do seu Pokemon: \n digite 7 para mostrar Pokemons do mesmo tipo que o seu:  \n digite 8 para ver os efeitos passivos de habilidades do seu Pokemon: \n digite S para sair: \n ')

if(interaçoes === '1'){
    PegaPokemon()
}if(interaçoes === '2'){
    mostraPokemon()    
}if(interaçoes === '3'){
    cadastraPokemon()
}if(interaçoes === '4'){
    mostraPokedex()
}if(interaçoes === '5'){
    mostraDados()
}if(interaçoes === '6'){
    detalhesTipo()
}if(interaçoes === '7'){
    pokemonsDoMesmoTipo()
}if(interaçoes === '8'){
    detalhesHabilidades()
}if (interaçoes.toUpperCase() === "S"){
    sair()
}
}
menu()