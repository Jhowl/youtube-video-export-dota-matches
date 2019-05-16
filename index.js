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
    const info =  await robots.dota(matches[i])
  }
}

start();

