// const readline = require('readline-sync')

const robots = {
    youtube: require('./robots/youtube'),
    dota: require('./robots/dota')
}

const Reader  = require('./robots/readerMedia')

async function start() {
  const files = new Reader()
  const matches = files.getIdsMatches()
  
  for (let i = 0, len = matches.length; i < len; i++) {
    // await robots.dota(matches[i])
  }

  await robots.youtube()

  // channel.searchChannel = askAndReturnChannelId();
  // channel.info          = await robots.youtube(channel.searchChannel)

  // function askAndReturnChannelId(){
  //     return readline.question('Type Channel ID on Youtube: ')
  // }

  // console.log(files)
  // console.log(matches)
}

start();

