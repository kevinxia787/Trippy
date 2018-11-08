import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform} from 'react-native';
import { Button } from 'react-native-elements';


// fonts
import { sanFranciscoWeights, robotoWeights } from 'react-native-typography'


export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }
  
  static navigationOptions = {
    title: "Trippy",
    headerTitleStyle: {
      fontWeight: 'normal',
      textAlign: 'center',
      flex: 1,
      fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal',
    }
  }
  render() {
    return (
      <View>
        <View style={{border: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter your location!"
            onChangeText={ (text) => this.setState({text})}
          /> 
          <Button textStyle={{textAlign: 'right', fontFamily: (Platform.OS === 'ios') ? 'Avenir' : 'normal'}} color="white" buttonStyle={styles.button} title='GO'/>
          
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
  },
  button: {
    position: 'absolute',
    borderRadius: 5,
    backgroundColor: '#52b7ea',
    marginLeft: 144,
  },
  text: {
    fontSize: 24,
    alignItems: 'center',
    marginTop: (Platform.OS === 'android') ? -10000 : 0,
  }
})