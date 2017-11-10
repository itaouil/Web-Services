// Variables
const geolocation   = "http://localhost:3000/api/geolocation";
const weather       = "http://localhost:3000/api/weather";
const photo         = "http://localhost:3000/api/photo";
const suggestions   = "http://localhost:3000/api/suggestions";
var cities;
var units           = "&units=metric";
var fTemp           = [];

// Display local weather
$(document).ready(function() {

    // Fetch suggestions
    // and cache them
    fetch(suggestions)
    .then(resp => resp.json())
    .then(data => cities = data);

    // Get geolocation from
    // own web service and
    // present result in the
    // DOM
    fetch(geolocation)
    .then(res => res.json())
    .then(location => {
        // Get weather for location
        const city = location.city;
        getWeather(city);
        getPhoto(city);
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

// Get weather by calling own
// web service (composition)
function getPhoto(city) {

    // Parse respone to json
    // and display image on
    // the background
    fetch(`${photo}?tag=${city}`)
    .then(resp => resp.json())
    .then(data => {

        // Get json of images
        const imgs = data.photos.photo;

        // Get random index
        const index = Math.floor(Math.random() * imgs.length - 1)

        // Show random image
        showImage(`https://farm${imgs[index].farm}.staticflickr.com/${imgs[index].server}/${imgs[index].id}_${imgs[index].secret}.jpg`);

    });

}

// Displays data in the
// DOM content (web page)
function render(data) {

    // Location requested
    $("#location").text(data.name + ", " + data.sys.country);

    // Icont for the weather
    $("#icon").html('<img src="' + "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png" + '" class=".wIcon" alt="w-icon">');

    // Temperature
    $("#temp").text(Math.round(data.main.temp));

    // Cloudy/Sunny/etc
    $("#mainWeather").text(data.weather[0].main);

    // Maximas and Minimas for the temperature
    $("#tempMax").text(data.main.temp_max);
    $("#tempMin").text(data.main.temp_min);

    // Display date info
    $("#day").text(dayOfWeek());
    $("#time").text(currentTime());
    $("#descWeather").text(data.weather[0].description);
    $("#wind").text("Wind: " + data.wind.speed);
    $("#humidity").text("Humidity: " + data.main.humidity + "%");
}

// Display suggestions
function displaySuggestions(suggestions) {

    const html = suggestions.slice(0,5).map(suggestion => {
        return `
            <li>
                <span>${suggestion}</span>
            </li>
        `;
    }).join('');

    document.querySelector('.suggestions').innerHTML = html;

}

// Displays image on the DOM
function showImage(imgURL) {
    $('body').css('background-image', `url(${imgURL})`);
}

function dayOfWeek() {
    var dt = new Date();
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

// Button click event which
// fires weather and photo
// data fetching
$("#goButton").click(function() {
    if ($("#userInput").val() === "") {
        alert("Please enter a location.");
    } else {
        const input = $("#userInput").val()
        getWeather(input);
        getPhoto(input);
    }
});

// Display suggestions
function autocomplete() {

    let suggestions = [];

    if (this.value != '') {
        // Find input matches
        const regex = new RegExp(this.value, 'gi');
        for (var key in cities) {
            if (cities.hasOwnProperty(key) && cities[key].match(regex)) {
                suggestions.push(cities[key]);
            }
        }
    }

    else {
        document.querySelector('.suggestions').innerHTML = "<li>Some suggestions</li>";
    }

    // Render suggestion in the DOM
    displaySuggestions(suggestions);

};

// Input event listener
$("#userInput").on('keyup', autocomplete);
