function formatDate(timestamp) {
let date = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days [date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours (timestamp) {
    let date = new Date(timestamp);
    let hours = (date.getHours()<10? `0` : ``) + date.getHours();
    let minutes = (date.getMinutes()<10? `0` : ``) + date.getMinutes();
    return `${hours}:${minutes}`;
}

function showTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
let icon = response.data.weather[0].icon;

celcius = response.data.main.temp;
temperatureElement.innerHTML = Math.round(celcius);

cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
iconElement.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
    `<div class="col-2">
        <h3>
            ${formatHours(forecast.dt * 1000)}
        </h3>
        <img 
            src= "https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        />
        <div class="weather-forecast-temperature">
            <strong>
                ${Math.round(forecast.main.temp_max)}°
            </strong> 
            ${Math.round(forecast.main.temp_min)}°
        </div>
    </div>`;
}
}

function search(city) {
    let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheit = Math.round((celcius * 9) / 5 + 32);
    temperatureElement.innerHTML = fahrenheit;
}

function showCelcius(event) {
    event.preventDefault();
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celcius);
}

let celcius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

search("Amsterdam");
