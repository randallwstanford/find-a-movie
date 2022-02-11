# find-a-movie 🎥

## Table of Contents
* [About](#about)
* [Technologies](#technologies)
* [Setup](#setup)
* [Screenshots](#screenshots)

## About
- 👀 This project was made to find movies to watch! 
- 🔎 Search movie by title, by random, and or by popular.
- 🧠 I created this app to learn how to make a React app served on Golang.
- ✨ I wanted to better style it but I hit the API limit for the month, so ill wait until the month is over to come back and make it prettier!

## Technologies
- React - version 17.0.2
- Golang - version 1.17.6
- Webpack - version 5.68.0
- Axios - version 0.25.0
- [Movies/TVShows Data (IMDB) API](https://rapidapi.com/amrelrafie/api/movies-tvshows-data-imdb/details?utm_source=api-quota-85&utm_medium=email&utm_campaign=Movies%2FTVShows%20Data%20%28IMDB%29)

## Setup
- Once cloned open up your terminal.
``` 
$ cd ./find-a-movie
$ npm install
$ npm run build
```
- Open a seperate terminal instance and run 
```
$ go run main.go
```
- Acquire API key, open up `apiKey.example.js` and rename to `apiKey.js`
- Replace the empty apiKey string to your API key. 
- `module.exports.apiKey = "xxxxxxx";`
- And you're all set! 

## Screenshots
![find-a-movie-screenshot](https://user-images.githubusercontent.com/83252804/153654406-a63387c9-7924-4537-8116-1acbf7df860e.png)
