const axios = require('axios')
const dotaconstants = require('dotaconstants')
const lodash = require('lodash')
const imageDownloader = require('image-downloader')

const url = ' https://api.opendota.com/api'
const env = require('../.env')

async function robot(id) {
    const info = {}

    info.match = await getMatchInfo(id)
    info.player = await getPlayerBaseInfo(info.match.players)

    content = getContent(info)

    return content
}

async function getMatchInfo (id){
    const res = await axios.get(url + '/matches/' + id)

    return res.data
}

async function getPlayerBaseInfo(players){
    const player = {}

    for (let i = 0, len = players.length; i < len; i++) {
        if(players[i].account_id !== env.steamId )
            continue;

        const itens = getItensById([
            players[i].item_0,
            players[i].item_1,
            players[i].item_2,
            players[i].item_3,
            players[i].item_4, 
            players[i].item_5,
        ]);

        player.name = players[i].personaname
        player.hero = await getHero(players[i].hero_id)
        player.heroThumbnail = await saveThumbnail(players[i].hero_id)
        player.duration = players[i].duration
        player.kills = players[i].kills
        player.deaths = players[i].deaths
        player.assists = players[i].assists
        player.game_mode = players[i].game_mode
        player.sideMap = players[i].isRadiant ? 'Randiant' : 'Dire'
        player.win =  players[i].win
        player.lose =  players[i].lose
        player.total_gold =  players[i].total_gold
        player.itens = itens
    }

    return player
}


function getItensById( ids ){
    const itens = []
    for (let i = 0, len = ids.length; i < len; i++) {
        if (dotaconstants.item_ids[ids[i]]){
            itens.push(dotaconstants.items[dotaconstants.item_ids[ids[i]]].dname)
        }
    }

    return itens
}

async function getHero(id){
    const res = await axios.get(url + '/heroes/')
    let value = lodash.filter(res.data, x => x.id === id);

    return value
}

function saveThumbnail(id){
    const url = `https://api.opendota.com${dotaconstants.heroes[id].img}`

    imageDownloader.image({
        url, url,
        dest: `./content/${id}.png`
    })

    return `./content/${id}.png`
}

function getContent({match, player}){
    const data = {}
    const heroName = player.hero[0].localized_name
    const itens = player.itens.filter(value => value !== '').join(' \n ')
    const itensTag = player.itens.filter(value => value !== '').join(', ')
    const result = player.win ? 'Vitória' : 'Derrota'

    data.id = match.match_id
    data.title = `Partida jogando com ${heroName} | Dota 2`
    data.thumbnail = player.heroThumbnail
    data.description = `Partida jogando com herói ${heroName} do dota 2 no patch 7.22
Com o K/D/A de ${player.kills}/${player.deaths}/${player.assists} com o total de ouro (Patrimônio Líquido) de ${player.total_gold}g

Jogando do lado dos ${player.sideMap} do mapa
ID da partida: ${data.id}

Os itens que foram feitos para ${heroName} nesta partida são:
${itens}

Acesse Meu site: https://jhowl.com

Criando um histórico (archive) de partidas e gameplays que faço e deixando salvo aqui no youtube para futuras lembranças e compartilhamento com a web.

Eu sou o agresif hamster e tambem conhecido como Jhowl.

jogando com os amigos:

Resultado dessa partida de dota 2 foi uma ${result} com ${heroName} 

#dota2 #${heroName.replace(/ /g,'')}`

    data.tags = ` ${heroName}, dota 2, dota2 ${heroName}, partida completa de ${heroName}, jogando com ${heroName}, partida completa, ${player.name}, ${itensTag}, ${player.sideMap}, gameplay, game, gameplay ${heroName}, moba, jhowl`

    return data;
}

module.exports = robot
