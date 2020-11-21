var cityName = [];

inputEl = document.querySelector("#city-finder");
formEl = document.querySelector("form");


var saveCities = function(city) {
    if (!localStorage.getItem("localStorageCity")) {
        localStorage.setItem("localStorageCity", JSON.stringify(cityName));
    } else if (localStorage.getItem("localStorageCity").indexOf(city) === -1) {
        localStorage.setItem("localStorageCity", JSON.stringify(cityName));
    } else {
        localStorage.removeItem()
    }
};

var getCity = function(event, cityHistory) {
    event.preventDefault();
    var city = inputEl.value.trim();
    inputEl.value = "";
    
    if (cityHistory !== undefined) {
        getForecast(cityHistory)
    } else {
        getForecast(city);
    }
};

var loadCities = function () {
    if (JSON.parse(localStorage.getItem("localStorageCity"))) {
        var cityNameArr = JSON.parse(localStorage.getItem("localStorageCity"));
        var revCityName = cityNameArr.reverse();
    }

    var searchHistoryEl = document.getElementById("search-history");
    searchHistoryEl.innerHTML = "";
    revCityName.forEach((city, index) => {
        if (index < 10) {
            cityLineEl = document.createElement("li");
            cityLineEl.className = "list-group-item";
            cityLineEl.textContent = city;
            searchHistoryEl.appendChild(cityLineEl);
        }
    });
};

var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            cityName.push(city);
            saveCities(city);

            cityTitleEl = document.querySelector("#city-date");
            cityTitleEl.textContent = city + " " + "(" + moment(new Date()).format("MM/DD/YYYY") + ")";

            loadCities();

            response.json().then(function(data) {
                var oneDayApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "";
                fetch (oneDayApiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            var cityWeatherIcon = document.getElementById("header-weather-icon");
                            cityWeatherIcon.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png\"" + "/>";
                            displayCityWeather(data);

                        })
                    }
                })
            });
        } else {
            alert("Opps! That didn't work.")
        }
    })
}

var displayCityWeather = function(data) {
    temperatureEl = document.querySelector("#temperature");
    temperatureEl.textContent = "Temperature:" + " " + data.current.temp;
    

    humidityEl = document.querySelector("#humidity");
    humidityEl.textContent = "Humidity:" + " " + data.current.humidity;
   

    windSpeedEl = document.querySelector("#wind-speed");
    windSpeedEl.textContent = "Wind-Speeds:" + " " + data.current.wind_speed;
   

    uvIndexEl = document.querySelector("#uv-index");
    uvIndexEl.textContent = "UV-Index" + " " + data.current.uvi;


   
    var forecastHeaders = document.querySelectorAll(".forecast-card")
    for (let i = 0; i < forecastHeaders.length; i++) {
        forecastHeaders[i].querySelector("div").textContent = moment().add(i + 1, 'd').format("MM/DD/YYYY");
        forecastHeaders[i].querySelector(".weather-icon").innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + data.daily[i + 1].weather[0].icon + "@2x.png\"" + "/>";
        forecastHeaders[i].querySelectorAll("p")[0].textContent = "Temp:" + " " + data.daily[i + 1].feels_like.day;
        forecastHeaders[i].querySelectorAll("p")[1].textContent = "Humidity:" + " " + data.daily[i + 1].humidity;
    };
    
}

$("#search-history").on("click", function(event) {
    var loadSavedCity = $(event.target).text();
    console.log(loadSavedCity);
    getForecast(loadSavedCity);
});

loadCities();

formEl.addEventListener("submit", getCity);

