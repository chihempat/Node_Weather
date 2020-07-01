var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', function(req, res) {

    const query = req.body.cityName;
    const appid = "6ba01804a9926a71ac8dce10fd3d0880";
    const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appid + '&units=metric#';

    http.get(url, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            var weatherData = JSON.parse(data);
            console.log(weatherData);
            var temp = weatherData.main.temp;
            var desp = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";


            res.write("<h1>" + query + " temperature is " + temp + "</h1>");
            res.write("<h1>The city has " + desp + "</h1>");
            res.write("<img src=" + imgUrl + ">");

            res.send();
        });
    });

});




app.listen(3000, function() {
    console.log("Listening");
});
// const query = req.body.cityName;
// const appid = "6ba01804a9926a71ac8dce10fd3d0880";
// const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appid + '&units=metric#';