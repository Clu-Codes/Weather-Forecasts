inputEl = document.querySelector("#city-finder");
formEl = document.querySelector("form");


var getCity = function(event) {
    event.preventDefault()
    var city = inputEl.value.trim();

    console.log(city);
    getForecast(city);
}


var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + ;

    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log("test 1", data.list[0].main.temp);
                displayCityWeather(data);
            });
        } else {
            console.log("Opps! That didn't work.")
        }
    })
}

var displayCityWeather = function(data) {
    cityTitleEl = document.querySelector("#city-date");
    cityTitleEl.textContent = city + " " + "(" + moment(new Date()).format("MM/DD/YYYY") + ")";
    temperatureEl = document.querySelector("#temperature");
    console.log(data.list[0].main.temp);
    temperatureEl.textContent = "Temperature:" + data[0].temp;

    // console.log(cityTitleEl);
}




formEl.addEventListener("submit", getCity);


// I am not sure how I can check to see if the city exist, since I am required to include the city's name in my API call.
// if (city) { 
//     getForecast(city);
//     $("#city-find").value = "";
// } else {
//     alert("")
// }