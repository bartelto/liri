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
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        
        processRequest(dataArr[0], dataArr[1].replace(/"/g, ""));
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
    let output = "";
    movieQuery = `http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`;
    axios.get(movieQuery).then(function (result, err) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        output += `${result.data.Title} (${result.data.Year})\n  IMDB Rating: ${result.data.imdbRating}`;
        if (result.data.Ratings.length > 0) {
            let foundRT = false;
            result.data.Ratings.forEach(function (element) {
                if (element.Source === "Rotten Tomatoes") {
                    output += `\n  Rotten Tomatoes Rating: ${element.Value}`;
                    foundRT = true;
                }
            });
            if (!foundRT)
                output += `\n  Rotten Tomatoes Rating: not available`;
        }
        else {
            output += `\n  Rotten Tomatoes Rating: not available`;
        }
        output += `\n  Country: ${result.data.Country} | Language: ${result.data.Language}`;
        output += `\n  Plot: ${result.data.Plot}`;
        output += `\n  Starring: ${result.data.Actors}`;

        console.log(output);
        logOutputToFile(`movie-this "${movieName}"\n` + output);
    });
}

function songLookup(songName) {
    let output = "";
    spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        output += `${data.tracks.items.length} result(s) for ${songName}:`;
        data.tracks.items.forEach(function (result) {
            output += `\n  ${result.artists[0].name} | ${result.name} | ${result.album.name} | ${result.external_urls.spotify}`;
        });
        console.log(output);
        logOutputToFile(`spotify-this-song "${songName}"\n` + output);
    });
}

function concertLookup(artist) {
    let output = "";
    let bandQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(bandQuery).then(function (response) {
        output += `${response.data.length} result(s) for ${artist}:`;
        response.data.forEach(function (result) {
            let eventDate = moment(result.datetime).calendar();
            output += `\n  ${result.venue.name} | ${result.venue.city}, ${result.venue.region ? result.venue.region : result.venue.country} | ${eventDate}`;
        });
        console.log(output);
        logOutputToFile(`concert-this "${artist}"\n` + output);
    });
}

function logOutputToFile(str) {
    if (str !== "") {
        str += "\n--------------------------------------------------------------------------------\n"; // separator line
        fs.appendFile("log.txt", str, function(error){ // automatically creates file if needed
            if (error) {
                return console.log(error);
            }
            console.log("Results saved to 'log.txt'.");
        });
    }

}