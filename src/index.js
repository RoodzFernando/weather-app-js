import './styles.scss';
import {
    city_name,
    city_initial,
    weather_description,
    weather_ico,
    temperature,
    current_day,
    feel_like,
    min_temp,
    max_temp,
    checkBox,
    humidity
} from './domManip';
import unitToggle from './listeners';



let weatherObj = {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

let day_date = new Date();

function display() {
    city_name.textContent = `${weatherObj.city}, `;
    city_initial.textContent = weatherObj.country;
    current_day.innerHTML = `${weatherObj.days[day_date.getDay()]}, ${day_date.getHours()}:${day_date.getMinutes()<10? String(day_date.getMinutes()).padStart(2,0):day_date.getMinutes()}`;
    weather_description.innerHTML = `Description: ${weatherObj.description}`;
    weather_ico.src = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`
    temperature.innerHTML = `${weatherObj.temperature} &deg;${checkBox.checked ? 'F' : 'C'}`;
    feel_like.innerHTML = `${weatherObj.feels_like} &deg;`;
    min_temp.innerHTML = `${weatherObj.temp_min} &deg;`;
    max_temp.innerHTML = `${weatherObj.temp_max} &deg;`;
    humidity.innerHTML = `${weatherObj.humidity} &percnt;`;
}


export default function getApi(url) {
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


unitToggle();