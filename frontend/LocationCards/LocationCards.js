import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform} from 'react-native';

import Swiper from 'react-native-swiper';


export default class LocationCards extends Component {

  static navigationOptions = {
    title: "Locations",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  componentDidMount() {
  }

  render(){
    console.log(this.props.navigation.state.params);
    return (
      <Swiper dot={<View style={{opacity:0}}/>} activeDot={<View style={{opacity: 0}}/>} showsButtons={false}>
        <TouchableHighlight>
          <View>
            <Text>{this.props.navigation.state.params.category}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View>
            <Text>{this.props.navigation.state.params.location}</Text>
          </View>
        </TouchableHighlight>
      </Swiper>
    );
  }
}
