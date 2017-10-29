import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ListPage from './app/List';

const Ticket = StackNavigator(
  {
    List: {
      screen: ListPage,
    }
  },
  {
    cardStyle: {
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      backgroundColor: '#F6F7F7',
      elevation: 0,
    }
  }
);

export default Ticket;
