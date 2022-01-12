const express = require("express");
const http = require("http");
var app = express();
const config = require('./config.json');

// Ping The Apps.
app.use(express.static("public"));

app.get("/", function (request, response) {
    response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
    console.log("PORT : " + listener.address().port);
});

setInterval(() => {
    http.get(config.projecturl);
    console.log("BOOSTED : " + config.projecturl)
}, 270000);