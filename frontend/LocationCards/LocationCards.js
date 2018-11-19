import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Platform} from 'react-native';

import Swiper from 'react-native-swiper';

import { fetchVenues } from '../services/FetchVenues'

export default class LocationCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      location: "40.730610%2C%20-73.935242"
    }
  }

  componentDidMount() {
    const { location } = this.state;
    const category = this.props.navigation.state.params.category;
    console.log("category: ", category);
    fetchVenues(location, category)
      .then((res) => {
        this.setState({venues: res})
      }).catch((err) => {
        console.log(err);
      })
  }

  static navigationOptions = {
    title: "Locations",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  

  render(){
    const { venues } = this.state;
    return (
      <Swiper dot={<View style={{opacity:0}}/>} activeDot={<View style={{opacity: 0}}/>} showsButtons={false}>
        {venues.map(venues => {
          return (
            <TouchableHighlight key={venues.Id}>
              <Text>{venues.name}</Text>
            </TouchableHighlight>
          )
        })}
      </Swiper>
    );
  }
}
