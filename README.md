# liri-node-app
Language interpretation and recognition interface homework for UW Coding Bootcamp.


This LIRI app has four possible commands: concert-this, spotify-this-song, movie-this, and do-what-it-says. It takes in information from three different APIs to follow these commands. 

I restricted command input using the inquirer npm package to reduce error input.

1. concert-this
    This command uses the bandsintown API to search for performances and list the dates and locations of those performances. It lists up to 10 available results.
    
2. spotify-this-song
    This command searches for songs by name using the Spotify API, and returns a list of up to 5 titles, usually with a link to preview the song on Spotify.
    
3. movie-this 
    This command searches the Online Movie Database for a movie by title, and returns the top search result.
    
4. do-what-it-says
    This command randomly selects a command and input from a list, then follows the command.
