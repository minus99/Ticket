import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  FlatList,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

styles = require('../../app/styles');


export default class ListSheet extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isSwiping: false,
      showFilters: false,
    }
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => {
    return(
      <ListItem item={item} index={index} onPressItem={this._onPressItem} onSwiping={this._onSwiping} />
    )
  }

  _onPressItem = (index) => {
    this.props.navigation.navigate('Details', {user: index});
  }

  render() {

    const { items, title } = this.props;

    const Zheader = title ? <ListHeader title={title} onFiltersPress={this._showFilters} onPinnedPress={this._showPinned} />: null;

    return (
      <View style={{backgroundColor:"#ffffff", paddingBottom:20, paddingTop:20}}>
        <FlatList
          scrollEnabled={false}
          data={items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshing={false}
          onRefresh={this._onRefresh}
          ListHeaderComponent={Zheader}
        />
      </View>

    )
  }
}

class ListItem extends React.Component {

  render(){

    const { item } = this.props;

    var arr = [];
    for( i in item )
    {
      arr.push( item[i] );
    }

    return(
      <View style={{height:"auto", flexDirection:"row", padding:20, paddingBottom:10, paddingTop:10}}>
        <View style={{flex:1}}>
          <Text style={[styles.small]}>{arr[0]}</Text>
        </View>
        <View style={[{flex:1, alignItems:"flex-end"}]}>
          <Text style={[styles.small, styles.lightColor]}>{arr[1]}</Text>
        </View>
      </View>
    );
  }
}

class ListHeader extends React.Component {

  _onFiltersPress = () => {
    this.props.onFiltersPress()
  }

  _onPinnedPress = () => {
    this.props.onPinnedPress()
  }

  render(){

    const { title } = this.props;

    return(
      <View style={{backgroundColor:"#ffffff", padding:20, paddingTop:30}}>
        <Text style={[styles.tiny, styles.lightColor]}>{title}</Text>
      </View>
    );
  }
}
