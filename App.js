import React from 'react';
import { Platform, StatusBar, StyleSheet, Button, Image, Text } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Login from './app/views/Login';
import Home from './app/views/Main';
import Details from './app/views/Details';

const Happy = StackNavigator({
  Login: {
    screen: Login,
  },
  Home: {
    screen: Home,
    params:{
      timer:false,
    }
  },
  Details: {
    screen: Details,
  },
},
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      backgroundColor: '#F6F7F7',
      elevation: 0,
    }
  }
);

export default Happy;
