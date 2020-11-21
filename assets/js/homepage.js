var cityName = [];

inputEl = document.querySelector("#city-finder");
formEl = document.querySelector("form");


var saveCities = function() {
    localStorage.setItem("localStorageCity", JSON.stringify(cityName));
};

var getCity = function(event, cityHistory) {
    // event.preventDefault();
    var city = inputEl.value.trim();
    
    if (cityHistory !== undefined) {
        getForecast(cityHistory)
    } else {
        getForecast(city);
    }
}

var loadCities = function () {
    if (JSON.parse(localStorage.getItem("localStorageCity")) !== null) {
        cityName = JSON.parse(localStorage.getItem("localStorageCity"));
    }

    cityName.forEach((city, index) => {
        // console.log(city);


        var searchHistoryEl = document.getElementById("search-history");
        // console.log(searchHistoryEl);
        cityLineEl = document.createElement("li");
        cityLineEl.className = "list-group-item";
        cityLineEl.textContent = city;
        searchHistoryEl.appendChild(cityLineEl);
    })
}

var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            cityName.push(city);
            saveCities();
            cityTitleEl = document.querySelector("#city-date");
            cityTitleEl.textContent = city + " " + "(" + moment(new Date()).format("MM/DD/YYYY") + ")";

            var searchHistoryEl = document.getElementById("search-history");
            console.log(searchHistoryEl);
            cityLineEl = document.createElement("li");
            cityLineEl.textContent = city;
            searchHistoryEl.appendChild(cityLineEl);
            cityLineEl.addEventListener("click", function(event) {
                getCity(event, city);
            });

            response.json().then(function(data) {
                var oneDayApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "";
                fetch (oneDayApiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log("Hi", data);
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
    // console.log(data);
    // cityTitleEl = document.querySelector("#city-date");
    // cityTitleEl.textContent = city + " " + "(" + moment(new Date()).format("MM/DD/YYYY") + ")";
    temperatureEl = document.querySelector("#temperature");
    // console.log(data.list[0].main.temp);
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
        forecastHeaders[i].querySelectorAll("p")[0].textContent = "Temp:" + " " + data.daily[i + 1].feels_like.day;
        forecastHeaders[i].querySelectorAll("p")[1].textContent = "Humidity:" + " " + data.daily[i + 1].feels_like.day;
    };
    
}

// $("#search-history").on("click", function(event) {
//     var loadSavedCity = $(event.target).text();
//     console.log(loadSavedCity);
//     getCity(loadSavedCity);
// })

loadCities();

formEl.addEventListener("submit", getCity);

