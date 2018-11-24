import React, { Component } from 'react';
import { View, Platform, StyleSheet, Alert } from 'react-native';

import { fetchVenues } from '../services/FetchVenues'
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';

import styles from './LocationCards.style';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import { Button, ButtonGroup } from 'react-native-elements';

export default class LocationCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      location: "40.730610%2C%20-73.935242",
      currentIndex: 0,
    }
  }
  static navigationOptions = {
    title: "Locations",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  componentDidMount() {
    const { location } = this.state;
    const category = this.props.navigation.state.params.category;
    console.log("category: ", category);
    // Fetch Express Get route
    fetchVenues(location, category)
      .then((venue) => {
        // Generate 10 random indexes between [0, 50)
        console.log('venue length', venue.length);
        var venueEntry = [];
        var randomIndex = [];
        for (let i = 0; i < 10; i++) {
          let tempIndex = Math.floor(Math.random() * (venue.length - 0) + 0);
          randomIndex.push(tempIndex);
        }

        // Utilize 10 random indexes and grab venues

        for (let i = 0; i < randomIndex.length; i++) {
          let tempObj = {};
          let entry = venue[randomIndex[i]];
          tempObj.name = entry.name;
          tempObj.id = entry.Id;
          tempObj.address = entry.address[0] + "\n" + entry.address[1] + "\n" + entry.address[2];
          tempObj.latLng = entry.latitude + "%2C%20" + entry.longitude;
          tempObj.illustration = 'https://m.static.lagardere.cz/evropa2/image/2018/04/mc1.jpg';
          venueEntry.push(tempObj);
        }
        this.setState({venues: venueEntry});
      }).catch((err) => {
        console.log(err);
      })

  }

  changeIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }

  renderItem ({item, index}) {
    return (
      <SliderEntry index={index} data={item} navigation={this.props.navigation} even={true} />
    )
  }
  
  
  // Probably should use button group instead for the buttons 

  render(){
    const { venues, currentIndex } = this.state;
    console.log(currentIndex);
    console.log(venues);
    return (
      <View style={[styles.exampleContainer]}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={venues}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          itemWidth={itemWidth}
          layout={'stack'}
          onSnapToItem={this.changeIndex}
        />

        <View style={stylesheet.buttonContainer}>
          <Button onPress={this.getCurrentCarouselItem} buttonStyle={stylesheet.buttonStyle} borderRadius={5} large title="NO"/>
          <Button buttonStyle={stylesheet.buttonStyle} borderRadius={5} large title="GO!"/>
        </View>

      </View>
      
    )
  }
}


const stylesheet = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },

  buttonStyle: {
    width: 170,
    height: 50
  }

})