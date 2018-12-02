import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';

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
    const location = this.props.navigation.state.params.location;
    console.log(location);
    const category = this.props.navigation.state.params.category;
    // Fetch Express Get route
    fetchVenues(location, category)
      .then((venue) => {
        // Generate 10 random indexes between [0, 50)
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

  
  
  // Probably should use button group instead for the buttons 

  render(){
    const { venues, currentIndex } = this.state;
    console.log(currentIndex);
    return (
      <View style={[styles.exampleContainer]}>
        <Carousel
          ref={c => this._carousel = c}
          data={venues}
          renderItem={({item, index}) => {
            return (
              <SliderEntry navigation={this.props.navigation} index={index} data={item} even={true}/>
            )
          }}
          sliderWidth={sliderWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          itemWidth={itemWidth}
          layout={'stack'}
          onSnapToItem={this.changeIndex}
        />

        <View style={stylesheet.buttonContainer}>
          <Button large onPress={() => { this._carousel.snapToNext(); }} fontSize={(Platform.OS === 'ios' ? 13 : 18)} titleStyle={stylesheet.buttonTitle} buttonStyle={stylesheet.buttonStyle} borderRadius={5} large title="NO"/>
          <Button large onPress={() => { 
            this.props.navigation.navigate('Map', {
              destination: venues[currentIndex].address,
            })}} fontSize={(Platform.OS === 'ios' ? 13 : 18)} titleStyle={stylesheet.buttonTitle} buttonStyle={stylesheet.buttonStyle} borderRadius={5} large title="GO!"/>
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
  },

  buttonStyle: {
    width: 170,
    height: 50,
  },

  buttonTitle: {
    fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
  }

})