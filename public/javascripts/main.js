// Variables 
const geolocation   = "http://localhost:3000/api/geolocation";
const weather       = "http://localhost:3000/api/weather";
const appID         = "&APPID=624a5719fc88bdf6359cecd6a3e7de74";
var units           = "&units=metric";
var wTemp;
var fTemp           = [];
var unit            = "celsius";

// Display local weather
$(document).ready(function() {
  
    // Get geolocation from
    // own web service and
    // present result in the
    // DOM
    fetch(geolocation)
      .then(res => res.json())
      .then(location => {
        // console.log("Received: ", location.city);
        // Get weather for location
        getWeather(location.city);
        console.log(location.city);
  
      });
  
  });

// Get weather by calling own
// web service (composition)
function getWeather(city) {

  // Parse respone to json
  // and display weathe to
  // JSON
  fetch(`${weather}?city=${city}`)
    .then(resp => resp.json())
    .then(weather => {
      render(weather);
    });

}

// Displays data in the
// DOM content (web page)
function render(wData) {
  //primary weather information
  $("#location").text(wData.name + ", " + wData.sys.country);
  var imgsrc = "https://openweathermap.org/img/w/" + wData.weather[0].icon + ".png";
  $("#icon").html('<img src="' + imgsrc + '" class=".wIcon" alt="w-icon">');
  wTemp = Math.round(wData.main.temp);
  $("#temp").text(Math.round(wTemp));
  $("#mainWeather").text(wData.weather[0].main);
  $("#tempMax").text(wData.main.temp_max);
  $("#tempMin").text(wData.main.temp_min);
  //secondary weather information
  $("#day").text(dayOfWeek());
  $("#time").text(currentTime());
  $("#descWeather").text(wData.weather[0].description);
  $("#wind").text("Wind: " + wData.wind.speed);
  $("#humidity").text("Humidity: " + wData.main.humidity + "%");
}

function displayForecast(fData) {
  var i = 8; //Used to iterate through JSON data

  $(".fDay").each(function() {
    $(this).text(fData.list[i].dt_txt);
    i += 8;
  });
  i = 8;
  $(".fIcon").each(function() {
    var imgsrc =
      "https://openweathermap.org/img/w/" +
      fData.list[i].weather[0].icon +
      ".png";
    //console.log(imgsrc);
    $(this).html('<img src="' + imgsrc + '" alt="f-icon">');
    i += 8;
  });
  i = 8;
  $(".fDesc").each(function() {
    $(this).text(fData.list[i].weather[0].main);
    i += 8;
  });
  i = 8;
  $(".fTemp").each(function() {
    fTemp.push(Math.round(fData.list[i].main.temp));
    //console.log(fTemp);
    $(this).text(Math.round(fData.list[i].main.temp) + " C");
    i += 8;
  });
  i = 8;
}

function dayOfWeek() {
  var dt = new Date();
  //console.log(dt);
  var today = dt.getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return days[today];
}

function currentTime() {
  var now = new Date();
  var hours = now.getHours();
  var mins = now.getMinutes();
  var ampm = "";
  //logic to convert 24hr format to 12hr and get am/pm correctly
  if (hours < 12) ampm = "am";
  else if (hours == 00) {
    ampm = "am";
    hours = 12;
  } else if (hours == 12) ampm = "pm";
  else {
    ampm = "pm";
    hours = hours - 12;
  }
  //logic to show minutes as 2 digits even when minutes is lesser than 10
  mins = "0" + mins; //adds a string '0' to mins value and converts the whole mins to string. ex: 4 becomes 04, 15 becomes 015.
  mins = mins.slice(-2); //saves mins string as a slice of last 2 characters only. ex: 04 becomes 04, 015 becomes 15
  var time = "";
  time = hours + ":" + mins + ampm;
  return time;
}

$("#cf").click(function(e) {
  e.preventDefault();
  if (unit == "celsius") {
    unit = "farenheit";
    wTemp = wTemp * 1.8 + 32;
    $(".fTemp").each(function(index) {
      fTemp[index] = fTemp[index] * 1.8 + 32;
      $(this).text(Math.round(fTemp[index]) + " F");
    });
    $("#f")
      .addClass("selected")
      .removeClass("unselected");
    $("#c")
      .removeClass("selected")
      .addClass("unselected");
    $("#temp").text(Math.round(wTemp));
  } else {
    unit = "celsius";
    wTemp = (wTemp - 32) / 1.8;
    $(".fTemp").each(function(index) {
      fTemp[index] = (fTemp[index] - 32) / 1.8;
      $(this).text(Math.round(fTemp[index]) + " C");
    });
    $("#c")
      .addClass("selected")
      .removeClass("unselected");
    $("#f")
      .removeClass("selected")
      .addClass("unselected");
    $("#temp").text(Math.round(wTemp));
  }
});

$("#goButton").click(function() {
  if ($("#userInput").val() === "") {
    alert("Please enter a location.");
  } else {
    userRegion = $("#userInput").val();
    getWeather(userRegion);
    getForecast(userRegion);
  }
});