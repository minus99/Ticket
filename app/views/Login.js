import React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

styles = require('../../app/styles');

import BoxButton from '../../app/UI/BoxButton';
import IconButton from '../../app/UI/IconButton';
import FieldInput from '../../app/UI/FieldInput';

import Minus99Timer from '../../app/components/Minus99Timer';

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Login',
      //header:null,
      headerLeft: null,
      headerBackTitle: null,
    };
  };

  constructor(props){
    super(props);
    this.state = {

      mode: 'none',

    }
  }

  render(){

    return(

      <View style={{flex:1}}>
        <View style={styles.contentWrapper}>
          <View style={{marginBottom:30, alignItems:'center'}}>
            <Text style={[styles.xlarge]}>Welcome</Text>
          </View>
          <FieldInput label="Username" />
          <FieldInput label="Password" />
          <BoxButton
            callback={() => this.props.navigation.navigate('Home')}
            name="LOGIN"
          />
        </View>
      </View>
    )
  }
}
