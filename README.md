# liri-node-app
Language interpretation and recognition interface homework for UW Coding Bootcamp.


This LIRI app has four possible commands: concert-this, spotify-this-song, movie-this, and do-what-it-says. It takes in information from three different APIs to follow these commands. 

I restricted command input using the inquirer npm package to reduce error input. This is what the menu looks like:

   ![liri5](https://user-images.githubusercontent.com/36722674/47400748-74d03800-d6f3-11e8-8642-2f91bbdf8cb8.png)
    
The first three commands each use a different API: 
1. concert-this
    This command uses the bandsintown API to search for performances and list the dates and locations of those performances. It lists up to 10 available results.
    
    ![liri3](https://user-images.githubusercontent.com/36722674/47400587-a1d01b00-d6f2-11e8-8f91-7e327b24110a.png)
    
2. spotify-this-song
    This command searches for songs by name using the Spotify API, and returns a list of up to 5 titles, usually with a link to preview the song on Spotify.
    
3. movie-this 
    This command searches the Online Movie Database for a movie by title, and returns the top search result.
    
    ![liri4](https://user-images.githubusercontent.com/36722674/47400588-a1d01b00-d6f2-11e8-9044-947c365d43c3.png)
    
4. do-what-it-says
    This command randomly selects a command and input from a list, then follows the command.
    
    ![liri6](https://user-images.githubusercontent.com/36722674/47401039-88c86980-d6f4-11e8-95c8-e4171b1e0e5f.png)



   ![liri1](https://user-images.githubusercontent.com/36722674/47400585-a1d01b00-d6f2-11e8-9d9f-af75cfc241bc.png)
   ![liri2](https://user-images.githubusercontent.com/36722674/47400586-a1d01b00-d6f2-11e8-80ab-38c1e2c152d2.png)
