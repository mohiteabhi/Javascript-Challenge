const apiKey = "09e74a487db8874cafc1367f6b20414b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".wind").innerHTML = data.wind.speed + " m/s";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "clear.png";
                break;
            case "Rain":
                weatherIcon.src = "rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "mist.png";
                break;
            default:
                weatherIcon.src = "default.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
