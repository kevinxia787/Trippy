import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import { Header, Button } from 'react-native-elements';
import { Font } from 'expo';


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      text: '',
    }
  }
  async componentDidMount() {
    await Font.loadAsync({
      'montserrat': require('../assets/fonts/Montserrat-Regular.ttf')
    });
    this.setState({loading: false});
  }
  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <View>
          <Text> Loading... </Text>
        </View>
      )
    }
    return (
      <View>
        <Header 
          centerComponent = {{text: "Trippy", style: styles.text}}
          outerContainerStyles={{
            backgroundColor:"#fff",
            justifyContent: 'space-around',
            marginTop: (Platform.OS === 'android') ? 23 : 0,
          }}
        />
        <View style={{border: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter your location!"
            onChangeText={ (text) => this.setState({text})}
          /> 
          <Button textStyle={{textAlign: 'right', fontFamily: 'montserrat'}} color="white" buttonStyle={styles.button} title='GO'/>
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
     margin: 50,
     width: '95%',
     height: 50,
     backgroundColor: '#fff',
     borderColor: '#fff',
     borderWidth: 1,
     borderRadius: 5,
     fontFamily: 'montserrat',
  },
  button: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#52b7ea',
    marginLeft: 144,
  },
  text: {
    fontFamily: 'montserrat',
    fontSize: 24,
    alignItems: 'center',
    marginTop: (Platform.OS === 'android') ? -10000 : 0,
  }
})