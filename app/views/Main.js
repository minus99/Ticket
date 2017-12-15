import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Button, Image, Text } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';

import List from '../../app/views/List';
import Notifications from '../../app/views/Notifications';
import New from '../../app/views/New';
import Timesheet from '../../app/views/Timesheet';
import Settings from '../../app/views/Settings';

export default MainScreenNavigator = TabNavigator({
  List: { screen: List },
  Notifications: { screen: Notifications },
  New: { screen: New },
  Timesheet: { screen: Timesheet },
  Settings: { screen: Settings },
},
{
  lazy: true,
  tabBarOptions:{
    showLabel: false,
    inactiveTintColor: null,
    activeTintColor: "#5F00D8",
  }
});
