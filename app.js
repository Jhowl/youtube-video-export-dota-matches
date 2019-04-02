'use strict'

var { google } = require('googleapis')

const youtube = google.youtube({
  version: 'v3',
  auth: ''
});

const getVideosByPlaylistId = async (playlistId) => {
    const res = await youtube.playlistItems.list({
        part: 'id,snippet',
        maxResults: 6,
        playlistId
    })

  console.log(res.data.items[5].snippet)

}

// getVideosByPlaylistId('PLxS8KNFeOdxGW9wFsiNBJWefWyBGSweRb')


const getVideosSearch = async (channelId) =>{
    const res = await youtube.search.list({
        part: 'id,snippet',
        maxResults: 50,
        channelId
    })

  console.log(res.data.items[5].snippet)
//   console.log(res.data)
}

getVideosSearch('UCAdxdCvv8q7aKOzvFildMpw')