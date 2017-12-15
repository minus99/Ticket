import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MultiSelect from 'react-native-multiple-select';
import Minus99MultipleSelect from '../../app/components/Minus99MultipleSelect';
import Minus99DatePicker from '../../app/components/Minus99DatePicker';
import TextButton from '../../app/UI/TextButton';
import FieldInput from '../../app/UI/FieldInput';

styles = require('../../app/styles');

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'New Ticket',
      headerLeft: null,
      headerRight: (
        <View style={{marginRight:15}}>
          <TextButton name="CREATE" callback={ () => state.params.handleFiltersPress() } />
        </View>
      ),
      headerLeft:null,
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => ( <View style={[styles.addNewTabIcon, {backgroundColor:tintColor ? "#ffffff" : "#5F00D8"}]}><Image source={require('../../assets/icons/new.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /></View> ),
    };
  };

  constructor(props){
    super(props);
    this.state = {

      mode: 'none',

    }
  }

  clients = [{
    id: '92iijs7yta',
    name: 'Ondo',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'This page also includes all available packages for download.',
  }, {
    id: '16hbajsabsd',
    name: 'Calabar',
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos',
  }];


  /* general functions - all your calculations */

  render(){

    //const { params } = this.props.navigation.state;
    //var bool = params.mode == true ? true : false;

    //var modal = <Filters onLogoutPressItem={this._callLogout} onClosePressItem={this._closeModal}  modalVisible={bool} />;


    /* functions that are triggered on each render - only simple rendertime logic */

    return(

      /* non logic only UI Components */
      <ScrollView style={{flex:1}}>
        <View style={styles.contentWrapper}>
          <FieldInput label="Title" />
          <FieldInput label="Description" />
          <Minus99MultipleSelect name="Person" items={this.clients} selected={[0, 2]} />
          <Minus99MultipleSelect name="Clients" items={this.clients} />
          <Minus99DatePicker name="From" value="2017-07-11T08:54:03.000Z" />
          <Minus99DatePicker name="To" />
        </View>
      </ScrollView>

    )
  }
}
