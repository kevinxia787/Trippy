import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';

import { fetchVenues } from '../services/FetchVenues'
import Carousel from 'react-native-snap-carousel';
import SliderEntry from './SliderEntry';

import styles from './LocationCards.style';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import { Button, ButtonGroup } from 'react-native-elements';
import { fetchLatLng } from '../services/FetchLatLng';

export default class LocationCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      currentIndex: 0,
      currentTrip: [],
      counter: 0,
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

  componentWillReceiveProps() {
    const location = this.props.navigation.state.params.startLocation;
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
          tempObj.latLng = entry.latitude + "," + entry.longitude;
          tempObj.illustration = 'https://m.static.lagardere.cz/evropa2/image/2018/04/mc1.jpg';
          venueEntry.push(tempObj);
        }
        this.setState({venues: venueEntry, counter: this.state.counter + 1});
      }).catch((err) => {
        console.log(err);
      })
  }

  componentDidMount() {
    
    const location = this.props.navigation.state.params.startLocation;
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
          tempObj.latLng = entry.latitude + "," + entry.longitude;
          tempObj.illustration = 'https://m.static.lagardere.cz/evropa2/image/2018/04/mc1.jpg';
          venueEntry.push(tempObj);
        }
        this.setState({venues: venueEntry, counter: this.state.counter + 1});
      }).catch((err) => {
        console.log(err);
      })

  }

  changeIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }

  updateCurrentTrip = (name, dest, destLatLng, currentTrip) => {
    currentTrip.push({address: dest, destinationCoords: destLatLng})
    return currentTrip;
  }

  render(){
    const { venues, currentIndex, currentTrip } = this.state;
    // currentTrip.push({address: venues[currentIndex].address, destinationCoords: venues[currentIndex].latLng, name: venues[currentIndex].name})
    
    return (
      <View style={[styles.exampleContainer]}>
        <Carousel
          ref={c => this._carousel = c}
          data={venues}
          renderItem={({item, index}) => {
            return (
              <SliderEntry navigation={this.props.navigation} currentTrip={currentTrip} index={index} data={item} even={true}/>
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
          <Button large onPress={() => { this._carousel.snapToNext(); }} fontSize={(Platform.OS === 'ios' ? 13 : 18)} backgroundColor={'#59BAD1'} color={'white'} titleStyle={stylesheet.buttonTitle} buttonStyle={stylesheet.buttonStyle1} large title="NO"/>
          <Button large onPress={() => { 
            this.props.navigation.navigate('Map', {
              destination: venues[currentIndex].address,
              destinationCoords: venues[currentIndex].latLng,
              startCoords: this.props.navigation.state.params.startLocation,
              startAddress: this.props.navigation.state.params.startAddress,
              category: this.props.navigation.state.params.category,
              currentTrip: this.updateCurrentTrip(venues[currentIndex].name,venues[currentIndex].address, venues[currentIndex].latLng, currentTrip)
            })}} fontSize={(Platform.OS === 'ios' ? 13 : 18)} titleStyle={stylesheet.buttonTitle} backgroundColor={'white'} color={'#59BAD1'} buttonStyle={stylesheet.buttonStyle2} large title="GO!"/>
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

  buttonStyle1: {
    width: 190,
    height: 50,
    marginRight: -15,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: '#59BAD1',
    borderWidth: 1
  },

  buttonStyle2: {
    width: 190,
    height: 50, 
    marginLeft: -15,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: '#59BAD1',
    borderWidth: 1,

  },

  buttonTitle: {
    fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
  }

})