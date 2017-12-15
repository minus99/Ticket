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
import Swipeable from 'react-native-swipeable';

styles = require('../../app/styles');

import TextButton from '../../app/UI/TextButton';
import SwitchButton from '../../app/UI/SwitchButton';
import Filters from '../../app/Filters';

export default class ScreenBig extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    return {
      title: 'Tickets',
      headerTitle: (
        <Text style={styles.lightColor}>17 active tickets</Text>
      ),
      headerRight: (
        <View style={{marginRight:15}}>
          <TextButton name="FILTER" callback={ () => state.params.handleFiltersPress() } />
        </View>
      ),
      headerLeft: (
        <View style={{marginLeft:10}}>
          <SwitchButton name="" callback={ () => state.params.handlePinPress() } />
        </View>
      ),
      gesturesEnabled: false,
      headerBackTitle: null,
      headerMode:"none",
      tabBarIcon: ({ tintColor }) => ( <Image source={require('../../assets/icons/tasks.png')} style={[styles.tabIcon, {tintColor: tintColor}]} /> ),
    };
  };

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

  _onSwiping = ( flag ) => {
    this.setState({ isSwiping: flag });
    console.log(this.state.isSwiping);
  }

  _onPressItem = (index) => {
    this.props.navigation.navigate('Details', {user: index});
  }

  _onRefresh = () => {
    // TODO:
  }

  _showFilters = () => {
    this.setState({showFilters: true});
  }

  _closeFilters = () => {
    this.setState({showFilters: false});
  }

  _showPinned = () => {
    //this.props.navigation.setParams({ title: 'skhskjhfsd' });
  }

  componentWillMount(){
    this.props.navigation.setParams({isPinned: false });
  }

  componentDidMount(){

    this.props.navigation.setParams({
      handleFiltersPress: this._showFilters,
      handlePinPress: this._showPinned,
      isPinned: false,
    });

    let data = require('../../data/multiselect.json');
    var items = [];
    for(var i=0; i<data.data.length; ++i)
    {
      items.push({id:i, name:data.data[i][0]});
    }
    this.setState({items: items});
  }

  render() {

    const Zheader = <ListHeader onFiltersPress={this._showFilters} onPinnedPress={this._showPinned} />;

    const filters = <Filters onClosePress={this._closeFilters} onSubmitPress={this._submitFilters} visible={this.state.showFilters} />;

    return (
      <View>
        <FlatList
          scrollEnabled={!this.state.isSwiping}
          data={this.state.items}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshing={false}
          onRefresh={this._onRefresh}
          ListHeaderComponent={Zheader}
        />
        {filters}
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
            <Text style={styles.white}>Timer</Text>
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
          <View style={styles.listItem}>
            <Image source={require('../../assets/user.png')} style={[styles.smallUserImage, styles.listItemImage]} />
            <View style={styles.listItemWrapper}>
              <Text numberOfLines={1} style={[styles.normal]}>Fonts sizes of shoes menu on the list page is looking wierd</Text>
              <Text numberOfLines={1} style={[styles.small]}>Lescon</Text>
              <Text numberOfLines={2} style={[styles.small, styles.lightColor, {marginTop:5}]}>Lorem ipsum dolor sit amet, conse ctetur undo adipiscing elit. Mauris ut maximus impuratos tashkasto basz msksic micun</Text>
              <View style={styles.listItemFooter}>
              <View style={[{flex:1}]}>
                <Text style={[styles.small, styles.lightColor]}>EMS0004303438157</Text>
              </View>
              <View style={[styles.right, {flex:1}]}>
                <Text style={[styles.small, styles.lightColor]}>17:22</Text>
              </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
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
    return(
      <View>
        <View style={styles.welcomeWrapper}>
          <Image source={require('../../assets/galata.png')} style={styles.welcomeImage}>
            <View style={styles.welcomeText}>
              <Text style={[styles.xlarge, styles.white]}>Good morning</Text>
              <Text style={[styles.xlarge, styles.bold, styles.white]}>Çağrı</Text>
            </View>
          </Image>
        </View>
      </View>
    );
  }
}

/*
<View style={styles.listFiltersWrapper}>
  <View style={[styles.left, {flex:1}]}>
    <TextButton name="PINNED" callback={this._onPinnedPress} />
  </View>
  <View style={[styles.center, {flex:2}]}>
    <Text style={styles.lightColor}>17 active tickets</Text>
  </View>
  <View style={[styles.right, {flex:1}]}>
    <TextButton name="FILTER" callback={this._onFiltersPress} />
  </View>
</View>
*/

/*
<TouchableOpacity activeOpacity={0.8} onPress={this._onPress}>
<View style={[styles.request, large]}>
  <View style={styles.requestLeft}>
    {icon}
  </View>
  <View style={styles.requestRight}>
    <View style={styles.one}>
    <Text style={styles.medium} numberOfLines={1}>{item.title}</Text>
    <Text style={styles.small} numberOfLines={2}>{desc}</Text>
    </View>
    <View style={styles.requestLocation}>
      <Image source={require('../assets/images/location.png')} style={styles.locationIcon} />
      <Text style={styles.blueText}>{item.cty_title}</Text>
      <View style={styles.rightAlign}>
        <Text style={styles.greyText}>{item.ago}</Text>
      </View>
    </View>
    {qoute}
  </View>
</View>
</TouchableOpacity>
*/

class AllContactsScreen extends React.Component {
  render() {
    return <Text>List of all contacts</Text>
  }
}
