const axios = require('axios')
const dotaconstants = require('dotaconstants')
const lodash = require('lodash');

const url = ' https://api.opendota.com/api'
const env = require('../.env')

async function robot(id) {
    const info = {}

    info.match = await getMatchInfo(id)
    info.player = await getPlayerBaseInfo(info.match.players)

    content = getContent(info)

    console.log(content)
}

async function getMatchInfo (id){
    const res = await axios.get(url + '/matches/' + id)

    return res.data
}

async function getPlayerBaseInfo(players){
    const player = {}

    // console.log(players)

    for (let i = 0, len = players.length; i < len; i++) {
        if(players[i].account_id === env.steamId ){
            player.name = players[i].personaname
            player.hero = await getHero(players[i].hero_id)
            player.duration = players[i].duration
            player.kills = players[i].kills
            player.deaths = players[i].deaths
            player.assists = players[i].assists
            player.game_mode = players[i].game_mode
            player.sideMap = players[i].isRadiant ? 'Randiant' : 'Dire'
            player.win =  players[i].win
            player.lose =  players[i].lose
            player.total_gold =  players[i].total_gold

            player.itens = [
                dotaconstants.item_ids[players[i].item_0] || '', 
                dotaconstants.item_ids[players[i].item_1] || '', 
                dotaconstants.item_ids[players[i].item_2] || '', 
                dotaconstants.item_ids[players[i].item_3] || '', 
                dotaconstants.item_ids[players[i].item_4] || '',  
                dotaconstants.item_ids[players[i].item_5] || '', 
            ]
        }
    }

    return player
}

async function getHero(id){
    const res = await axios.get(url + '/heroes/')
    let value = lodash.filter(res.data, x => x.id === id);

    return value
}

function getContent({match, player}){
    const data = {}
    const heroName = player.hero[0].localized_name
    const itens = player.itens.filter(value => value !== '').join(' \n ')
    const itensTag = player.itens.filter(value => value !== '').join(', ')
    const result = player.win ? '(win)' : '(lose)'

    data.id = match.match_id

    data.title = `Partida jogando com ${heroName} | Dota 2 ${result}`

    data.description = `
    Partida jogando com ${heroName}
    Com o K/D/A de ${player.kills}/${player.deaths}/${player.assists} com o total de ouro (Patrimônio Líquido) de ${player.total_gold}g
    Jogando do lado dos ${player.sideMap} no map
    ID da partida: ${data.id}

    Os itens que fechei para essa partida são:
    ${itens}

    Criando um histórico (archive) de partidas e gameplays que faço e deixando salvo aqui no youtube para futuras lembranças e compartilhamento com a web.

    jogando com os amigos:

    #dota2 #${heroName.replace(/ /g,'')}
    `

    data.tag = `dota 2, dota2 ${heroName}, partida completa de ${heroName}, jogando com ${heroName}, partida completa, ${player.name}, ${itensTag}, ${player.sideMap}, gameplay`

    return data;
}

module.exports = robot
