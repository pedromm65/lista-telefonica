const express = require("express");

const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({
    message: "LATARIA DO ALIADOOOOOOOO"
  })
});

module.exports = routes;