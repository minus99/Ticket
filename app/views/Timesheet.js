import React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
  Modal,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import { BlurView } from 'expo';

styles = require('../../app/styles');
import IconButton from '../../app/UI/IconButton';
import TextButton from '../../app/UI/TextButton';

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Timesheet',
      headerLeft:( <View style={{marginLeft:15}}>
                      <TextButton name="DATE" callback={ () => state.params.handleFiltersPress() } />
                    </View>
                  ),
      headerRight:( <View style={{marginRight:5}}>
                      <IconButton icon={ <Image source={require("../../assets/icons/new-p.png")} style={styles.iconNormalSize} /> } callback={() => state.params.handleOpenForm()} />
                    </View>
                  ),
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => ( <Image source={require('../../assets/icons/timesheet.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /> ),
    };
  };

  constructor(props){
    super(props);
    this.state = {

      items: [],
      editIsVisible: false,

    }
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => {
    return(
      <ListItem item={item} index={index} onPressItem={this._onPressItem} onSwiping={this._onSwiping} />
    )
  }

  _onSwiping = ( flag ) => {
    this.setState({ isSwiping: flag });
    console.log(this.state.isSwiping);
  }

  _onPressItem = (index) => {
    this.props.navigation.navigate('Details', {user: index});
  }

  _openForm = () => {

    this.setState({
      editIsVisible: !this.state.editIsVisible
    })
    console.log("open form");
  }

  componentDidMount(){

    this.props.navigation.setParams({
      handleOpenForm: this._openForm,
    });


    let data = require('../../data/multiselect.json');
    var items = [];
    for(var i=0; i<data.data.length; ++i)
    {
      items.push({id:i, name:data.data[i][0]});
    }
    this.setState({items: items});
  }

  render(){

    return(
      <View style={{flex:1, backgroundColor:'#ffffff'}}>
      <FlatList
        style={{paddingTop:50}}
        scrollEnabled={true}
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshing={false}q
        onRefresh={this._onRefresh}
      />
        <BlurView tint="default" intensity={98} style={{height:50, position:'absolute', left:0, right:0, top:0, justifyContent:'center', padding:15}}>
          <Text style={[styles.bold, styles.mainColor]}>Tuesday, Dec 21, 2017</Text>
        </BlurView>
        <Modal
          animationType="slide"
          visible={this.state.editIsVisible}
        >
          <View style={{padding:20}}>
            <Text>form</Text>
            <TextButton name="close" callback={this._openForm} />
          </View>
        </Modal>
      </View>
    )
  }
}

class ListItem extends React.Component {

  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  _broadcastSwiping = ( flag ) => {
    //this.props.onSwiping( flag );
  }

  render(){

    const leftContent = <Text>Pull to activate</Text>;

    const rightButtons = [
      <TouchableHighlight>
        <View style={styles.timerButtonWrapper}>
          <View style={styles.timerButton}>
            <Text style={styles.white}>Edit</Text>
          </View>
        </View>
      </TouchableHighlight>
    ];

    return(
      <Swipeable
          rightButtons={rightButtons}
          onSwipeStart={() => this._broadcastSwiping(true)}
          onSwipeRelease={() => this._broadcastSwiping(false)}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this._onPress}>
          <View style={styles.timesheetListItem}>
            <View style={{}}>
              <Text numberOfLines={2} style={[styles.normal]}>Fonts sizes of shoes menu on the list page is looking wierd of shoes menu on the list page is looking wierd</Text>
              <View style={styles.listItemFooter}>
              <View style={[{flex:1}]}>
                <Text style={[styles.small]}>3 Hours</Text>
              </View>
              <View style={[styles.right, {flex:1}]}>
                <Text style={[styles.small, styles.lightColor]}>Armine</Text>
              </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}






/*
class Umid extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      // state vars

    }
  }

  items = "hello";

  function xx(){
    return(
      //html
    )
  }

  xx = () => {
    return(

    );
  }

  getJson = () => {

  }

  componentDidMount(){
    this.getJson();
  }

  componentWillMount(){
  }



  // all functions

  render(){

    this.items;

    // calc

    return(

      {this.xx}
      // JSX HTML

    )
  }
}*/
