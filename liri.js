require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];

switch (command) {
    case "concert-this":
        let artist = process.argv[3];
        let bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(bandQuery).then(function(response) {
            console.log(`${response.data.length} results for ${artist}:`);
            response.data.forEach(function(result) {
                let eventDate = moment(result.datetime).calendar();
                console.log(`${result.venue.name} | ${result.venue.city}, ${result.venue.region ? result.venue.region : result.venue.country} | ${eventDate}`);
            });
        });
        
        break;
        git 
    case "spotify-this-song":
        let songName = "";
        if (process.argv.length < 4) {
            songName = "The Sign Ace of Base";
        } else {
            songName = process.argv[3];
        }
                
        spotify.search({ type: 'track', query: songName, limit: 10 }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            data.tracks.items.forEach(function(result) {
                console.log(`${result.artists[0].name} | ${result.name} | ${result.album.name}\n    ${result.external_urls.spotify}`); 
            });
        });
        break;

    case "movie-this":
        let movieName = "";
        if (process.argv.length < 4) {
            movieName = "Mr. Nobody";
        } else {
            movieName = process.argv[3];
        }

        movieQuery = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`;

        axios.get(movieQuery).then(function(result, err) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }   
            //* Title of the movie.
            //* Year the movie came out.
            //* IMDB Rating of the movie.
            //* Rotten Tomatoes Rating of the movie.
            //* Country where the movie was produced.
            //* Language of the movie.
            //* Plot of the movie.
            //* Actors in the movie.
          
            console.log(`${result.data.Title} (${result.data.Year})`);
            console.log(`  IMDB Rating: ${result.data.imdbRating}`);
            console.log(`  Rotten Tomatoes Rating: ${result.data.Ratings[1].Value}`);
        });
        break;

    case "do-what-it-says":
        
        break;

    default:
        console.log(`Command '${command}' not recognized.`);
        break;
}
//concert-this

//spotify-this-song


//movie-this


//do-what-it-says