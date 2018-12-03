const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const fetch = require('node-fetch');

const MapboxPolyline = require("@mapbox/polyline");

require('dotenv').config()

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

// to test geocoding http://127.0.0.1:3000/Boston,%20MA


async function getPhotoAPI(venueId){
    try {
        let first = await fetch('https://api.foursquare.com/v2/venues/' + venueId + '/photos' + '?client_' +
            'id=' + process.env.CLIENT_ID + '&client_secret' +
            '=' + process.env.CLIENT_SECRET + '&v=20180323');
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
        console.log("error getting photos");
    }
}


async function getDetailAPI(venueId){
    try {
        let first = await fetch('https://api.foursquare.com/v2/venues/' + venueId + '?client_' +
            'id=' + process.env.CLIENT_ID + '&client_secret' +
            '=' + process.env.CLIENT_SECRET + '&v=20180323');
        let second = await first.json();
        let contact = second['response']['venue']['contact'];
        let hours = second['response']['venue']['hours'];
        let descrip = second['response']['venue']['description'];
        console.log(second);
        return [contact, hours,descrip]
    }
    catch(err){
        console.log(err);
        console.log("error getting venu details");
    }

}

function getPolyline(start, dest) {
    const latLng = start + ';' + dest;
    console.log(latLng);
    let polylineUrl = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + latLng;
    console.log(polylineUrl);
    return new Promise(function(success, failure) {
        request({
            url: polylineUrl,
            method: 'GET',
            qs: {
                access_token: process.env.MAPBOX_KEY,
                geometries: 'polyline'
            }
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                success(JSON.parse(body));
            } else {
                failure(error);
                console.log("error with directions")
            }
        });
    }).catch((err) => {
        console.log(err);
    });
}


function getLatLng(address) {
    return new Promise(function(success, failure) {
        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            method: 'GET',
            qs: {
                key: process.env.OPENCAGE_KEY,
                q: address,
            }
        }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                success(JSON.parse(body));
            } else {
                failure(error);
                console.log("error with geocoding");
            }
        });
    }).catch((err) => {
        console.log(err);
    });
}

function getVenueAPI(user_location,section) {
    return new Promise(function (success, failure) {
        request({
            url: 'https://api.foursquare.com/v2/venues/explore',
            method: 'GET',
            qs: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                ll: user_location,
                section: section,
                limit: 50,
                v: '20180323'
            }
        },function (error, response, body) {
            if (!error && response.statusCode === 200) {
                success(JSON.parse(body));
            } else {
                failure(error);
                console.log("error getting venue");
            }
        });
    }).catch((err) => {
        console.log(err);
    });
}

app.get("/directions/:start/:dest", (req, res) => {
    try {
        const start = req.params.start;
        const dest = req.params.dest;
        getPolyline(start, dest).then(async function(body) {
            console.log(body.routes[0].geometry);
            let polyline = body.routes[0].geometry;
            res.send(MapboxPolyline.decode(polyline));
        }).catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log(err)
        console.log("error with directions route");
    }
})


app.get("/geocoding/:address", (req, res) => {
    try {
        const address = req.params.address;
        console.log(address);
        getLatLng(address).then(async function (body1) {
            console.log(body1);
            res.send(body1.results[0].geometry);
        }).catch((err) => {
            console.log(err);
        })
    } catch (err) {
        console.log("err");
        console.log("error with geocoding route");
    }
})

app.get("/suggestions/:user_location/:section", (req, res) => {
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
                // let photo_url = await getPhotoAPI(venueId);
                // let detail = await getDetailAPI(venueId);
                return {
                    Id: venueId,
                    name: name,
                    address: addr,
                    latitude: lat,
                    longitude: lng,
                    distance: dist,
                    // photo_url: photo_url,
                    // open_hours: detail[1],
                    // contact: detail[0],
                    // description:detail[2]
                };
            }));
            res.send(myList)
        }).catch((err) => {
            console.log(err);
        });
    }catch(err){
        console.log(err);
        console.log("general error");
    }
    });


