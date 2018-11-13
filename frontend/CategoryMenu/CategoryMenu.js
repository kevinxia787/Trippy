import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform } from 'react-native';
import { CardViewWithIcon } from 'react-native-simple-card-view'
import Swiper from 'react-native-swiper';


import IconFA from 'react-native-vector-icons/MaterialCommunityIcons';

export default class CategoryMenu extends Component {
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
        <TouchableHighlight style={styles.slide1}>
          <View style={styles.center}>
            <IconFA name="food" size={100} color="#000"/>
            <Text>Food/Drink</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.slide2}>
          <View style={styles.center}>
            <IconFA name="binoculars" size={100} color="#000"/>
            <Text>Sights</Text>
          </View>
        </TouchableHighlight >
        <TouchableHighlight style={styles.slide3}>
          <View style={styles.center}>
            <IconFA name="shopping" size={100} color="#000"/>
            <Text>Shopping</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.slide4}>
          <View style={styles.center}>
            <IconFA name="tree" size={100} color="#000"/>
            <Text>Outdoors</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.slide5}>
          <View style={styles.center}>
            <IconFA name="brush" size={100} color="#000"/>
            <Text>Arts</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.slide6} >
          <View style={styles.center}>
            <IconFA name="help" size={100} color="#000"/>
            <Text>Random</Text>
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
  }
})
