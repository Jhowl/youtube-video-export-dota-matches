const { google } = require('googleapis')
const readline = require('readline-sync')


const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyA-uyfSWZSRjelIPxUDl86ZZDls82k3ZOw'
});

async function youtubeBot(channelId) {
    
    const channel = await getChannelById(channelId)
    verifyIfIsCorrectChannel(channel);

    async function getChannelById (id) {
        const channel =  await youtube.channels.list({
            part: 'id,snippet',
            id
        })
    
        return channel.data.items[0].snippet
    }
    
    function verifyIfIsCorrectChannel(channel){
        console.log('Correct Channel is ' + channel.title)
        const Options = ['No', 'Yes']
        const selectedOption = readline.keyInSelect(Options)
        
        return selectedOption ? channel : false
    }
}


// const getVideosByPlaylistId = async (playlistId) => {
//     const res = await youtube.playlistItems.list({
//         part: 'id,snippet',
//         maxResults: 6,
//         playlistId
//     })

//   console.log(res.data.items[5].snippet)

// }

// // getVideosByPlaylistId('PLxS8KNFeOdxGW9wFsiNBJWefWyBGSweRb')


// const getVideosSearch = async (channelId) =>{
//     const res = await youtube.search.list({
//         part: 'id,snippet',
//         maxResults: 50,
//         channelId
//     })

//   console.log(res.data.items[5].snippet)
// //   console.log(res.data)
// }

// getVideosSearch('UCAdxdCvv8q7aKOzvFildMpw')

module.exports = youtubeBot