const axios = require('axios')
const dotaconstants = require('dotaconstants')
const lodash = require('lodash');

const url = ' https://api.opendota.com/api'
const env = require('../.env')

async function robot(id) {
    const info = {}

    info.match = await getMatchInfo(id)
    info.player = await getPlayerBaseInfo(info.match.players)
}

async function getMatchInfo (id){
    const res = await axios.get(url + '/matches/' + id)

    return res.data
}

async function getPlayerBaseInfo(players){
    const player = {}

    for (let i = 0, len = players.length; i < len; i++) {
        if(players[i].account_id === env.steamId ){
            player.name = players[i].personaname
            player.hero = await getHero(players[i].hero_id)
            player.duration = players[i].duration
            player.duration = players[i].duration
            player.kills = players[i].duration
            player.assists = players[i].assists
            player.game_mode = players[i].game_mode
            player.duration = players[i].duration
            player.isRadiant =  players[i].isRadiant
            player.win =  players[i].win
            player.lose =  players[i].lose
            player.total_gold =  players[i].total_gold

            player.itens = [
                dotaconstants.item_ids[players[i].item_0], 
                dotaconstants.item_ids[players[i].item_1], 
                dotaconstants.item_ids[players[i].item_2], 
                dotaconstants.item_ids[players[i].item_3], 
                dotaconstants.item_ids[players[i].item_4],  
                dotaconstants.item_ids[players[i].item_5], 
            ]
        }
    }

    console.log( player )
}

async function getHero(id){
    const res = await axios.get(url + '/heroes/')
    let value = lodash.filter(res.data, x => x.id === id);

    return value
}

module.exports = robot