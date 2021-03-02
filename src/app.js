function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = (date.getHours()<10? `0` : ``) + date.getHours();
let minutes = (date.getMinutes()<10? `0` : ``) + date.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days [date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let icon = response.data.weather[0].icon;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description)
}

//http://openweathermap.org/img/wn/01d@2x.png

let apiKey = "ad1c3c6d8734a6f724e8c027e1f76c71";
let city = "Istanbul";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);

