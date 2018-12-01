require('dotenv').config()

const spotifyPackage = require('node-spotify-api')
const spotify = new spotifyPackage({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
})
const axios = require('axios')
const moment = require('moment')

const command = process.argv[2]
let search = process.argv.slice(3).join(' ')

switch (command) {
  case 'concert-this':
    concert(search)
    break;
  case 'spotify-this-song':
    song(search)
    break;
  case 'movie-this':
    movie(search)
    break;
  case 'do-what-it-says':
    whatItSays(search)
    break;
  default:
    noCommand()
}


function concert(search) {
  if (search) {
    axios
      .get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
      .then(function(res) {
        for ( let i = 0; i < 10; i++ ) {
          // console log the info for each event
        }

        // console.log( res.data[0])
        console.log( res.data[0].venue.name )
        console.log( res.data[0].venue.city + ", " + res.data[0].venue.region )
        console.log( moment(res.data[0].datetime).format('MM-DD-YYYY') )
      })
  } else {
    console.log('You did not search for anything')
  }


}

function song(search) {
  if (search) {
    
  } else {
    console.log('You did not search for anything')
  }
}

function movie(search) {

}

function whatItSays(search) {

}

function noCommand() {

}