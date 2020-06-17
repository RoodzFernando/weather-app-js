import './styles.scss';
const apiKey = '5ebc65c3b3b4a29eb99812e976f35fc3';
// DOM Manipulation
let cityName = document.getElementById('cityName');
let search = document.getElementById('citySearch');
let checkBox = document.getElementById('toggle-checkbox');
// variables
let city = "";



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
            console.log(dataInfo.name, dataInfo.sys.country);
            console.log(dataInfo.weather[0].main);
            console.log(dataInfo.weather[0].icon);
            console.log(dataInfo.main.feels_like)
            console.log(dataInfo.main.temp_min);
            console.log(dataInfo.main.temp_max);
            console.log(dataInfo.main.humidity);
            console.log(dataInfo);
        })
}

search.addEventListener('submit', (e) => {
    e.preventDefault();
    city = cityName.value;
    getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    console.log(city);
})



checkBox.addEventListener('change', unitToggle);

function unitToggle() {
    if (checkBox.checked == true) {
        console.log('checked');
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
    } else {
        console.log('unchecked');
        getApi(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    }
}