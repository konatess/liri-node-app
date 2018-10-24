// Set requires for external files and packages
require('dotenv').config();

var Spotify = require('node-spotify-api');

var request = require('request');

var moment = require('moment');

var inquirer = require('inquirer')

var fs = require('fs');

var keys = require('./keys.js');

// helper function to deal with bad data returns 
function isValidProperty(obj, propertyName) {
    if(obj===null) {
      return false;
    }
    if(obj.hasOwnProperty(propertyName)) {
      if(obj.propertyName!==null) {
        return true;
      }
    }
    return false;
};

var spotify = new Spotify(keys.spotify);

// object to contain commands and command methods.
var dothis = {
    commands: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'],
    action(com, input) {
        // concert-this command method
        if (com === this.commands[0]) {
            request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp", function(err, response, body) {
                if (err) { 
                    console.log ('error:', err); // if error, print error
                }  
                if (response.statusCode != 200) {
                    console.log('statusCode:', response && response.statusCode); // 200 is success. Print if not successful.
                } 
                else {
                    // fix to eliminate bad results: 
                    // some "good" returns are not correct JSON, causing the parse method to choke and stop everything with an error
                    try {
                        var result = JSON.parse(body)
                    } catch (error) {
                        // use return to skip the rest of the process
                        return console.log('No results available. Check your spelling or try another search.')
                    }
                    // number of results to show, regardless if more are returned
                    var limit = 10
                    if (result === undefined || result[0] === undefined) {
                        console.log('No results available.')
                    }
                    else {
                        for (i = 0; i < limit; i++) {
                            // this conditional allows it to stop if there are no more results
                            if (result[i] !== undefined) {
                                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                                console.log('~ VENUE:', result[i]['venue']['name']);
                                console.log('~ LOCATION:', result[i]['venue']['country'] + ", "  + result[i]['venue']['city'] + ", "  + result[i]['venue']['region']);
                                var date = moment(result[i]['datetime'], 'YYYY-MM-DDTHH:mm:ss').format('MM/DD/YYYY');
                                console.log('~ DATE:', date + '\n');
                            }
                        }
                    }
                }
            });
        }
        // spotify-this-song command method
        else if (com === this.commands[1]) {
            var itemlimit = 5;
            spotify.search({ type: 'track', query: input, limit: itemlimit }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                else {
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                    for (i = 0; i < itemlimit; i++) {
                        if (data.tracks.items[i]) {
                            console.log('*')
                            if (isValidProperty(data.tracks.items, i)) {
                                if (isValidProperty(data.tracks.items[i], "name"))
                                console.log('TRACK: ', data['tracks']['items'][i]['name']); 
                                console.log('ALBUM: ', data['tracks']['items'][i]['album']['name']);
                                console.log('ARTIST: ', data['tracks']['items'][i]['artists'][0]['name']); 
                                if (data['tracks']['items'][i]['preview_url']) {
                                    console.log('PREVIEW: ', data['tracks']['items'][i]['preview_url'], '\n');
                                } 
                                else {
                                    console.log('No preview available. \n');
                                }
                            }
                            else {
                                console.log('Cannot find results for this song name.')
                            }
                        }
                        else {
                            console.log('Cannot find results for this song name.');
                            i = itemlimit;
                        }
                    }
                }
            });
        }
        // movie-this command method
        else if (com === this.commands[2]) {
            request("http://www.omdbapi.com/?type=movie&t=" + input + "&apikey=trilogy", function(err, response, body) {
                if (err) { 
                    console.log ('error:', err); // if error, print error
                }  
                if (response.statusCode != 200) {
                    console.log('statusCode:', response && response.statusCode); // 200 is success. Print if not successful.
                } 
                else {
                    var result = JSON.parse(body)
                    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                    if (result['Title'] === undefined) {
                        console.log('Information about this movie is not available.')
                    }
                    else {
                        console.log('TITLE: ', result['Title']);
                        console.log('YEAR: ', result['Year']);
                        console.log('IMDB RATING: ', result['imdbRating']);
                        if (result['Ratings'][1] !== undefined) {
                            console.log('ROTTEN TOMATOES RATING: ', result['Ratings'][1]['Value']);
                        }
                        else {
                            console.log('ROTTEN TOMATOES RATING: Not Available.')
                        }
                        console.log('PRODUCED IN: ', result['Country']);
                        console.log('LANGUAGE: ', result['Language']);
                        console.log('PLOT: ', result['Plot']);
                        console.log('ACTORS: ', result['Actors'], '\n');
                    }
                }
            });
        }
        // do-what-it-says command method
        else if (com === this.commands[3]) {
            // access the file with list of commands and input
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                    console.log(error)
                } 
                else {
                    dataArr = data.split(",")
                    // generate random number to choose a command
                    var random = Math.floor(Math.random()* (dataArr.length - 1))
                    if(random % 2 === 1) {
                        random--;
                    }
                    // console log the chosen command and input
                    console.log(dataArr[random], dataArr[random + 1])
                    // call the method for the action and input
                    dothis.action(dataArr[random], dataArr[random + 1])
                }
            })
        }
    }
}

// Prompt to start the process
inquirer.prompt([
    {
        type: 'list',
        name: 'command',
        message: 'Please choose a command for LIRI: ',
        choices: ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says']
    }
]).then(function(command) {
    var commands = ['concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'];
    var search = ['band', 'song', 'movie']
    // do-what-it-says command
    if (command.command === commands[3]) {
        dothis.action(commands[3])
    }
    // other commands
    else {
        // check which command it is, and request input
        for (i = 0; i < search.length; i++) {
            if (command.command === commands[i]) {
                // Prompt for input
                var question = 'What ' + search[i] + ' would you like to search for?'
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'input',
                        message: question
                    }
                ]).then(function(input) {
                    // call command with input
                    dothis.action(command.command, input.input)
                })
            }
        }
    }
})