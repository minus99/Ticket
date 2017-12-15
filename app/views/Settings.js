import React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { ImagePicker } from 'expo';

styles = require('../../app/styles');

import TextButton from '../../app/UI/TextButton';
import BoxButton from '../../app/UI/BoxButton';
import ListSheet from '../../app/components/ListSheet';
import FieldInput from '../../app/UI/FieldInput';

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Settings',
      headerRight: (
        <View style={{marginRight:15}}>
          <TextButton name="LOGOUT" callback={ () => state.params.handleFiltersPress() } />
        </View>
      ),
      headerLeft: null,
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => ( <Image source={require('../../assets/icons/settings.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /> ),
    };
  };

  constructor(props){
    super(props);
    this.state = {

      editMode: false,
      image: 'https://en.gravatar.com/userimage/131848358/a3762586fbf07a294be21195e2aecde7.jpg?size=200',

    }
  }

  _toggleEditMode = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  items = [{
    id: 'Phone',
    name: '+90 555 555 5555',
  }, {
    id: 'E-mail',
    name: 'lucille@minus99.com',
  }];

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: 'Images',
    });

    if(!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  _renderEditMode = () => {
    return(
      <View style={{padding:20}}>
        <View style={{marginBottom:10}}>
        <BoxButton boxColor="#ffffff" textColor="#5F00D8" name="CHANGE PHOTO" callback={this._pickImage} />
        </View>
        <FieldInput label="Name" />
        <FieldInput label="Job Title" />
        <Text style={[styles.small]}>To make changes in the fields below, please contact your administrator.</Text>
      </View>
    );
  }

  _renderViewMode = (image) => {
    return(
      <View style={{ alignItems:'center', padding:30}}>
        <Image source={{uri:image}} style={{backgroundColor:'#dddddd', width:90, height:90, borderRadius:45, marginBottom:15}} />
        <Text style={[styles.large]}>Alaa Alnuaimi</Text>
        <Text style={[styles.normal, styles.lightColor]}>Art Director</Text>
      </View>
    );
  }

  render(){

    let { image, editMode } = this.state;

    let profile = editMode ? this._renderEditMode() : this._renderViewMode(image);

    return(
      <ScrollView style={{flex:1}}>
        {profile}
        <ListSheet items={this.items} />
        <View style={{marginTop:10}}>
          <BoxButton boxColor="#ffffff" textColor="#5F00D8" name={editMode ? "SAVE CHANGES" : "EDIT PROFILE"} callback={this._toggleEditMode} />
        </View>
      </ScrollView>
    )
  }
}
