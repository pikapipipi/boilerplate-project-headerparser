// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'Hellow World, hello API' });
});

// API endpoint for user info
/*result in JSON format
1. IP address 
2. preferred language
3. software */

//get user header
app.get('/api/whoami', (req, res) => {
  //reset result
  let result = {
    "ipaddress": "error",
    "language": "error",
    "software": "error"
  };

  //get from header
  result.ipaddress = req.ip;
  result.language = req.headers["accept-language"];
  result.software = req.headers["user-agent"];

  //result in JSON format
  console.log("result: " + JSON.stringify(result));
  return res.json(result);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
