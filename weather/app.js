
// declare variables 
let generateButton = document.getElementById('button')
let zipSpan = document.getElementById("zipError");
let feelSpan = document.getElementById("feelError");
let userEnteredData = document.getElementsByTagName('input');
let hide = document.getElementById('hide');
let feel = document.getElementById('feel');

// when Button clicked (It makes sure that the data was entered. If not, then, It will alert the user to enter data, It passes it to the getWeatherData() function)
generateButton.addEventListener('click', ()=>{
    zipSpan.innerHTML='';
    feelSpan.innerHTML='';
   
    if(userEnteredData[0].value){
        if(userEnteredData[0].value.length==5)
        {if(userEnteredData[1].value){
            getWeatherData(userEnteredData[0].value);
            feel.innerHTML = `and you feel ${userEnteredData[1].value} right now`}
            else{feelSpan.innerHTML='Required field';
            hideDataBlock()   
           }}
           else{zipSpan.innerHTML='country zip-code should be 5 numbers';hideDataBlock()} 
        }
         
    else{zipSpan.innerHTML='Required field';
        hideDataBlock();
        if(!userEnteredData[1].value){
            feelSpan.innerHTML='Required field';
            hideDataBlock()
             }} 
})


// fetchs weather data from weather API given country zip-code & APIkey
async function getWeatherData(zipCode){
    const myKey = "74c80cfc04919678699fc5c1c5c43b3a";
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${myKey}`
    const response = await fetch(url);
    const weatherJsonData = await response.json();
    postWeatherData(weatherJsonData)
  }


// It calls for a post request and displays the formatted response in the UI
async function postWeatherData(weatherJsonData){
    let options={
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(weatherJsonData)}

   fetch('/post', options)
   .then(response => {console.log(response); return response})
   .then(res =>{ if(!res.ok){zipSpan.innerHTML='please enter a valid country zip-code'; hideDataBlock()};return res})
   .then(response=>{let jsonn = response.json(); return jsonn})
   .then(jsonn=> {console.log(jsonn); return jsonn})
   .then(weather_data=>{
       document.getElementById('time').innerHTML = `${weather_data.timeDate.clock}, ${weather_data.timeDate.month} ${weather_data.timeDate.day}`;
       document.getElementById('name').innerHTML = `${weather_data.countryName}, ${weather_data.countryCode}`;
       document.getElementById('temp').innerHTML = `${weather_data.temp}°C`;
       document.getElementById('description').innerHTML = `Feels like ${weather_data.ftemp}°C. ${weather_data.weatherDescription}. ${weather_data.weatherDescriptionI}.`;
       let icon = document.getElementById('icon') ;
       let src = `http://openweathermap.org/img/wn/${weather_data.weatherDescriptionIcon}.png` ;
       icon.setAttribute('src', src)
       let hide = document.getElementById("hide");
       hide.classList.remove("hide");
}) 
}

function hideDataBlock(){
    if(!hide.classList.contains('hide')){
        hide.classList.add("hide")}
}

