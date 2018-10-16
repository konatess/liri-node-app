require('dotenv').config();

var Spotify = require('node-spotify-api');

var fs = require('fs');

var keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']