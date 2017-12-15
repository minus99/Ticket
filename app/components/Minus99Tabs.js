import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

styles = require("../../app/styles");

export default class Minus99Tabs extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      selectedItem: [],
      offsets: [],

    }
  }

  ScrollView = null;

  _x = 0;
  arr = [];
  width = null;

  componentDidMount(){
    this.setState({selectedItem: this.props.selected })
  }

  _onPressItem = ( object, sequence ) => {

    this.setState({selectedItem: object.id });
    //this.props.callback( object, sequence );

  };

  _onDimensions = ( layout, sequence ) => {
    this.state.offsets.push({width:layout.width, sequence: sequence});
    if( this.state.offsets.length == this.props.items.length )
      this._makeMeasurements();
  }

  _makeMeasurements = () => {

    this.width = Dimensions.get('window').width

    this.arr = this.state.offsets;
    this.arr.sort(function(a, b){ return a.sequence - b.sequence });

    for(var i in this.arr)
    {
      this.arr[i].x = this._x;
      this._x += this.arr[i].width;
    }

  }

  render() {

    const items = [];
    if(this.props.items)
      for(item in this.props.items)
      {
        let bool = this.props.items[item].id == this.state.selectedItem ? true : false;
        items.push(<TabItem selected={bool} key={item} sequence={item} onPressItem={this._onPressItem} item={this.props.items[item]} onDimensions={this._onDimensions} />);
      }

    return (
      <View style={{justifyContent:"center", alignItems:"center", margin:10}}>
      <View style={{flexDirection:"row", borderColor:"#5F00D8", borderWidth:1, borderRadius:4}}>
        {items}
      </View>
      </View>
    );
  }
}

class TabItem extends React.Component {

  _onPress = () => {
    this.props.onPressItem(this.props.item, this.props.sequence);
  }

  _measureDimensions = ( e ) => {
    this.props.onDimensions(e.nativeEvent.layout, this.props.sequence);
  }

  render(){

    const item = this.props.item;

    return(
      <TouchableHighlight underlayColor="#ffffff" onPress={this._onPress}>
        <View onLayout={e => this._measureDimensions(e) } style={[{paddingRight:25, paddingLeft:25, height:26,justifyContent:"center"}, this.props.selected ? {backgroundColor:"#5F00D8"} : null ]}>
          <Text style={[{fontSize:12, fontWeight:"bold"}, this.props.selected ? styles.white : styles.mainColor ]}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
