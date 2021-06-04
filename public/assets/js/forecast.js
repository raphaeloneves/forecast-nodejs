const forecastForm = document.getElementById("forecast-form");

forecastForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = document.getElementById("form-location").value;
  getForecast(userInput, (response) => {
    if (response.error) {
      alert(response.error);
      return;
    }
    const location = `${response.name} - ${response.region} - ${response.country}`
    const message = `
      ${response.weather_description} throughout the day. It's currently ${response.temperature} degress out 
      and there is ${response.precip}% chance of rain.
    `
    document.getElementById("location").innerHTML = location;
    document.getElementById("description").innerHTML = message;
  });
});

const getForecast = (location, callback) => {
  fetch(`/forecast?address=${encodeURIComponent(location)}`).then(
    (response) => {
      response.json().then((data) => {
        callback(data);
      });
    }
  );
};
