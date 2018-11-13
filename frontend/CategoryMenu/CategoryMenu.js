import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Platform } from 'react-native';
import { CardViewWithIcon } from 'react-native-simple-card-view'

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
      <View style={styles.container}>
        <TouchableHighlight style={styles.card}>
          <View>
            <IconFA name="food" size={50} color="#000"/>
            <Text>Food/Drink</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.card}>
          <View>
            <IconFA name="binoculars" size={50} color="#000"/>
            <Text>Sights</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.card}>
          <View>
            <IconFA name="shopping" size={50} color="#000"/>
            <Text>Shopping</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.card}>
          <View style={{alignItems: 'center'}}>
            <IconFA name="tree" size={50} color="#000"/>
            <Text>Outdoors</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.card}>
          <View>
            <IconFA name="brush" size={50} color="#000"/>
            <Text>Arts</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.card}>
          <View>
            <IconFA name="help" size={50} color="#000"/>
            <Text>Random</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  card: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#DDDDDD",
    padding: 5,
    margin: 5,
    width: '45%',
    height: '32%',
    borderRadius: 5,
  },
  card2: {
    alignItems: 'center', 
    backgroundColor: "#DDDDDD",
    padding: 5,
    margin: 5,
    width: '45%',
    height: '30%',
  }
})
