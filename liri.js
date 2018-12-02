require('dotenv').config()

// NPM packages
const spotifyPackage = require('node-spotify-api')
const spotify = new spotifyPackage({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
})
const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

// grab command line arguments
const command = process.argv[2]
let search = process.argv.slice(3).join(' ')

// check for first argument to match accepted commands
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

// This function is called when 'concert-this' is the command passed by the user
function concert(search) {
  // first check if the user entered a search
  if (search) {
    axios
      .get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
      .then(function(res) {
        // set a length to manage the loop
        let length = res.data.length
        // check if data array is more than 10
        if(length > 10) {
          // limit length if over 10
          length = 10
        }
        // loop through data to print concerts for each event
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
    // this will run if user didn't enter anything to search
    console.log('You did not search for anything')
  }
}

// This function is called when 'spotify-this-song' is the command passed by the user
function song(search) {
  // check if search was entered
  if (search) {
    var query = search
  } else {
    // if no search entered, default to this search
    var query = 'The Sign'
  }
  // inform the user of their search
  console.log(`\nYou searched for: "${query}"`)
  // search API and print results to the screen
  spotify 
    .search({
      type: 'track',
      query: query,
      limit: 1
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

// This function is called when 'movie-this' is the command passed by the user
function movie(search) {
  // check if user input a search
  if (search) {
    var query = search
  } else {
    // if no user search, default to this selection
    var query = 'Mr. Nobody'
  }
  // input search parameter into URL
  var queryURL = `http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=trilogy`

  // call axios and return related data to the screen
  axios 
    .get(queryURL)
    .then(function(res) {
      console.log(`\n======================================`)
      console.log(`    Title: ${res.data.Title}`)
      console.log(`    Year Released: ${res.data.Year}`)
      if ( res.data.Ratings[0]) {
              console.log(`    ${res.data.Ratings[0].Source}: ${res.data.Ratings[0].Value}`)
      }
      if (res.data.Ratings[1]) {
        console.log(`    ${res.data.Ratings[1].Source}: ${res.data.Ratings[1].Value}`)
      }
      console.log(`    Country: ${res.data.Country}`)
      console.log(`    Language: ${res.data.Language}`)
      console.log(`    Plot: ${res.data.Plot}`)
      console.log(`    Actors: ${res.data.Actors}`)
      console.log(`======================================\n`)
    })
}

// This function is called when 'do-what-it-says' is the command passed by the user
function whatItSays(search) {
  // read .txt file and set the parameter to input to the spotify API
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if ( error ) {
      return console.log(error)
    }
    let arg = data.split(',')[1]
    song(arg)
  })
}

// This function is called when the user does not enter a valid command
function noCommand() {
  console.log(`\nPlease enter a valid command\n`)
}