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
  DatePickerIOS,
  Picker,
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';

import TextButton from '../../app/UI/TextButton';
import IconButton from '../../app/UI/IconButton';
import BoxButton from '../../app/UI/BoxButton';
import DefaultInput from '../../app/UI/DefaultInput';
import get from 'lodash/get';

export default class Minus99MultipleSelect extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      items: null,
      selectedValue: 0,
      showSelectionBox: false,

    }
  }

  _onValueChange = (value) => {
    this.setState({
      selectedValue: value,
    })
  }

  _onDateSelect = () => {
    this.setState({showSelectionBox: false});
  }

  _openSelectionBox = () => {
    this.setState({showSelectionBox: true});
  }

  _closeSelectionBox = () => {
    this.setState({showSelectionBox: false});
  }

  componentDidMount(){
    if(this.props.selectedValue){
      this.setState({
        selectedValue: this.props.selectedValue,
      })
    }
  }

  _multiSelect = null;

  render() {

    const { items, selectedValue } = this.props;

    let pickerItems = [];
    for( let item of items )
    {
      pickerItems.push(<Picker.Item key={'${index}'} label={item.label} value={item.value} />);
    }

    const selectionbox =
    <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.showSelectionBox}
        presentationStyle="overFullScreen"
        >
        <View style={{ flex:1, flexDirection:"row", alignItems:"flex-end",}}>
        <View style={{backgroundColor:"#ffffff", flex:1, paddingTop:15, borderTopColor:"#dddddd", borderTopWidth:1}}>
        <View style={{alignSelf:"center"}}><TextButton  name="CLOSE" callback={this._closeSelectionBox} /></View>

          <Picker
            selectedValue={this.state.selectedValue}
            onValueChange={this._onValueChange}>
            {pickerItems}
          </Picker>

      </View>
      </View>
    </Modal>;

  const { selectedItems } = this.state;

  const title = this.props.name;
  const value = items[ parseInt( this.state.selectedValue ) ].label;
  //const value = null;

    return (
      <View style={{flex:1}}>
        <DefaultInput name={title} value={value} callback={this._openSelectionBox} />
        {selectionbox}
      </View>
    );
  }
}
