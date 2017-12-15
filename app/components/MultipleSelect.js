import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

export default class MultipleSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      items: [],
      selectedItems: [],

    }
  }

  items = [{
    id: '92iijs7yta',
    name: 'Ondo',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  }, {
    id: '16hbajsabsd',
    name: 'Calabar',
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos',
  }, {
    id: '667atsas',
    name: 'Maiduguri',
  }, {
    id: 'hsyasajs',
    name: 'Anambra',
  }, {
    id: 'djsjudksjd',
    name: 'Benue',
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  }];

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  }

  componentDidMount(){
    /*
    let data = require('../../data/multiselect.json');
    var items = [];
    for(var i=0; i<data.data.length; ++i)
    {
      items.push({id:i, name:data.data[i][0]});
    }
    this.setState({items: items});
    */
  }

  _multiSelect = null;

  render() {

  const { selectedItems } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={this.items}
          uniqueKey="id4654f"
          ref={(c) => this._multiSelect = c}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Pick Items"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
           {selectedItems}
        </View>
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
      <TouchableHighlight onPress={this._onPress}>
        <View>
          <Text>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
