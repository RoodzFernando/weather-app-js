import {
    cityName,
    search,
    checkBox,
} from './domManip';

import getApi from './index';

let city = "";
const apiKey = '5ebc65c3b3b4a29eb99812e976f35fc3';
checkBox.addEventListener('change', unitToggle);
export default function unitToggle() {
    if (checkBox.checked == true) {
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
    } else {
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    }
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