import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
// import { MapView } from 'expo';
import { fetchRoutes } from '../services/FetchRoute';
import { Button, Card } from 'react-native-elements';

import MapView, { Polyline, Marker } from 'react-native-maps';

export default class NextDestination extends Component {
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

    

    fetchRoutes(startLongLat, destLongLat)
      .then((res) => {
        let routeCoords = [];
        for (let i = 0; i < res.length; i++) {
          let tempObj = {};
          tempObj.latitude = res[i][0];
          tempObj.longitude = res[i][1];
          routeCoords.push(tempObj);
        }
        this.setState({routeCoords: routeCoords, initialRegion: this.getRegionForCoordinates(routeCoords) })
      }).catch((err) => {
        console.log(err);
      })
  }


  getRegionForCoordinates(points) {
    // points should be an array of { latitude: X, longitude: Y }
    let minX, maxX, minY, maxY;
  
    // init first point
    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);
  
    // calculate rect
    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });
  
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX) + 0.003;
    const deltaY = (maxY - minY) + 0.003;
  
    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  render() {
    const startCoords = this.props.navigation.state.params.startCoords;
    const destCoords = this.props.navigation.state.params.destinationCoords;
    const startAddress = this.props.navigation.state.params.startAddress;
    const destAddress = this.props.navigation.state.params.destination;
    let startLat = Number(startCoords.replace(/\s/g, "").split(",")[0]);
    let startLong = Number(startCoords.replace(/\s/g, "").split(",")[1]);
    let destLat = Number(destCoords.replace(/\s/g, "").split(",")[0]);
    let destLong = Number(destCoords.replace(/\s/g, "").split(",")[1]);
    const { routeCoords, initialRegion } = this.state;
    return (
      <View> 
        { (initialRegion !== undefined) ?
           <MapView style={{ alignSelf: 'stretch', height: (Platform.OS === 'ios') ? 250 : 350 }} initialRegion={(routeCoords !== undefined) ? this.getRegionForCoordinates(routeCoords) : initialRegion }> 
            {
              routeCoords !== undefined &&
              <Polyline 
                coordinates={routeCoords}
                strokeColor="#59bad1"
                strokeWidth={4}
              /> 
            }
            <Marker
              coordinate={{latitude: startLat, longitude: startLong}}
              title={"Start"}
              description={startAddress}
            />
            <Marker
              coordinate={{latitude: destLat, longitude: destLong}}
              title={"Destination"}
              description={destAddress}
            />
          </MapView> 
          
          
          
          : 
          <View styles={{justifyContent: 'center', alignItems: 'center'}}>
             <Text> Loading... </Text>
          </View>
         

        }
        <View style={stylesheet.buttonContainer}>
          <Button onPress={() => {
            this.props.navigation.navigate('Cards', {
              startLocation: this.props.navigation.state.params.destinationCoords,
              startAddress: this.props.navigation.state.params.destination,
              category: this.props.navigation.state.params.category,
              currentTrip: this.props.navigation.state.params.currentTrip,
            })
          }}
          large fontSize={(Platform.OS === 'ios' ? 13 : 18)} titleStyle={stylesheet.buttonTitle} buttonStyle={stylesheet.buttonStyle} borderRadius={5} title="Add POI"/>
          <Button onPress={() => {
            this.props.navigation.navigate('CurrentTrip', {
              currentTrip: this.props.navigation.state.params.currentTrip,
            })
          }} large fontSize={(Platform.OS === 'ios' ? 13 : 18)} titleStyle={stylesheet.buttonTitle} buttonStyle={stylesheet.buttonStyle} borderRadius={5} title="End Trip"/>
        </View> 

        <Card
          title='Current Destination'
          image={{uri: 'https://m.static.lagardere.cz/evropa2/image/2018/04/mc1.jpg'}}>
          <Text style={{marginBottom: 10}}>
            {destAddress}
          </Text>
        </Card>

      </View>
    )
  }
}

const stylesheet = StyleSheet.create({
  buttonContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    width: 170,
    height: 50,
  },

  buttonTitle: {
    fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
  }

})