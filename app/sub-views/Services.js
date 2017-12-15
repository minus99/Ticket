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

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Timesheet',
      headerLeft: null,
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => ( <Image source={require('../../assets/icons/timesheet.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /> ),
    };
  };

  constructor(props){
    super(props);
    this.state = {

      mode: 'none',

    }
  }

  /* general functions - all your calculations */

  render(){

    //const { params } = this.props.navigation.state;
    //var bool = params.mode == true ? true : false;

    //var modal = <Filters onLogoutPressItem={this._callLogout} onClosePressItem={this._closeModal}  modalVisible={bool} />;


    /* functions that are triggered on each render - only simple rendertime logic */

    return(

      /* non logic only UI Components */

      <Text>Services</Text>
    )
  }
}
