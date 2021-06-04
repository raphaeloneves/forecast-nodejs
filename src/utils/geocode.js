const request = require("request");

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFwaGFlbG9uZXZlcyIsImEiOiJja3BmZWJ6NnAyMHVjMnJsbG5sanE1OWRkIn0.Rt_1xdHXr89rZKeOvPzPgw";

const geocode = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

  request.get({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callback('error', undefined);
    } else if (body.features.length == 0) {
      callback("Location not found", undefined);
    } else {
      const data = body.features[0];
      const response = {
        latitude: data.center[1],
        longitude: data.center[0],
      }
      callback(undefined, response);
    }
  });
};

module.exports = geocode;
