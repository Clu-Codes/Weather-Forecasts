var cityName = [];

inputEl = document.querySelector("#city-finder");
formEl = document.querySelector("form");


var getCity = function(event) {
    event.preventDefault()
    var city = inputEl.value.trim();

    console.log(city);
    getForecast(city);
}


var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "";

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            cityName.push(city);
            console.log(cityName);
            response.json().then(function(data) {
                var oneDayApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.city.coord.lat + "&lon=" + data.city.coord.lon + "";
                fetch (oneDayApiUrl)
                .then(function(response) {
                    if (response.ok) {
                        response.json().then(function(data) {
                            console.log(data);
                            displayCityWeather(data);
                        })
                    }
                })
            });
        } else {
            console.log("Opps! That didn't work.")
        }
    })
}

var displayCityWeather = function(data) {
    cityTitleEl = document.querySelector("#city-date");
    cityTitleEl.textContent = cityName[0] + " " + "(" + moment(new Date()).format("MM/DD/YYYY") + ")";
    temperatureEl = document.querySelector("#temperature");
    // console.log(data.list[0].main.temp);
    temperatureEl.textContent = "Temperature:" + " " + data.current.temp;
    console.log(temperatureEl);

    humidityEl = document.querySelector("#humidity");
    humidityEl.textContent = "Humidity:" + " " + data.current.humidity;
    console.log(humidityEl);

    windSpeedEl = document.querySelector("#wind-speed");
    windSpeedEl.textContent = "wind:" + " " + data.current.wind_speed;
    console.log(windSpeedEl);

    uvIndexEl = document.querySelector("#uv-index");
    uvIndexEl.textContent = "UV-Index" + " " + data.current.uvi;
    console.log(uvIndexEl);

}




formEl.addEventListener("submit", getCity);
