import Expo from 'expo';
import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-swipeable';

styles = require('../../app/styles');
Globals = require('../../app/Globals');

import TextButton from '../../app/UI/TextButton';
import SwitchButton from '../../app/UI/SwitchButton';
import Filters from '../../app/Filters';
import Minus99Timer from '../../app/components/Minus99Timer';

const HEADER_MAX_HEIGHT = 250;
//const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Head extends React.Component{
  render(){
    const { state } = this.props;
    let output = null;
    if(state.params)
    {
      if(state.params.isPinned)
        output = <Text style={styles.mainColor}>9 pinned tickets</Text>;
      else {
        output = <Text style={styles.lightColor}>17 active tickets</Text>
      }
    }
    else {
      output = <Text style={styles.lightColor}>17 active tickets</Text>
    }

    return(
      <View>
      {output}
      </View>
    );
  }
}

export default class App extends Component {

  static navigationOptions = ({ navigation }) => {

    const {state, setParams} = navigation;

    return {

      title: 'Tickets',
      headerTitle: (
        <Head state={state} />
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
      headerStyle:{
        //backgroundColor:'#5C80FF'
      }
    };
  };

  constructor(props){
    super(props);
    this.state = {
      items: [],
      isSwiping: false,
      showFilters: false,
      scrollY: new Animated.Value(0),
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
    Globals.timer.on = true;
    console.log(Globals.timer.on);
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
    var _this = this;
    setTimeout(()=>{
      _this.props.navigation.setParams({ isPinned: !_this.props.navigation.state.params.isPinned});
    }, 333)
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
      timer: false,
    });

    let data = require('../../data/multiselect.json');
    var items = [];
    for(var i=0; i<data.data.length; ++i)
    {
      items.push({id:i, name:data.data[i][0]});
    }
    this.setState({items: items});
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles1.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles1.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {

    const filters = <Filters onClosePress={this._closeFilters} onSubmitPress={this._submitFilters} visible={this.state.showFilters} />;

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.5],
      extrapolate: 'clamp',
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -230],
      extrapolate: 'clamp',
    });

    return (
      <View style={[styles1.fill, {overflow:"hidden", backgroundColor:"#ffffff"}]}>
        <Animated.ScrollView
          style={styles1.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          <FlatList
            style={{paddingTop:250}}
            scrollEnabled={false}
            data={this.state.items}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshing={false}q
            onRefresh={this._onRefresh}
          />
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles1.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles1.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../../assets/galata.png')}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.welcomeText,
            {
              position:'absolute',
              top:150,
              right:0,
              left:20,
              transform: [
                { translateY: titleTranslate },
              ],
            },
          ]}>
          <Text style={[styles.xlarge, styles.white]}>Good morning</Text>
          <Text style={[styles.xlarge, styles.bold, styles.white]}>Çağrı</Text>
        </Animated.View>
        <Minus99Timer />
        {filters}
      </View>
    );
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

const styles1 = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7410E0',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 28,
  },
  scrollViewContent: {
    backgroundColor:"#ffffff",
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
