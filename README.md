# LIRI (Language Interpretation and Recognition Interface)
By Todd F. Bartelt

## Introduction

LIRI is a Node.js app designed to answer a variety of pop-culture questions:
- Where is my favorite music artist performing?
- Does Spotify have my favorite new song?
- Who are the actors in that new movie I heard about?

LIRI puts the answers to these questions at your fingertips by employing three different APIs: Bandsintown, Spotify, and the Online Movie Database.

## Using LIRI

LIRI is a Node.js app that uses a command-line interface (CLI). Once you have downloaded the project to your local machine and installed the package.json file, you can run it by using one of the following commands:

**NOTE:** *When searching for an artist/song/movie with a name that's more than one word, make sure you enclose the name in quotes.*

```node liri concert-this <artist name>```
Uses the Bandsintown API to return upcoming concert dates and locations for the specified music artist.

```node liri spotify-this-song <song name>```
Uses the Spotify API to return info on matching songs, including a link to each song on Spotify.

```node liri movie-this <movie name>```
Uses the OMDb (Online Movie Database) API to return upcoming concert dates and locations for the specified music artist.

```node liri do-what-it-says```
Processes the command saved in the file **```random.txt```** to perform one of the searches described above. Save the command in the following format: ```<command>,<artist/song/movie name>```. For example:
```spotify-this-song,"Polka Your Eyes Out"```

## Screenshots

## Technologies used

### NPM packages
- **```node-spotify-api```** Simplifies the process of using the Spotify API.
- **```axios```** Promise based HTTP client for the browser and node.js.
- **```moment```** A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **```dotenv```** A zero-dependency module that loads environment variables from a .env file into **```process.env```**. 
- **```fs```** A package for reading, writing, and appending text files.

### APIs used via Axios
- **Bandsintown**
- **Online Movie Database (OMDb)**

## The author

This app was written from the ground up by **Todd F. Bartelt** as part of the Full-Stack Web Development program at University of Kansas Professional and Continuing Education.


