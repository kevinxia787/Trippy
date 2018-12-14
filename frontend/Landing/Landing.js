import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform, Image, ImageBackground} from 'react-native';
import { Button } from 'react-native-elements';


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  
  
  static navigationOptions = {
    headerTitle: (
      <Image style={{alignSelf: 'center'}} source={require("../assets/images/logo.png")} />
    ),
  }
  render() {
    return (
      <ImageBackground blurRadius={1} source={require("../assets/images/homepage.jpg")} style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: 'rgba(0,0,0,0.3)', flex: 1}} > 
          <Text style={styles.introText}>Where are you traveling today?</Text>
          <View style={{border: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Enter your location!"
              onChangeText={ (text) => this.setState({text})}
            /> 
            <Button 
              onPress={() =>{
                this.props.navigation.navigate('Categories', {
                  location: this.state.text,
                })
              }} textStyle={{textAlign: 'right', fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal'}} color="white" buttonStyle={styles.button} title='Start Trip!'/>
          </View>
          <View style={{margin: 30, paddingTop: 100}}>
            <Image source={require("../assets/images/graphic.png")} style={{width: 350, height: 184}}/>
          </View>
          
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  introText: {
    fontSize: 30,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 20,
    fontFamily: (Platform.OS === 'ios') ? 'Arial' : 'Roboto',
    color: '#59BAD1'
  },
  input: {
     margin: 50,
     width: '95%',
     height: 50,
     backgroundColor: '#fff',
     borderColor: '#fff',
     borderWidth: 1,
     borderRadius: 5,
  },
  button: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#52b7ea',
    marginLeft: 87,
  },
  text: {
    fontSize: 24,
    alignItems: 'center',
    marginTop: (Platform.OS === 'android') ? -10000 : 0,
  }
})