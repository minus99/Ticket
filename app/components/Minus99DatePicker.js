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

      date: new Date(),
      showSelectionBox: false,
      dateName: "",

    }
  }

  _onDateChange = (date) => {
    this.setState({
      date: date,
      dateName: date.toLocaleDateString('tr-TR'),
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

  componentWillMount(){

    if(this.props.value)
    {
      var date = new Date(this.props.value);
      this.setState({
        date: date,
        dateName: date.toLocaleDateString('tr-TR'),
      });
    }
  }

  _multiSelect = null;

  render() {

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
        <DatePickerIOS
          mode='date'
          date={ this.state.date }
          onDateChange={ (date) => this._onDateChange(date) }
        />
      </View>
      </View>
    </Modal>;

  const { selectedItems } = this.state;

  const title = this.props.name;
  const value = this.state.dateName;

    return (
      <View>
        <DefaultInput name={title} value={value} callback={this._openSelectionBox} />
        {selectionbox}
      </View>
    );
  }
}
