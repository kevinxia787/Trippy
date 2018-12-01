import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Landing from './Landing/Landing';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import LocationCards from './LocationCards/LocationCards';
import Map from './Map/Map';

const App = createStackNavigator({
  Home: {screen: Landing},
  Categories: {screen: CategoryMenu},
  Cards: {screen: LocationCards},
  Map: {screen: Map}
})


export default App;





