import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  TextInput,
  SectionList,
  FlatList,
  Animated,
  Easing,
  Image,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

import TextButton from '../../app/UI/TextButton';
import IconButton from '../../app/UI/IconButton';
import BoxButton from '../../app/UI/BoxButton';
import DefaultInput from '../../app/UI/DefaultInput';
import get from 'lodash/get';

const MIN_ITEMS_NUM = 5;

export default class Minus99MultipleSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      items: [],
      selectedItems: [],
      showSelectionBox: false,

    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  }

  _openSelectionBox = () => {
    this.setState({ showSelectionBox: true, });
  }

  _closeSelectionBox = ( items ) => {
    this.setState({
      selectedItems: items,
      showSelectionBox: false
    });
  }

  componentWillMount(){
    this.setState({
      items: this.props.items,
      selectedItems: this.props.selected ? this.props.selected : [],
    });
  }

  _multiSelect = null;

  render() {

  const { selectedItems, items } = this.state;

  let selected = "";

  if( selectedItems.length > 0 && selectedItems.length < 4)
  {
    for( i in selectedItems )
    {
      selected += items[selectedItems[i]].name + (i == selectedItems.length-1 ? "" : ", ");
    }
  }
  else if( selectedItems.length >= 4 )
  {
    selected = "(" + selectedItems.length + ")";
  }
  else {
    selected = "";
  }

    const title = this.props.name;
  const selectionbox = <SelectionBox name={title} selected={selectedItems} items={this.state.items} onClosePress={this._closeSelectionBox} onSubmitPress={this._submitFilters} visible={this.state.showSelectionBox} />;

    return (
      <View>
        <DefaultInput name={title} value={selected} callback={this._openSelectionBox} />
        {selectionbox}
      </View>
    );
  }
}

class SelectionBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      items: [],
      selectedItems: [],
      searchTerm: null,
      short: false,
    }
  }

  _onClose = () => {
    this.props.onClosePress( this.state.selectedItems );
    this.setState({ searchTerm: null })
  };
  _onInputChange = (searchTerm) => this.setState({ searchTerm });
  _onInputFocus = () => {};
  _onInputBlur = () => {};

  _clearAll = () => {
    this.setState({ selectedItems: [] });
  }

  _onPressItem = ( a ) => {
    var arr = this.state.selectedItems.slice();
    if(arr.includes( a ))
    {
      var k = arr.filter(e => e !== a);
      this.setState({ selectedItems: k });
    }
    else{
      arr.push(a);
      this.setState({ selectedItems: arr });
    }

    var _this = this;

    setTimeout(function(){
      if( _this.state.selectedItems.length > 1 )
      {
        Animated.timing(
          _this.state.anim,
          {
            toValue:5,
            easing: Easing.elastic(),
            duration:222,
          }
        ).start();
      }
      else {
        Animated.timing(
          _this.state.anim,
          {
            toValue:-50,
            easing: Easing.elastic(),
            duration:222,
          }
        ).start();
      }
    }, 100);

  };

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => {

    var arr =  this.state.selectedItems;
    var selected = arr.includes( index ) ? true : false;

    return(
      <ListItem selected={selected} item={item} index={index} onPressItem={this._onPressItem} />
    )
  }

  _filterItems = (searchTerm) => {
    const { items } = this.props;
    const filteredItems = [];
    items.forEach((item) => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(get(item, 'name'))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  componentDidMount(){
    this.setState({
      items: this.props.items,
      selectedItems: this.props.selected,
      anim: new Animated.Value(-50),
      short: this.props.items.length > MIN_ITEMS_NUM ? false : true,
    });
  }

  render(){

    const { items, name } = this.props;
    const { searchTerm, selectedItems, short } = this.state;
    const renderItems = searchTerm ? this._filterItems( searchTerm.trim() ) : items;

    const selection = [];
    for( i in selectedItems )
    {
      var obj = items[selectedItems[i]];
      selection.push( <TagButton key={i} name={obj.name} index={selectedItems[i]} onPressItem={this._onPressItem} /> );
    }

    const header = short == true ?
        <View style={{paddingTop:10}}>
          <Text style={[styles.mainColor, styles.normal, styles.bold]}>{name}</Text>
        </View>
        : <TextInput
            style={styles.searchInput}
            placeholder='Searcn'
            onChangeText={searchTerm => this.setState({ searchTerm })}
            underlineColorAndroid='transparent'
            onFocus={this._onInputFocus}
            onBlur={this._onInputBlur} />;

    return(
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {}}
          >

          <View style={{flex:1, paddingTop:25 }}>
            <View style={{flex:1, flexDirection:"row", maxHeight:45, borderBottomWidth:5, borderBottomColor:"#ffffff" }}>
              <View style={{width: 40 }}>
                <IconButton icon={ <Image source={require("../../assets/icons/back.png")} style={styles.iconNormalSize} /> } callback={this._onClose} />
              </View>
              <View style={{flex:1, marginRight:10, marginLeft:5}}>
                {header}
              </View>
            </View>
            <View style={{backgroundColor:"#ffffff", flexDirection:"row", flexWrap: "wrap", padding:5, paddingTop:0, marginRight:40 }}>
              {selection}
            </View>
            <Animated.View style={{ position:"absolute", right:this.state.anim, top:70 }}>
            <IconButton icon={ <Image source={require("../../assets/icons/trash.png")} style={styles.iconNormalSize} /> } callback={this._clearAll} />
            </Animated.View>
            <FlatList style={{backgroundColor:"#F4F6FB"}}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              data={renderItems}
            />
              <BoxButton name="OK" callback={this._onClose} />
          </View>

      </Modal>
    )
  }
}

class ListItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }
  render(){

    const {item, selected} = this.props;

    return(
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this._onPress}>
        <View style={{flex:1, flexDirection:"row", borderBottomColor:"#E7E9F1", borderBottomWidth:1, alignItems:"center", height:40, paddingRight:15, paddingLeft:15}}>
          <View style={{flex:1}}>
          <Text numberOfLines={1} style={selected ? [styles.bold, styles.mainColor] : null }>{item.name}</Text>
          </View>
          { selected ? <Image source={require("../../assets/icons/check.png")} style={[styles.iconNormalSize, {marginRight:5, left:10}]} /> : null }
        </View>
      </TouchableOpacity>
    );
  }
}

class SectionHeader extends React.Component {
  render(){
    return(
      <View style={{flex:1, backgroundColor:"yellow"}}>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}

class TagButton extends React.Component{
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }
  render(){
    return(
      <TouchableOpacity activeOpacity={0.9} onPress={this._onPress}>
        <View style={{ flexDirection:"row", backgroundColor:"#5F00D8", height:30, margin:3, borderRadius:5, alignItems:"center", paddingRight:10, paddingLeft:10 }}>
          <Text numberOfLines={1} style={[{maxWidth:100}, styles.white, styles.bold, styles.tiny]}>{this.props.name}</Text>
          <Image source={require("../../assets/icons/close.png")} style={[styles.iconTinySize, {marginLeft:5}]} />
        </View>
      </TouchableOpacity>
    );
  }
}
