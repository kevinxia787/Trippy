import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Cards from './Cards/Cards';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Cards></Cards>
      </View>
    );
  }
}
