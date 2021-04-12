// I wanted to form my time and date output in this specific form ex. 1:48pm, Mar 30 that's why I made this class
class NowDate {
  constructor() {
      this.d = new Date();
      this.day = this.d.getDate();
      this.time = this.clock((this.d.toTimeString()[0]+this.d.toTimeString()[1]),(this.d.toTimeString()[3]+this.d.toTimeString()[4]));
      this.month = this.months(this.d.getMonth());
    }
  months(m){
      let months =['Jan','Feb','Mar','Apr','May','June','July',' Aug','Sep','Oct','Nov','Dec']
      let month = months[m-1]
      return month;
  };
  clock(h,m){
      h= new Number(h);
      let pam = 'am' ;
       if(h>12){h=h-12;
      pam = 'pm'}
      let time = h+':'+m+pam
       return time;
  };   
}

// created server and it's listening to port 8000
const express = require('express');

const server = express(); 
server.listen(8000,Umlistening);
function Umlistening(){console.log('server listening to port 8000')};
// //end 

// declare var to hold scraped data 
 let td = new NowDate()
 let projectData = {
  timeDate :{
    clock : td.time ,
    month : td.month ,
    day : td.day }
 }
// //end

// body_Parser is deprecated instead I can use 'server.use(express.json())',
// load (img,css,html,js) static files in weather dir
// use cors to override being blocked of sending data to the server  
const cors = require('cors');
server.use(express.json())
server.use(cors())
server.use(express.static('weather'))
// //end

// GET route 
// get route not needed since I decided that instead of saving data on the server and fetch it later,I would take the formatted data directly from the response to the post request.
// //end

// POST route
server.post('/post',function(req,res){
  console.log(req.body)
  projectData['temp'] = Math.round(req.body.main.temp-273.15);
  projectData['ftemp'] = Math.round(req.body.main.feels_like-273.15);
  projectData['countryName'] = req.body.name;
  projectData['countryCode'] = req.body.sys.country;
  projectData['weatherDescription'] = req.body.weather[0].main;
  projectData['weatherDescriptionI'] = req.body.weather[0].description;
  projectData['weatherDescriptionIcon'] = req.body.weather[0].icon;
  // allow server to response with json data
  res.json(projectData)
})

























 
      





  



// server.use(express.json())
// server.post('/',function(req,res){ 
//     console.log(req.body);  
// })




// alldata = ScrapeRequiredData(req.body);
  

// function ScrapedRequiredData(weatherJsonData){
//     let Data = {
//         temp : Math.round(weatherJsonData.main.temp-273.15),
//         ftemp : Math.round(weatherJsonData.main.feels_like-273.15),
//         countryName : weatherJsonData.name,
//         countryCode : weatherJsonData.sys.country,
//         weatherDescription : weatherJsonData.weather[0].main,
//         weatherDescriptionI : weatherJsonData.weather[0].description,
//         weatherDescriptionIcon : weatherJsonData.weather[0].icon
//     }
//     return Data;
// }


