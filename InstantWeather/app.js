const storage = new Storage();
const city = storage.getLocation();
const weather = new Weather(city);
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('saveChangesBtn').addEventListener('click', changeLocation);


function getWeather(){
  weather.getWeatherData()
  .then(result => {
    console.log(result);
    if(result.cod === 200){
      ui.displayWeather(result);
      document.getElementById('invalid-city').innerHTML = '';
      document.getElementById('invalid-city').className = '';
      $('#locModal').modal('hide');
      storage.setLocation(result.name);
    }else{
      //display invalidation error in ui
      document.getElementById('invalid-city').innerHTML = 'Please enter a valid city.';
      document.getElementById('invalid-city').className ="alert alert-dismissible alert-warning";
    }
  })
  .catch(err => console.log(err));
}

function changeLocation(){
  const city = document.getElementById('city').value;
  weather.changeLoc(city);
  getWeather();
}