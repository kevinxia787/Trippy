import React, { Component } from 'react';
import { CardViewWithIcon } from 'react-native-simple-card-view'

export default class Categories extends Component {
  render() {
    return (
      <CardViewWithIcon
        androidIcon={ 'md-bonfire' }
        iosIcon={ 'ios-bonfire-outline' }
        iconBgColor={ '#b13757' }
        iconColor={ '#FFFFFF' }
        title={ 'LOREM IPSUM' }
        content={ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }
      />
    )
  }
}