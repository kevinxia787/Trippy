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
    const destinationCoords = this.props.navigation.state.params.destintionCoords;

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