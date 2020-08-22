# PokeApi

O programa estabelece comunicação com a api dos pokémons disponível em [pokeApi.co](https://pokeapi.co/).
Disponibilizando um menu de 8 opções para usuário, é possível fazer a leitura de dados diversos sobre cada pokémon disponibilizados pela api.

## Instalação

Clone este repositório no seu disco local e execute o comando pokeApi no seu terminal do done

```bash
node ./pokeApi.js
```

## Como Usar

A primeira opção (número 1) solicita ao usurário um número qualquer e, ao ser inserido, o programa devolve um pokémon referente ao id, que é o mesmo do número digitado.
Na segunda opção (número 2) é possivel ver o nome, as habilidades e o tipo do pokémon identificado pelo id ou pelo nome.
A terceira opçaõ (número 3) cadastra os dados do nome do treinador, id do pokémon, nome, e tipo do pokémon a um banco de dados não relacional no firebase.
Na quarta opção do menu (número 4) é possivel vizualizar todos os pokes salvos no banco de dados, referenciados pelo nome de treinador salvo.
A quinta (número 5) foi criada para ver todos os dados .data da api referentes a cada pokémon indexado pelo id ou nome.
Na sexta (número 6) o usuário tem as informções do tipo do pokémon.
A opção sete (número 7) traz uma lista de pokémons do mesmo tipo q o digitado pelo usuário.
E a última opção (número 8) traz em detalhes os efeitos de habilidades do pokémon solicitado pelo usuário.
Uma opção de saída (letra S) é disponibilizada para encerrar a aplicação.

## Contribuição
Esta aplicação foi feita para estudo de consumo de api utilizando javaScript com nodeJS



## Licensa
[MIT](https://choosealicense.com/licenses/mit/)
