require('dotenv').config()

const spotifyPackage = require('node-spotify-api')
const spotify = new spotifyPackage({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
})
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
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
        let length = res.data.length
        if(length > 10) {
          length = 10
        }
        for ( let i = 0; i < length; i++ ) {
          console.log('==============================================')
          console.log( "Concert Venue: " + res.data[i].venue.name )
          console.log( "Location: " + res.data[i].venue.city + ", " + res.data[i].venue.region )
          console.log( moment(res.data[i].datetime).format('MM-DD-YYYY') )
        }
      })
      .catch(function(error) {
        console.log(error)
      })
  } else {
    console.log('You did not search for anything')
  }
}

function song(search) {
  if (search) {
    var query = search
  } else {
    var query = 'The Sign'
  }
  console.log(`\nYou searched for: "${query}"`)
  spotify 
    .search({
      type: 'track',
      query: query,
      limit: 2
    },
    function (error, data) {
      if ( error ) {
        console.log("there's an error" + error) 
      }
      // console.log(data.tracks.items)
      console.log(`Song Artist: ${data.tracks.items[0].artists[0].name}`)
      console.log(`Album Link: ${data.tracks.items[0].album.href}`)
      console.log(`Album: ${data.tracks.items[0].album.name}\n`)
    })
}

function movie(search) {
  if (search) {
    var query = search
  } else {
    var query = 'Mr. Nobody'
  }
  var queryURL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`

  axios 
    .get(queryURL)
    .then(function(res) {
      console.log(`\n======================================`)
      console.log(`    Title: ${res.data.Title}`)
      console.log(`    Year Released: res.data.Year`)
      console.log(`    IMDB Rating: ${res.data.Ratings[0]}`)
      console.log(`    Rotten Tomatoes Rating: ${res.data.Ratings[1]}`)
      console.log(`    Country: ${res.data.Country}`)
      console.log(`    Language: ${res.data.Language}`)
      console.log(`    Plot: ${res.data.Plot}`)
      console.log(`    Actors: ${res.data.Actors}`)
      console.log(`======================================\n`)
    })
}

function whatItSays(search) {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if ( error ) {
      return console.log(error)
    }
    let arg = data.split(',')[1]
    song(arg)
  })
}

function noCommand() {
  console.log(`Please enter a command`)
}