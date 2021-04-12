# weather-journal-app
web app that records a weather journal for users

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.

## index.html file
I made a sipmle html code from scratch.

## style.css file
For the style sheet, I designed this simple background on Photoshop. I also used a cloud icon from https://pngtree.com/.
I used Bootstrap framework for specific elements. 
I wrote the whole CSS using SASS framework, and it made coding so much easier,quicker, and neater. 

## server.js file
I have the usual express sever setup. However ,it doesn't have a get route. It's not needed since I decided that instead of saving data on the server and fetch it later,I would take the formatted data directly from the response to the post request. 
I had the server respond with json data.

Sde note: I made the class 'nowDate' to process the raw data from 'Date' to present it in the UI in a simple and easy to read manner. 

## app.js file
I added an EventListener to button when clicked:
- It makes sure that the data was entered. If not, then,
- It will alert the user to enter data.
- It uses the entered data then passes it to the getWeatherData() function.

The getWeatherData() is an async function that does the following:
-Fetches data from weather API using fetch() function and the entered data.
-Passes the fetched weather data to the postWeatherData() function. 

The postWeatherData() is an async function that does the following:
- It calls for a post request.
- Recieves the response and checks if the entered zipcode is correct. If not,
- Alerts the user to enter the correct zipcode.
- Turns the response into json.
- Displays the formatted response in the UI.
