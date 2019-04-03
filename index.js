const readline = require('readline-sync')
const robots = {
    youtube: require('./robots/youtube')
}

async function start() {
    const channel = {}

    channel.searchChannel = askAndReturnChannelId();
    channel.info          = await robots.youtube(channel.searchChannel)

    function askAndReturnChannelId(){
        return readline.question('Type Channel ID on Youtube: ')
    }

    console.log(channel)
}

start();

