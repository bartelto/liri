# LIRI (Language Interpretation and Recognition Interface)
By Todd F. Bartelt

## Introduction

LIRI is a Node.js app designed to answer a variety of pop-culture questions, such as:
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

## How it works

At a high level, here's how LIRI works:
- The program captures your command from the command line (see above).
- If the command is ```do-what-it-says```, the program uses **```fs```** to read the content of **```random.txt```** and split the command name from the subject matter. It then sends the command text to ```processRequest(command, subject)```.
- Otherwise, the program just sends the command-line data to ```processRequest(,)```.
- ```processRequest(,)``` uses a ```switch``` statement to determine which of the three primary commands is being used.
- Each of the three primary commands is encapulated in its own function. If the given command matches one of the three expected commands, the corresponding function is called.
- Each function uses ```console.log``` to send the desired info to the terminal/bash, and then appends the same information to **```log.txt```**, which acts as a log of all requests and their results.


## Previews

### ```movie-this``` and ```concert-this```
![Preview 1](https://github.com/bartelto/liri-node-app/blob/master/documentation/liri-preview-1.gif "Preview 1")

### ```spotify-this-song``` and ```do-what-it-says```
![Preview 2](https://github.com/bartelto/liri-node-app/blob/master/documentation/liri-preview-2.gif "Preview 2")

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

This app was written from the ground up by **Todd F. Bartelt** as part of the Full-Stack Web Development program at University of Kansas Professional and Continuing Education. Learn more about Todd at [toddbartelt.com](http://toddbartelt.com).