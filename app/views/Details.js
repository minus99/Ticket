import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

styles = require('../../app/styles');
import Minus99HorizontalTabs from '../../app/components/Minus99HorizontalTabs';
import TextButton from '../../app/UI/TextButton';
import IconButton from '../../app/UI/IconButton';

import InfoPage from        '../../app/sub-views/Info';
import MessagesPage from    '../../app/sub-views/Messages';
import SubTicketsPage from  '../../app/sub-views/SubTickets';
import DocsPage from        '../../app/sub-views/Docs';
import LogsPage from        '../../app/sub-views/Logs';
import ServicesPage from    '../../app/sub-views/Services';
import TimesheetPage from    '../../app/sub-views/Timesheet';

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Task '+ navigation.state.params.user,
      headerRight: (
        <View style={{flexDirection:"row"}}>
        <View style={{marginRight:5}}>
          <IconButton icon={ <Image source={require("../../assets/icons/bell.png")} style={styles.iconNormalSize} /> } callback={this._clearAll} />
        </View>
        <View style={{marginRight:5}}>
          <IconButton icon={ <Image source={require("../../assets/icons/ok.png")} style={styles.iconNormalSize} /> } callback={this._clearAll} />
        </View>
        </View>
      ),
      headerBackTitle: null,
      headerTintColor: "#7410E0",
    };
  };

  constructor(props){
    super(props);
    this.state = {

      mode: 'none',
      currentPage: 'info',

    }
  }

  DetailsPageNavigator = TabNavigator(
  {
    Info: { screen: InfoPage, initialRouteName: "INFORMATION" },
    Comments: { screen: MessagesPage },
    SubTickets: { screen: SubTicketsPage },
    Docs: { screen: DocsPage },
    Logs: { screen: LogsPage },
    Services: { screen: ServicesPage },
    Timesheet: { screen: TimesheetPage },
  },
  {
    tabBarComponent: CustomTabs,
    tabBarPosition: 'top',
    lazy: true,
    tabBarOptions:{
      showLabel: true,
      inactiveTintColor: null,
      activeTintColor: "#5F00D8",
    }
  });

  render(){
    return(
      <View style={{flex:1}}>
        <this.DetailsPageNavigator />
      </View>
    )
  }
}

class CustomTabs extends React.Component {

  jumpToIndex = this.props.jumpToIndex;

  _onTabsPress = ( obj, index ) => {
    this.jumpToIndex( index );
  }

  tabs = [
    {name:"INFO", id:"info"},
    {name:"COMMENTS(42)", id:"comments"},
    {name:"SUB TICKETS", id:"subtickets"},
    {name:"DOCS(3)", id:"docs"},
    {name:"LOGS", id:"logs"},
    {name:"SERVICES", id:"services"},
    {name:"TIMESHEET", id:"timesheet"}
  ];

  render(){
    return(

      <Minus99HorizontalTabs items={this.tabs} selected={"info"} callback={this._onTabsPress} />

    );
  }
};
