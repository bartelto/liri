// LIRI (Language Interpretation and Recognition Interface)
// by Todd F. Bartelt

require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");

var spotify = new Spotify(keys.spotify);

if (process.argv[2] === "do-what-it-says") {
    // attempt to process request contained in random.txt
    console.log("in here");
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log("data:" + data);
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        
        processRequest(dataArr[0], dataArr[1]);
    });
} else {
    // attempt to process request from the command line
    processRequest(process.argv[2], process.argv[3]);
}

function processRequest(command, subject) {
    switch (command) {
        case "concert-this":
            concertLookup(subject);
            break;
            
        case "spotify-this-song":
            if (subject === "") {
                songLookup("The Sign Ace of Base");
            }
            else {
                songLookup(subject);
            }
            break;

        case "movie-this":
            if (subject === "") {
                movieLookup("Mr. Nobody");
            }
            else {
                movieLookup(subject);
            }
            break;

        default:
            console.log(`Command '${command}' not recognized.`);
            break;
    }
}

function movieLookup(movieName) {
 
    movieQuery = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`;
    axios.get(movieQuery).then(function (result, err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(`${result.data.Title} (${result.data.Year})`);
        console.log(`  IMDB Rating: ${result.data.imdbRating}`);
        if (result.data.Ratings.length > 0) {
            let foundRT = false;
            result.data.Ratings.forEach(function (element) {
                if (element.Source === "Rotten Tomatoes") {
                    console.log(`  Rotten Tomatoes Rating: ${element.Value}`);
                    foundRT = true;
                }
            });
            if (!foundRT)
                console.log("  Rotten Tomatoes Rating: not available");
        }
        else {
            console.log("  Rotten Tomatoes Rating: not available");
        }
        console.log(`  Country: ${result.data.Country} | Language: ${result.data.Language}`);
        console.log(`  Plot: ${result.data.Plot}`);
        console.log(`  Starring: ${result.data.Actors}`);
    });
}

function songLookup(songName) {
    
    spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        data.tracks.items.forEach(function (result) {
            console.log(`${result.artists[0].name} | ${result.name} | ${result.album.name}\n    ${result.external_urls.spotify}`);
        });
    });
}

function concertLookup(artist) {
    let bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQuery).then(function (response) {
        console.log(`${response.data.length} result(s) for ${artist}:`);
        response.data.forEach(function (result) {
            let eventDate = moment(result.datetime).calendar();
            console.log(`${result.venue.name} | ${result.venue.city}, ${result.venue.region ? result.venue.region : result.venue.country} | ${eventDate}`);
        });
    });
}
