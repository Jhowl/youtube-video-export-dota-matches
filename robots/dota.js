const axios = require('axios')

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
            player.data = players[i].personaname
        }
    }

    console.log( player )
}

module.exports = robot