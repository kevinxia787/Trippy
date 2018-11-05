const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const request = require('request');
const foursquare = require('./config.json');
// console log for server running
app.listen(port, () => console.log(`Listening on port ${port}`));

// connect
request({
    url: 'https://api.foursquare.com/v2/venues/explore',
    method: 'GET',
    qs: {
        client_id: foursquare.CLIENT_ID,
        client_secret: foursquare.CLIENT_SECRET,
        ll: '40.7243,-74.0018',
        query: 'coffee',
        v: '20180323',
        limit: 1
    }
}, function(err, res, body) {
    if (err) {
        console.error(err);
    } else {
        console.log(body);
    }
});



// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({express: "Express server connected to React!"});
});

