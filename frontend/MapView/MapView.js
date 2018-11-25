import React, { Component } from 'react';

import { View, Text, Platform } from 'react-native';

export default class MapView extends Component {
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

  render() {
    return (
      <View>
        <Text>{this.props.navigation.state.params.destination}</Text>
      </View>
    )
  }
}