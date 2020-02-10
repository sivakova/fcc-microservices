// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Timestamp 
app.get("/api/timestamp", function (req, res) {
  const date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() });
});

app.get("/api/timestamp/:date_string", function (req, res) {
  let timeStamp = req.params.date_string;
  if(!isNaN(parseFloat(timeStamp)) && isFinite(timeStamp)) {
    timeStamp = Number(timeStamp);
    if(timeStamp < 1450137600) {
      res.json({"error" : "Invalid Date" });
      return;
    }
  }
  
  const newDate = new Date(timeStamp);
  if(timeStamp && newDate instanceof Date && !isNaN(newDate)) {
    res.json({"unix": newDate.getTime(), "utc" : newDate.toUTCString() });
  } else {
    res.json({"error" : "Invalid Date" });
  }

});

// Request Header Parser

app.get("/api/whoami", function (req, res) {
  res.json({
    "ipaddress": req.headers.host,
    "language": req.get('Accept-Language'),
    "software": req.get('User-Agent'),
  })
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
