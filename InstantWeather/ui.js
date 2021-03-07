class UI{
  constructor(){
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.temp = document.getElementById('w-temp');
    this.feelsLike = document.getElementById('w-feels-like');
    this.icon = document.getElementById('w-icon');
    this.minMaxTemp = document.getElementById('w-min-max-temp');
    this.pressure = document.getElementById('w-pressure');
    this.humidity = document.getElementById('w-humidity');
    this.wind = document.getElementById('w-wind');
  }

  displayWeather(data){
    this.location.textContent = data.name;
    this.desc.textContent = data.weather[0].description;
    this.temp.textContent = `${data.main.temp}C`;
    this.feelsLike.textContent = `feels like ${data.main.feels_like}C`;
    this.icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    this.minMaxTemp.textContent = `Min Temp: ${data.main.temp_min}C, Max Temp: ${data.main.temp_max}C`;
    this.pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
    this.humidity.textContent = `Humidity: ${data.main.humidity}%`;
    this.wind.textContent = `Wind speed: ${data.wind.speed} meter/sec`;
  }
}