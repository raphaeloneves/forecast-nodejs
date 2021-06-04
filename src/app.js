// core imports

const path = require("path");

// external imports

const express = require("express");
const hbs = require("hbs");

// internal imports

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// initializing Express

const app = express();

// define paths for Express config

const publicDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

// setup handlebars template engine

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve

app.use(express.static(publicDirectoryPath));

// routing

app.get("", (req, res) => {
  res.render("index", {
    pageName: "Weather App",
  });
});

app.get("/forecast", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "Address is mandatory",
    });
  }
  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send(response);
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    pageName: "Page not found",
  });
});

// server execution

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server initialized on port " + port);
});
