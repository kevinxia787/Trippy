const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const request = require('request');
const foursquare = require('./config.json');
// console log for server running
app.listen(port, () => console.log(`Listening on port ${port}`));

// connect

// food = 4d4b7105d754a06374d81259
//
app.get("/:user_location/:categoryId", (req, res) => {
    const user_location = req.params.user_location;
    const categoryId = req.params.categoryId;
    console.log(user_location);
    console.log(categoryId);
    //todo call API and asssembly JSON to be parse to Front end
    request({
        url: 'https://api.foursquare.com/v2/venues/search',
        method: 'GET',
        qs: {
            client_id: foursquare.CLIENT_ID,
            client_secret: foursquare.CLIENT_SECRET,
            ll: user_location,
            categoryId: categoryId,
            limit: 10,
            v: '20180323'
        }
    }, function(err, res, body) {
        if (err) {

            console.error(err);
        } else {
            console.log(body);
        }
    });
});



// create a GET route
app.get("/express_backend", (req, res) => {
  res.send({express: "Express server connected to React!"});
});

