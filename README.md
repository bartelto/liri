# LIRI (Language Interpretation and Recognition Interface)
By Todd F. Bartelt

## Available commands:

```node liri concert-this <artist name>```
Uses the Bandsintown API to return upcoming concert dates and locations for the specified music artist.

```node liri spotify-this-song <song name>```
Uses the Spotify API to return info on matching songs, including a link to each song on Spotify.

```node liri movie-this <movie name>```
Uses the OMDb (Online Movie Database) API to return upcoming concert dates and locations for the specified music artist.

```node liri do-what-it-says```
Processes the command saved in the file random.txt to perform one of the searches described above. Save the command in the following format: ```<command>,<artist/song/movie name>```. For example:
```spotify-this-song,"Polka Your Eyes Out"```

NOTE: When searching for an artist/song/movie with a name that's more than one word, make sure you enclose the name in quotes.