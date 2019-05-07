// const readline = require('readline-sync')

const robots = {
    youtube: require('./robots/youtube'),
}

const Reader = require('./robots/readerMedia')


async function start() {
  const files = new Reader()
  const matches = files.getIdsMatches()

  // channel.searchChannel = askAndReturnChannelId();
  // channel.info          = await robots.youtube(channel.searchChannel)

  // function askAndReturnChannelId(){
  //     return readline.question('Type Channel ID on Youtube: ')
  // }

  // console.log(files)
  // console.log(idMatches)
}

start();

