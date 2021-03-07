class Weather {
  constructor(city){
    this.city = city;
    this.APIkey = '2fdf46591101976d38031dbc3fddc04c';
  }
  
  //fetch weather data
  async getWeatherData(){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.APIkey}&units=metric`);

    const weatherData = await response.json();

    return weatherData;
  }

  //change loc
  changeLoc(city){
    this.city = city;
  }
}