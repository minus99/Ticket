import React from 'react';
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TouchableHighlight,
} from 'react-native';

styles = require('../../app/styles');
Globals = require('../../app/Globals');
import IconButton from '../../app/UI/IconButton';
import TextButton from '../../app/UI/TextButton';

export default class ListPage extends React.Component{

  static navigationOptions = ({ navigation }) => {

    const {state, setParams} = navigation;
    return {
      title: 'Notifications',
      headerLeft:null,
      headerRight:null,
      headerBackTitle: null,
      tabBarIcon: ({ tintColor }) => ( <Image source={require('../../assets/icons/notifications.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /> ),
      headerStyle:{
        //backgroundColor: Globals.timer.on ? '#5C80FF' : 'red'
      }
    };
  };

  constructor(props){
    super(props);
    this.state = {

      items: [],

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

  componentDidMount(){
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
        scrollEnabled={true}
        data={this.state.items}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshing={false}q
        onRefresh={this._onRefresh}
      />
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

    return(

        <View style={styles.listItem}>
          <Image source={require('../../assets/user.png')} style={[styles.smallUserImage, styles.listItemImage]} />
          <View style={styles.listItemWrapper}>
            <View style={{flexDirection:"row"}}>
            <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
              <Text numberOfLines={1} style={[styles.normal, styles.mainColor, styles.bold]}>Lena</Text>
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.normal]}> marked a </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
              <Text numberOfLines={1} style={[styles.normal, styles.mainColor, styles.bold]}>ticket</Text>
            </TouchableOpacity>
            <Text numberOfLines={1} style={[styles.normal]}> as completed.</Text>
            </View>
            <View style={{backgroundColor:'#F4F6FB', borderRadius:5, padding:10, marginTop:7}}>
            <Text numberOfLines={2} style={[styles.small]}>Lorem ipsum dolor sit amet, conse ctetur undo adipiscing elit. Mauris ut maximus impuratos tashkasto basz msksic micun</Text>
            </View>
            <View style={styles.listItemFooter}>
            <View style={[{flex:1}]}>
              <Text style={[styles.tiny, styles.lightColor]}>EMS0004303438157</Text>
            </View>
            <View style={[styles.right, {flex:1}]}>
              <Text style={[styles.tiny, styles.lightColor]}>17:22</Text>
            </View>
            </View>
          </View>
        </View>
    );
  }
}
