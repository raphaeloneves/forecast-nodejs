const forecastForm = document.getElementById("forecast-form");

forecastForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = document.getElementById("form-location").value;
  getForecast(userInput, (response) => {
    if (response.error) {
      alert(response.error);
      return;
    }
    document.getElementById("weather-icon").src = response.icon;
    document.getElementById("location").innerText = response.name;
    document.getElementById("region").innerText = response.region;
    document.getElementById("country").innerText = response.country;
    document.getElementById("temperature").innerText =
      response.temperature + "º - " + response.weather_description;
    document.getElementById("precip").innerText = response.precip + "% change of rain";
    console.log(response);
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
