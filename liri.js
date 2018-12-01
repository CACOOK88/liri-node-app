require('dotenv').config()

const spotify = require('node-spotify-api')
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

}

function song(search) {

}

function movie(search) {

}

function whatItSays(search) {

}

function noCommand() {

}