import './styles.scss';
const apiKey = '5ebc65c3b3b4a29eb99812e976f35fc3';
let weatherObj = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};
// DOM Manipulation
let cityName = document.getElementById('cityName');
let search = document.getElementById('citySearch');
let checkBox = document.getElementById('toggle-checkbox');
// inject to the DOM
// group 1
let city_name = document.getElementById('city-name');
let city_initial = document.getElementById('city-code');
let weather_description = document.getElementById('description');
let weather_ico = document.getElementById('weather-ico');
let temperature = document.getElementById('temperature');
let current_day = document.getElementById('day');


// group 2
let feel_like = document.getElementById('feels_like');
let min_temp = document.getElementById('min_temp');
let max_temp = document.getElementById('max_temp');
let humidity = document.getElementById('humidity');

let city = "";
let day_date = new Date();

function display() {
    city_name.textContent = `${weatherObj.city}, `;
    city_initial.textContent = weatherObj.country;
    current_day.innerHTML = `${weatherObj.days[day_date.getDay()]}, ${day_date.getHours()}:${day_date.getMinutes()<10? String(day_date.getMinutes()).padStart(2,0):day_date.getMinutes()}`;
    weather_description.innerHTML = `Description: ${weatherObj.description}`;
    weather_ico.src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`
    temperature.innerHTML = `${weatherObj.temperature} &deg;`;
    feel_like.innerHTML = `${weatherObj.feels_like} &deg;`;
    min_temp.innerHTML = `${weatherObj.temp_min} &deg;`;
    max_temp.innerHTML = `${weatherObj.temp_max} &deg;`;
    humidity.innerHTML = `${weatherObj.humidity} &percnt;`;
}


function getApi(url) {
    fetch(url, {
            mode: 'cors'
        })
        .then(data => {
            return data.json();
        }).then(response => {
            return response;
        })
        .then(dataInfo => {
            weatherObj.city = dataInfo.name;
            weatherObj.country = dataInfo.sys.country;
            weatherObj.description = dataInfo.weather[0].main;
            weatherObj.icon = dataInfo.weather[0].icon;
            weatherObj.feels_like = dataInfo.main.feels_like;
            weatherObj.temperature = dataInfo.main.temp;
            weatherObj.temp_min = dataInfo.main.temp_min;
            weatherObj.temp_max = dataInfo.main.temp_max;
            weatherObj.humidity = dataInfo.main.humidity;
        })
        .then(() => {
            display();
        })

}
window.addEventListener('load', () => {
    city = cityName.value || 'Port-au-Prince';
    getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
})

function getData(e) {
    e.preventDefault();
    city = cityName.value || 'Port-au-Prince';
    getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    checkBox.checked = false;
}
search.addEventListener('submit', getData);



checkBox.addEventListener('change', unitToggle);

function unitToggle() {
    if (checkBox.checked == true) {
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
    } else {
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    }
}