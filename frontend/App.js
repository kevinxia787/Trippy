import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Cards from './Cards/Cards';
import Landing from './Landing/Landing';
import CategoryMenu from './CategoryMenu/CategoryMenu';
import LocationCards from './LocationCards/LocationCards';

const App = createStackNavigator({
  Home: {screen: Landing},
  Categories: {screen: CategoryMenu},
  Cards: {screen: LocationCards}
})


export default App;





