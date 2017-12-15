import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';

styles = require('../../app/styles');

import BoxButton from '../../app/UI/BoxButton';
import Minus99Tabs from '../../app/components/Minus99Tabs';

export default class TeamMessages extends React.Component {

  state = {
    messages: [],
    showConfirmation: false,
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
          },
        },
      ],
    });
  }

  _onOpenActionSheet = () => {
    this.setState({showConfirmation: true});
  };

  _onSendConfirmation = () => {
    this.setState({showConfirmation: false});
  };

  _onSendCancel = () => {
    this.setState({showConfirmation: false});
  };

  tabs = [
    {name:"Team", id:"team"},
    {name:"Client", id:"client"},
  ];

  onSend(messages = []) {

    this._onOpenActionSheet()

    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  render() {

    const confirmation = (
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showConfirmation}
          onRequestClose={() => {}}
          presentationStyle="overFullScreen"

          >

          <View style={{ flex:1, flexDirection:"row", alignItems:"flex-end",}}>
            <View style={{backgroundColor:"#ffffff", flex:1, padding:15}}>
              <Text>Are you sure to send this message to the client?</Text>
              <View style={{height:10}}></View>
              <BoxButton name="YES, SEND." callback={this._onSendConfirmation} />
              <View style={{height:10}}></View>
              <BoxButton name="CANCEL" boxColor="#C2C4D5" callback={this._onSendCancel} />
            </View>
          </View>

      </Modal>
    );

    return (
      <View style={{flex:1, backgroundColor:"#ffffff"}}>
      <Minus99Tabs items={this.tabs} selected={'team'} />
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        showUserAvatar={true}
        /*
        renderAvatar={(props) => {
          if(props.currentMessage.user.avatar)
          return <Image source={{uri: props.user.avatar }} style={styles.smallUserImage} />
        }}
        */
        user={{
          _id: 1,
          name: 'Alaa Alnuaimi',
          avatar: 'https://en.gravatar.com/userimage/131848358/a3762586fbf07a294be21195e2aecde7.jpg?size=200',
        }}
      />
      {confirmation}
      </View>
    );
  }
}
