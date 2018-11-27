const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const request = require('request');
const foursquare = require('./config.json');
const fetch = require('node-fetch');
const config = require("./firebase_config.json");
const firebase = require("firebase");
const dotenv =  require('dotenv');
const bodyParser = require('body-parser');
const admin = require("firebase-admin");
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');
const mboxToken = require('./mBox_config.json');
const directionsClient = mbxDirections({ accessToken: mboxToken.accessToken});
// app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


firebase.initializeApp(config);

let database = firebase.database();
let auth = firebase.auth();

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


//connect to firebase




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
        console.log(second);
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
                console.log(body);
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

app.post('/register', function(req,res) {
    let req_obj = req.body;
    let email = req_obj.email;
    let password = req_obj.password;
    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(error.message);
    });

});


app.post('/save_trip', function(req,res) {
    let req_obj = req.body;
    let uid = req_obj.uid;
    let trips = req_obj.trips;
    let date = req_obj.date;

    database.ref('trips/').push().set({
        uid: uid,
        trips: trips,
        date: date

    });

});

app.get('/get_trip', function(req,res) {
    let req_obj = req.body;
    let uid = req_obj.uid;
    let date = req_obj.date;
    database.ref('trips/').push().set({
        uid: uid,
        trips: trips,
        date: date

    });

});

async function create_coordinates(points){
    let coordinates = '';
    for (i = 0; i < (points.length); i++) {
        let lng1 = points[i].longitude;
        let lat1 = points[i].latitude;
        if (i+1 === points.length){
            coordinates += lng1+','+lat1;
        } else {
            // let lng2 = points[i+1].longitude;
            // let lat2 = points[i+1].latitude;
            coordinates += lng1 + ',' + lat1 + ';';
        }
    }
    return coordinates;
}

app.get('/get_directions',(req, res) =>{
    let req_obj = req.body;
    let points = req_obj.points;
    create_coordinates(points).then(async function (coordinates){
        try {
            let first =  await fetch('https://api.mapbox.com/directions/v5/mapbox/walking/' + coordinates + '?geometries=geojson&access_token=' + mboxToken.accessToken);
            let second = await first.json();
            res.send(second);
        }
        catch (err) {
            console.log(err)

        }
    })


});



// create a GET route
    app.get("/express_backend", (req, res) => {
        res.send({express: "Express server connected to React!"});
    });

