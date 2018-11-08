import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Cards from './Cards/Cards';
import Landing from './Landing/Landing';

// export default class App extends React.Component {
//   render() {
//     return(
//       <View style={{backgroundColor: "#e8e8e8", height: '100%'}}>
//         <Landing/>
//       </View>
//     )
//   }
// }

const App = createStackNavigator({
  Home: {screen: Landing} 
})

export default App;





