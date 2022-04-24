
var button = document.getElementById("search-btn");
var cityName = document.getElementById("city-name");
var cityDate = document.getElementById("city-date");
var cityTemp = document.getElementById("temp");
var cityUvi = document.getElementById("uvi");
var cityWind = document.getElementById("wind");
var cityHumidity = document.getElementById("humidity");
var dayOneDate = document.getElementById("day-1-date");
var dayTwoDate = document.getElementById("day-2-date");
var dayThreeDate = document.getElementById("day-3-date");
var dayFourDate = document.getElementById("day-4-date");
var dayFiveDate = document.getElementById("day-5-date");
var dayOneIcon = document.getElementById("day-1-icon");
var dayTwoIcon = document.getElementById("day-2-icon");
var dayThreeIcon = document.getElementById("day-2-icon");
var dayFourIcon = document.getElementById("day-4-icon");
var dayFiveIcon = document.getElementById("day-5-icon");
var dayOneTemp = document.getElementById("day-1-temp");
var dayTwoTemp = document.getElementById("day-2-temp");
var dayThreeTemp = document.getElementById("day-3-temp");
var dayFourTemp = document.getElementById("day-4-temp");
var dayFiveTemp = document.getElementById("day-5-temp");
var dayOneWind = document.getElementById("day-1-wind");
var dayTwoWind = document.getElementById("day-2-wind");
var dayThreeWind = document.getElementById("day-3-wind");
var dayFourWind = document.getElementById("day-4-wind");
var dayFiveWind = document.getElementById("day-5-wind");
var dayOneHumidity = document.getElementById("day-1-humidity");
var dayTwoHumidity = document.getElementById("day-2-humidity");
var dayThreeHumidity = document.getElementById("day-3-humidity");
var dayFourHumidity = document.getElementById("day-4-humidity");
var dayFiveHumidity = document.getElementById("day-5-humidity");


const appId = 'de4a638095d57c621b51e31ab4072354'
var searchedCities = JSON.parse(localStorage.getItem(searchedCities)) || [];


var displaySearched = function(cityArr) {
    for (var i=0; i< cityArr.length; i++) {
       var createButton =  document.createElement("button");
       createButton.innerHTML = cityArr[i].name;
       createButton.className = "btn btn-secondary w-100 mt-3";
       var parentDiv = document.getElementById("history");
       parentDiv.appendChild(createButton);
    }
};


var storeCity = function (cityName) {
    searchedCities = JSON.parse(localStorage.getItem(searchedCities)) || [];
    searchedCities.push({ name: cityName })
    localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
    console.log(cityName);
    console.log(searchedCities);
    displaySearched(searchedCities);
};

var getCoordinates = function (event) {
    event.preventDefault();
    storeCity(cityName.value);

    var appId = 'de4a638095d57c621b51e31ab4072354'

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${appId}&units=imperial`)
        .then(function (response) {
            response.json()
                .then(function (currentWeather) {
                    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&exclude={part}&appid=${appId}&units=imperial`)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (fiveDayWeather) {


                            console.log(currentWeather);
                            console.log(fiveDayWeather);

                            //Current Weather
                            cityDate.innerHTML = currentWeather.name + moment(currentWeather.dt, "X").format(" MM/DD/YYYY") + `<img src="http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png">`;
                            cityTemp.innerHTML = "Temp: " + currentWeather.main.temp + " Degrees Fahrenheit";
                            cityUvi.innerHTML = "UV Index: "+ fiveDayWeather.current.uvi;
                            cityWind.innerHTML = "Wind: " + currentWeather.wind.speed + " mph";
                            cityHumidity.innerHTML = "Humidity: "+currentWeather.main.humidity+"%";

                            //Day 1
                            dayOneDate.innerHTML = moment(fiveDayWeather.daily[0].dt, "X").format("MM/DD/YYYY");
                            dayOneIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDayWeather.daily[0].weather[0].icon}@2x.png">`;
                            dayOneTemp.innerHTML = "Temp: "+fiveDayWeather.daily[0].temp.day;
                            dayOneWind.innerHTML="Wind: "+fiveDayWeather.daily[0].wind_speed+" mph";
                            dayOneHumidity.innerHTML="Humidity: "+fiveDayWeather.daily[0].humidity+" %";

                            //Day 2
                            dayTwoDate.innerHTML = moment(fiveDayWeather.daily[1].dt, "X").format("MM/DD/YYYY");
                            dayTwoIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDayWeather.daily[1].weather[0].icon}@2x.png">`;
                            dayTwoTemp.innerHTML = "Temp: "+fiveDayWeather.daily[1].temp.day;
                            dayTwoWind.innerHTML="Wind: "+fiveDayWeather.daily[1].wind_speed+" mph";
                            dayTwoHumidity.innerHTML="Humidity: "+fiveDayWeather.daily[1].humidity+" %";

                            //Day3
                            dayThreeDate.innerHTML = moment(fiveDayWeather.daily[2].dt, "X").format("MM/DD/YYYY");
                            dayThreeIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDayWeather.daily[2].weather[0].icon}@2x.png">`;
                            dayThreeTemp.innerHTML = "Temp: "+fiveDayWeather.daily[2].temp.day;
                            dayThreeWind.innerHTML="Wind: "+fiveDayWeather.daily[2].wind_speed+" mph";
                            dayThreeHumidity.innerHTML="Humidity: "+fiveDayWeather.daily[2].humidity+" %";

                            //day4
                            dayFourDate.innerHTML = moment(fiveDayWeather.daily[3].dt, "X").format("MM/DD/YYYY");
                            dayFourIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDayWeather.daily[3].weather[0].icon}@2x.png">`;
                            dayFourTemp.innerHTML = "Temp: "+fiveDayWeather.daily[3].temp.day;
                            dayFourWind.innerHTML="Wind: "+fiveDayWeather.daily[3].wind_speed+" mph";
                            dayFourHumidity.innerHTML="Humidity: "+fiveDayWeather.daily[3].humidity+" %";

                            //day5
                            dayFiveDate.innerHTML = moment(fiveDayWeather.daily[4].dt, "X").format("MM/DD/YYYY");
                            dayFiveIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${fiveDayWeather.daily[4].weather[0].icon}@2x.png">`;
                            dayFiveTemp.innerHTML = "Temp: "+fiveDayWeather.daily[4].temp.day;
                            dayFiveWind.innerHTML="Wind: "+fiveDayWeather.daily[4].wind_speed+" mph";
                            dayFiveHumidity.innerHTML="Humidity: "+fiveDayWeather.daily[4].humidity+" %";
                        })
                });
        });
    
    
};

button.addEventListener("click", getCoordinates);