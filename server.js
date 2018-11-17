const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const foursquare = require('./config.json');
const fetch = require('node-fetch');

// console log for server running
app.listen(port,
    function(err,res){
    if(err){
        console.log(err)
    }

    else {
        console.log(`Listening on port ${port}`)

    }
    });

// connect
// boston geolocation = 42.361145, -71.057083

//to test : http://127.0.0.1:3000/42.361145,%20-71.057083/food
//Get Request

async function getPhotoAPI(venueId){
    try {
        let first = await fetch('https://api.foursquare.com/v2/venues/' + venueId + '/photos' + '?client_' +
            'id=' + foursquare.CLIENT_ID + '&client_secret' +
            '=' + foursquare.CLIENT_SECRET + '&v=20180323');
        let second = await first.json();
        let prefix = second['response']['photos']['items'][0]['prefix'];
        let suffix = second['response']['photos']['items'][0]['suffix'];
        let width = second['response']['photos']['items'][0]['width'];
        let height = second['response']['photos']['items'][0]['height'];
        let size = width + 'x' + height;
        let ret = prefix + size + suffix;
        return ret;
    }catch(err){
        console.log(err)
    }
}


async function getDetailAPI(venueId){
    try {
        let first = await fetch('https://api.foursquare.com/v2/venues/' + venueId + '?client_' +
            'id=' + foursquare.CLIENT_ID + '&client_secret' +
            '=' + foursquare.CLIENT_SECRET + '&v=20180323');
        let second = await first.json();
        let contact = second['response']['venue']['contact'];
        let hours = second['response']['venue']['hours'];
        let descrip = second['response']['venue']['description'];
        console.log(second);
        return [contact, hours,descrip]
    }
    catch(err){
        console.log(err);
    }

}

function getVenueAPI(user_location,section) {
    return new Promise(function (success, failure) {
        request({
            url: 'https://api.foursquare.com/v2/venues/explore',
            method: 'GET',
            qs: {
                client_id: foursquare.CLIENT_ID,
                client_secret: foursquare.CLIENT_SECRET,
                ll: user_location,
                section: section,
                limit: 1,
                v: '20180323'
            }
        },function (error, response, body) {
            if (!error && response.statusCode === 200) {
                success(JSON.parse(body));
            } else {
                failure(error);
            }
        });
    });
}




app.get("/:user_location/:section", (req, res) => {
    try {
        const user_location = req.params.user_location;
        const section = req.params.section;
        getVenueAPI(user_location, section).then(async function (body1) {
            let venueList = body1['response']['groups'][0]['items'];
            let myList = await Promise.all(venueList.map(async elem => {
                let venue = elem['venue'];
                let venueId = venue['id'];
                let name = venue['name'];
                let addr = venue['location']['formattedAddress'];
                let lat = venue['location']['lat'];
                let lng = venue['location']['lng'];
                let dist = venue['location']['distance'];
                let photo_url = await getPhotoAPI(venueId);
                let detail = await getDetailAPI(venueId);
                return {
                    Id: venueId,
                    name: name,
                    address: addr,
                    latitude: lat,
                    longitude: lng,
                    distance: dist,
                    photo_url: photo_url,
                    open_hours: detail[1],
                    contact: detail[0],
                    description:detail[2]
                };
            }));
            res.send(myList)
        })
    }catch(err){
        console.log(err);
    }
    });


// create a GET route
    app.get("/express_backend", (req, res) => {
        res.send({express: "Express server connected to React!"});
    });

