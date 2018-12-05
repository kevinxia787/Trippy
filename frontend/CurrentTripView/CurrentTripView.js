import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';


export default class CurrentTripView extends Component {
  
  render() {
    const currentTrip = this.props.navigation.state.params.currentTrip;
    console.log(this.props.navigation.state.params.currentTrip)
    return (
      <Card title="Destinations">
        {
          currentTrip.map((u, i) => {
            return (
              <View key={i}>
                <Image
                  resizeMode="cover"
                  source={{ uri: 'https://m.static.lagardere.cz/evropa2/image/2018/04/mc1.jpg'}}
                />
                <Text>{u.name}</Text>
              </View>
            );
          })
        }
      </Card>
    )
  }
}