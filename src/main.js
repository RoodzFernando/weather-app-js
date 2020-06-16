let city = 'United states';
const apiKey = '5ebc65c3b3b4a29eb99812e976f35fc3';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, { mode: 'cors' })
    .then(data => {
        return data.json();
    }).then(response => {
        console.log(response);
    })