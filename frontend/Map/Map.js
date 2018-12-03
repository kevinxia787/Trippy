import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
// import { MapView } from 'expo';
import { fetchRoutes } from '../services/FetchRoute';

import MapView, { Polyline } from 'react-native-maps';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeCooords: [],
    }
  }
  
  static navigationOptions = {
    title: "Map View",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  componentDidMount() {
    const destinationCoords = this.props.navigation.state.params.destinationCoords;
    const startCoords = this.props.navigation.state.params.startCoords;

    

    // Add the current POI to list of locations visited on this current trip

    let tripUpdate = (this.props.navigation.state.params.currentTrip !== undefined) ? this.props.navigation.state.params.currentTrip : [];

    tripUpdate.push({address: this.props.navigation.state.params.address, coords: destinationCoords})

    // Reformat above to lat and long values
    let startCoordsSplit = startCoords.replace(/\s/g, "").split(",");
    let destCoordsSplit = destinationCoords.replace(/\s/g, "").split(",")

    let startLatitude = startCoordsSplit[0];
    let startLongitude = startCoordsSplit[1];

    let destLatitude = destCoordsSplit[0];
    let destLongitude = destCoordsSplit[1];

    // Use longlat values to get route between start and dest;

    let startLongLat = startLongitude + "," + startLatitude;
    let destLongLat = destLongitude + "," + destLatitude;

    // use fetchRoute service here, todo

    console.log(startLongLat);
    console.log(destLongLat);

    fetchRoutes(startLongLat, destLongLat)
      .then((res) => {
        let routeCoords = [];
        for (let i = 0; i < res.length; i++) {
          let tempObj = {};
          tempObj.latitude = res[i][0];
          tempObj.longitude = res[i][1];
          routeCoords.push(tempObj);
        }
        this.setState({routeCoords: routeCoords, currentTrip: tripUpdate })
      }).catch((err) => {
        console.log(err);
      })



  }

  render() {
    const startCoords = this.props.navigation.state.params.startCoords;
    let lat = Number(startCoords.replace(/\s/g, "").split(",")[0]);
    let long = Number(startCoords.replace(/\s/g, "").split(",")[1]);
    const { routeCoords } = this.state;
    console.log(routeCoords);
    return (
      <View> 
        <MapView style={{ alignSelf: 'stretch', height: 300 }} 
          initialRegion={{ 
            latitude: lat, 
            longitude: long, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421, 
          }} 
        > 
          <Polyline 
            coordinates={routeCoords}
            strokeColor="#000"
            strokeWidth={4}
          />
        </MapView>
        
        
        <Text>{this.props.navigation.state.params.destinationCoords}</Text>
        <Text>{this.props.navigation.state.params.startCoords}</Text>
      </View>
    )
  }
}