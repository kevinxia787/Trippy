import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform } from 'react-native';
import { CardViewWithIcon } from 'react-native-simple-card-view'
import Swiper from 'react-native-swiper';


import IconFA from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

export default class CategoryMenu extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "Categories",
    headerTitleStyle: {
      fontWeight: 'normal',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }

  render() {
    return (
      <Swiper>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'food',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide1}>
          <View style={styles.center}>
            <Material name="food" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Food</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'drinks',
            location: this.props.navigation.state.params.location
          })
        }}
          style={styles.slide2}>
          <View style={styles.center}>
            <Entypo name="drink" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Drink</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'sights',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide3}>
          <View style={styles.center}>
            <Material name="binoculars" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Sights</Text>
          </View>
        </TouchableHighlight >
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'shops',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide4}>
          <View style={styles.center}>
            <Entypo name="shopping-cart" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Shopping</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'outdoors',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide5}>
          <View style={styles.center}>
            <IconFA name="tree" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Outdoors</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'arts',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide6}>
          <View style={styles.center}>
            <IconFA name="paint-brush" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Arts</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'trending',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide7} >
          <View style={styles.center}>
            <Feather name="trending-up" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Trending</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
          this.props.navigation.navigate('Cards', {
            category: 'topPicks',
            location: this.props.navigation.state.params.location
          })
        }} style={styles.slide8} >
          <View style={styles.center}>
            <Entypo name="trophy" size={100} color="#fff"/>
            <Text style={{color: '#FFF'}}>Top Picks</Text>
          </View>
        </TouchableHighlight>
      </Swiper>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
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
    backgroundColor: '#D63230'
  },
  slide2: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#39A9DB'
  },
  slide3: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#F39237'
  },
  slide4: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9C80E'
  },
  slide5: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#5FAD56'
  },
  slide6: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#6457A6'
  },
  slide7: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#29339B'
  },
  slide8: {
    flex: 1, 
    justifyContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#736CED'
  },
})
