const robots = {
    youtube: require('./robots/youtube'),
    dota: require('./robots/dota')
}

const Reader  = require('./robots/readerMedia')

async function start() {
  const files = new Reader()
  const matches = files.getIdsMatches()
  const info = []

  for (let i = 0, len = matches.length; i < len; i++) {
    info.push(await robots.dota(matches[i]))
  }

  // console.log(info[0].description)
  // console.log(info[0].tags)


  await robots.youtube(info)
}

start();

