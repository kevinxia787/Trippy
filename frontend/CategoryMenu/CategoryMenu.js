import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform, ImageBackground } from 'react-native';
import { fetchLatLng } from '../services/FetchLatLng'
import { Grid, Row, Col } from 'react-native-easy-grid';

import Swiper from 'react-native-swiper';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default class CategoryMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latLng: '',
    }
  }
  
  static navigationOptions = {
    title: "Categories",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  // Call the geocoding api here to convert this.state.latLng to lat lng
  componentDidMount() {
    const address = this.props.navigation.state.params.location;
    fetchLatLng(address)
      .then((result) => {
        let lat = result.lat;
        let lng = result.lng;
        let latlng = lat + ', ' + lng;
        this.setState({latLng: latlng});
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {latLng } = this.state;
    return (
      <Grid>
        <Row>
          <View style={{width: '50%'}}>
            <TouchableHighlight style={{borderRadius: 10}} onPress={() => {
                this.props.navigation.navigate('Cards', {
                  category: 'food',
                  startLocation: latLng,
                  startAddress: this.props.navigation.state.params.location,
                })
              }}>
              <ImageBackground source={require('../assets/images/food.jpg')} style={{tintColor: 'black', borderRadius: 10, width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Food</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
            
            
          </View>
          
          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'drinks',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }}
              style={styles.slide2}>
              <ImageBackground source={require('../assets/images/drinks.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Drinks</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </View>
        </Row>
        <Row>
           <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'sights',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide3}>
              <ImageBackground source={require('../assets/images/sights.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Sights</Text>
                </View>
              </ImageBackground>

            </TouchableHighlight >
          </View>
          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'shops',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide4}>
               <ImageBackground source={require('../assets/images/shopping.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Shopping</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </View>
        </Row>
        <Row>
          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'outdoors',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide5}>
               <ImageBackground source={require('../assets/images/outdoor.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Outdoors</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </View>

          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'arts',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide6}>
               <ImageBackground source={require('../assets/images/arts.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Arts</Text>
                </View> 
              </ImageBackground>
            </TouchableHighlight>
          </View>
          
        </Row>
        <Row>
          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'topPicks',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide8} >
               <ImageBackground source={require('../assets/images/toppicks.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Top Picks</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </View>
        
          <View style={{width: '50%'}}>
            <TouchableHighlight onPress={() => {
              this.props.navigation.navigate('Cards', {
                category: 'trending',
                startLocation: latLng,
                startAddress: this.props.navigation.state.params.location,
              })
            }} style={styles.slide7} >
               <ImageBackground source={require('../assets/images/trending.jpg')} style={{width: '100%', height: '100%'}}>
                <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} > 
                  <Text style={styles.text}>Trending</Text>
                </View>
              </ImageBackground>
            </TouchableHighlight>
          </View>
        </Row>
      </Grid>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },  
  text: {
    color: 'white',
    margin: 5,
    fontSize: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D63230',
  },
  slide2: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39A9DB'
  },
  slide3: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F39237'
  },
  slide4: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9C80E'
  },
  slide5: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5FAD56'
  },
  slide6: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6457A6'
  },
  slide7: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29339B'
  },
  slide8: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#736CED'
  },
})
