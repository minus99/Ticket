import React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SecureStore } from 'expo';
import { StackNavigator } from 'react-navigation';

styles = require('../../app/styles');

import BoxButton from '../../app/UI/BoxButton';
import IconButton from '../../app/UI/IconButton';
import FieldInput from '../../app/UI/FieldInput';

import Minus99Timer from '../../app/components/Minus99Timer';
import Minus99Picker from '../../app/components/Minus99Picker';

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
      needsLoginInformation: false,
      user: null,
      pass: null,

    }
  }

  componentDidMount(){
    this._getAsyncData();
  }

  _getAsyncData = async () => {
    console.log("async");
    try {
      const value = await Expo.SecureStore.getItemAsync('ticketLoginInfo');
      if (value != undefined){
        // We have data!!
        console.log("value:", value);
      }
      else{
        this.setState({needsLoginInformation: true});
      }
    } catch (error) {
      console.log(error);
    }
  }

  _setAsyncData = async () => {
    try {
      await Expo.SecureStore.setItemAsync('ticketLoginInfo', this.state.user + "|" + this.state.pass);
    } catch (error) {
      console.log(error);
    }
  }

  _onLoginPress = () => {

    this._setAsyncData();

    //console.log("https://ticket.proj-e.com/login.aspx?user=" + this.state.user + "&pass=" + this.state.pass);

    //this.props.navigation.navigate('Home');
  }

  _onChangeUserText = ( text ) => {
    this.setState({user: text});
  }

  _onChangePassText = ( text ) => {
    this.setState({pass: text});
  }

  render(){

    const form = this.state.needsLoginInformation ?
                ( <View>
                      <FieldInput label="Username" onChangeText={this._onChangeUserText} />
                      <FieldInput label="Password" onChangeText={this._onChangePassText} />
                      <BoxButton
                          callback={this._onLoginPress}
                          name="LOGIN"
                          />
                   </View> ) : <ActivityIndicator size="large" /> ;

    return(

      <View style={{flex:1}}>
        <View style={styles.contentWrapper}>
          <View style={{marginBottom:30, alignItems:'center'}}>
            <Text style={[styles.xlarge]}>Welcome</Text>
          </View>

          {form}

        </View>
      </View>
    )
  }
}
