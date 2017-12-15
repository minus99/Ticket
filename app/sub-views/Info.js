import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  ScrollView,
} from 'react-native';

styles = require('../../app/styles');

import ListSheet from '../../app/components/ListSheet';
import ReadMoreText from '../../app/UI/ReadMoreText';

export default class InfoPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Taskssadas',
      headerRight: (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setParams({filters: true})}>
          <View style={styles.headerAccountButton}>
            <Text>Filter</Text>
          </View>
        </TouchableOpacity>
      ),
      //headerLeft: null,
      headerBackTitle: null,
      tabBarVisible: true,
    };
  };

  constructor(props){
    super(props);
    this.state = {

      mode: 'none',

    }
  }

  items = [{
    id: 'Ticket ID',
    name: 'EMS0004303438157',
  }, {
    id: 'Client',
    name: 'Vakkorama',
  }, {
    id: 'Project',
    name: 'Vakkorama App',
  }, {
    id: 'Status',
    name: 'In Progress',
  }, {
    id: 'Sprint',
    name: 'BE23_2808-2009',
  }, {
    id: 'Ticket Type',
    name: 'New request',
  }, {
    id: 'Account Manager',
    name: 'Zeynep Avcıkurt',
  }, {
    id: 'Estimated Time',
    name: '5 hours',
  }];

  render(){

    return(
      <View style={{flex:1, backgroundColor:"#7410E0"}}>
      <ScrollView style={{flex:1}}>
        <View style={{backgroundColor:"#7410E0", padding:20, paddingTop:30, paddingBottom:30}}>
          <Text style={styles.white}>
            EMS0004303438157
          </Text>
          <Text style={[styles.white, styles.large, styles.bold, {marginTop:10, marginBottom:10}]}>App redesign for iOS and Android and Desktop</Text>
          <Text style={[styles.white, styles.tiny]}>
            Posted on 15.10.2017 - 17:22
          </Text>
        </View>
        <View style={{backgroundColor:"#ffffff", padding:20}}>
        <ReadMoreText numberOfLines={5} more="READ MORE" less="LESS">
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ReadMoreText>
        </View>
        <ListSheet title="INFO" items={this.items} />
      </ScrollView>
      </View>
    )
  }
}
