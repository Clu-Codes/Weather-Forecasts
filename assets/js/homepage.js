var cityName = [];

inputEl = document.querySelector("#city-finder");
formEl = document.querySelector("form");

var saveCities = function() {
    localStorage.setItem("localStorageCity", JSON.stringify(cityName));
};

var loadCities = function () {
    if (JSON.parse(localStorage.getItem("localStorageCity")) !== null) {
        cityName = JSON.parse(localStorage.getItem("localStorageCity"));
    }

    cityName.forEach((city, index) => {
        citiesLineEl = document.createElement("<li>");
        cityNameNode = document.createTextNode("index")
        citiesLineEl.appendChild(cityNameNode);
        document.getElementById("#search-history").appendChild(citiesLineEl);
    })
}

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
            saveCities();
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
    windSpeedEl.textContent = "Wind-Speeds:" + " " + data.current.wind_speed;
    console.log(windSpeedEl);

    uvIndexEl = document.querySelector("#uv-index");
    uvIndexEl.textContent = "UV-Index" + " " + data.current.uvi;
    console.log(uvIndexEl);

    forecastOneDate = document.querySelector("#first-day-header");
    forecastOneDate.textContent = moment().add(1, 'd').format("MM/DD/YYYY");
    forecastOneTemp = document.querySelector("#first-day-temp");
    forecastOneTemp.textContent = "Temp:" + " " + data.daily[1].feels_like.day;
    forecastOneHumid = document.querySelector("#first-day-humid");
    forecastOneHumid.textContent = "Humidity:" + " " + data.daily[1].humidity;

    forecastTwoDate = document.querySelector("#second-day-header");
    forecastTwoDate.textContent = moment().add(2, 'd').format("MM/DD/YYYY");
    forecastTwoTemp = document.querySelector("#second-day-temp");
    forecastTwoTemp.textContent = "Temp:" + " " + data.daily[2].feels_like.day;
    forecastTwoHumid = document.querySelector("#second-day-humid");
    forecastTwoHumid.textContent = "Humidity:" + " " + data.daily[2].humidity;

    forecastThreeDate = document.querySelector("#third-day-header");
    forecastThreeDate.textContent = moment().add(3, 'd').format("MM/DD/YYYY");
    forecastThreeTemp = document.querySelector("#third-day-temp");
    forecastThreeTemp.textContent = "Temp:" + " " + data.daily[3].feels_like.day;
    forecastThreeHumid = document.querySelector("#third-day-humid");
    forecastThreeHumid.textContent = "Humidity:" + " " + data.daily[3].humidity;

    forecastFourDate = document.querySelector("#fourth-day-header");
    forecastFourDate.textContent = moment().add(4, 'd').format("MM/DD/YYYY");
    forecastFourTemp = document.querySelector("#fourth-day-temp");
    forecastFourTemp.textContent = "Temp:" + " " + data.daily[4].feels_like.day;
    forecastFourHumid = document.querySelector("#fourth-day-humid");
    forecastFourHumid.textContent = "Humidity:" + " " + data.daily[4].humidity;

    forecastFiveDate = document.querySelector("#fifth-day-header");
    forecastFiveDate.textContent = moment().add(5, 'd').format("MM/DD/YYYY");
    forecastFiveTemp = document.querySelector("#fifth-day-temp");
    forecastFiveTemp.textContent = "Temp:" + " " + data.daily[5].feels_like.day;
    forecastFiveHumid = document.querySelector("#fifth-day-humid");
    forecastFiveHumid.textContent = "Humidity:" + " " + data.daily[5].humidity;
    
}

loadCities();

formEl.addEventListener("submit", getCity);
