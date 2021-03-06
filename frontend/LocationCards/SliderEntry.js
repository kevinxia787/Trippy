import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from './SliderEntry.style';

export default class SliderEntry extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data: { illustration }, parallax, parallaxProps, even } = this.props;

        return parallax ? (
            <ParallaxImage
              source={{ uri: illustration }}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: illustration }}
              style={styles.image}
            />
        );
    }

    updateCurrentTrip = (name, dest, destLatLng, currentTrip) => {
      currentTrip.push({address: dest, destinationCoords: destLatLng, name: name})
      return currentTrip;
    }

    // Here we handle adding location to the map (TODO)

    render () {
        const { data: { name, address, latLng }, currentTrip } = this.props;
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => {
                this.props.navigation.navigate('Map', {
                  destination: address,
                  destinationCoords: latLng,
                  startCoords: this.props.navigation.state.params.startLocation,
                  startAddress: this.props.navigation.state.params.startAddress,
                  category: this.props.navigation.state.params.category,
                  currentTrip: this.updateCurrentTrip(name, address, latLng, currentTrip),
                })
              }}
              >
                <View style={styles.shadow} />
                <View style={styles.imageContainer}>
                    { this.image }
                    <View style={styles.radiusMask} />
                </View>
                <View style={styles.textContainer}>
                    <Text>
                      {name}
                    </Text>

                    <Text
                      style={styles.subtitle}
                      numberOfLines={2}
                    >
                        { address }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}