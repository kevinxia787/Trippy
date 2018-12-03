import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { MapView } from 'expo';


export default class Map extends Component {
  constructor(props) {
    super(props);
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

    let tripUpdate = (this.props.navigation.state.params.currentTrip !== null) ? this.props.navigation.state.params.currentTrip : [];

    tripUpdate.push({address: this.props.navigation.state.params.address, coords: destinationCoords})

    // Reformat above to lat and long values
    let startCoordsSplit = startCoords.split(",");
    let destCoordsSplit = destinationCoords.split(",")

    let startLatitude = startCoordsSplit[0];
    let startLongitude = startCoordsSplit[1];

    let destLatitude = destCoordsSplit[0];
    let destLongitude = destCoordsSplit[1];

    // Use longlat values to get route between start and dest;

    let startLongLat = startLongitude + "," + startLatitude;
    let destLongLat = destLongitude + "," + destLatitude;




  }

  render() {
    return (
      <View> 
        <MapView style={{ alignSelf: 'stretch', height: 300 }} 
          initialRegion={{ 
            latitude: 37.78825, 
            longitude: -122.4324, 
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421, 
          }} 
        /> 
        <Text>{this.props.navigation.state.params.destinationCoords}</Text>
        <Text>{this.props.navigation.state.params.startCoords}</Text>
      </View>
    )
  }
}