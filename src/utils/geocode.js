const request = require("request");

const geocode = (address, callback) => {
  const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicXdlcnN0ZXZlMDciLCJhIjoiY2s0Y3V6ZGVxMDY3aDNrbGY1cjB4aDRnNyJ9.B4JKxS2CDKu9fKtkmmKF5w&limit=1`;
  request(
    {
      url: geocodingUrl,
      json: true
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to location", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        const data = response.body;
        const name = data.features[0].place_name;
        const lng = data.features[0].center[0];
        const lat = data.features[0].center[1];
        callback(undefined, {
          name: name,
          lng: lng,
          lat: lat
        });
      }
    }
  );
};

module.exports = geocode;
