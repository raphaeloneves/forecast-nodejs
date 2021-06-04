const request = require("request");

const WEATHERSTACK_API_TOKEN = process.env.WEATHERSTACK_API_TOKEN;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_TOKEN}&query=${latitude},${longitude}`;
  request.get({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback("Could not connect to the server", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const { name, country, region } = body.location;
      const { temperature, precip } = body.current;
      const weather_description = body.current.weather_descriptions[0];
      const icon = body.current.weather_icons[0];
      const response = {
        name,
        country,
        region,
        temperature,
        precip,
        weather_description,
        icon,
      };
      callback(undefined, response);
    }
  });
};

module.exports = forecast