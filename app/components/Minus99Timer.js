import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  StatusBar,
  Modal,
  Image,
} from 'react-native';
//import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

styles = require("../../app/styles");
Globals = require("../../app/Globals");

import BoxButton from '../../app/UI/BoxButton';
import IconButton from '../../app/UI/IconButton';

export default class Minus99Timer extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      splashIsOpen: false,
      timerStart: false,

    };
  }

  _openSplash = () => {
    this.setState({
      splashIsOpen: true,
    });
  }

  _closeSplash = () => {
    this.setState({
      splashIsOpen: false,
    })
  }

  render() {
    return (
      <View style={{position:'absolute', left:0, right:0, top:0, backgroundColor:'#5C80FF'}}>
        <TouchableWithoutFeedback onPress={this._openSplash}>
          <View style={{flexDirection:'row', height:22, justifyContent:'center', alignItems:'center'}}>
            <Text style={[styles.tiny, styles.white]}>Elapsed time </Text>
            <Watch
              startTime="2017-12-13T08:33:59.696Z"
              start={this.state.timerStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.getFormattedTime}
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          animationType="slide"
          visible={ this.state.splashIsOpen }
        >

          <TimerSplash onClosePress={this._closeSplash} />

        </Modal>
      </View>
    );
  }
}

class TimerSplash extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    timerStart: true,

    };
  }

  _onClosePress = () => {
    this.props.onClosePress();
  }
  render(){
    return(
      <View style={{flex:1, backgroundColor:'#5C80FF', padding:20,}}>
        <View style={{alignSelf:"flex-end"}}>
        <IconButton icon={ <Image source={require("../../assets/icons/close-w.png")} style={styles.iconNormalSize} /> } callback={this._onClosePress} />
        </View>
        <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
          <Text style={[styles.small, styles.white, { marginBottom:5}]}>EMS0004303438157</Text>
          <Text style={[styles.large, styles.bold, styles.white]}>Vatan Gaming UI design notes</Text>
          <Image source={require("../../assets/watch.png")} style={{resizeMode:'contain', justifyContent:'center', alignItems:'center', width:260, height:260, marginTop:30}}>
            <Text style={[{fontSize:50, backgroundColor:'transparent'}, styles.white, styles.bold]}>21:33:56</Text>
            <Watch
              startTime="2017-12-13T08:33:59.696Z"
              start={this.state.timerStart}
              reset={this.state.stopwatchReset}
              options={options}
              getTime={this.getFormattedTime}
            />
          </Image>
        </View>
          <BoxButton boxColor='#ffffff' textColor='#5C80FF' name="STOP TIMER" callback={()=>{}} />
      </View>
    );
  }
}

class Watch extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      elapsed: null,
      started: false,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentWillMount() {
    if(this.props.startTime) {
      this.setState({ startTime: new Date( this.props.startTime )});
    }
  }

  componentDidMount() {
    if(this.props.start) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.start) {
      this.start();
    } else {
      this.stop();
    }
  }

  componentWillUnmount() {
     clearInterval(this.interval);
  }

  start() {
    if ( !this.state.startTime ) {
      this.setState({ startTime: new Date(), started: true });
    }

    this.interval = this.interval ? this.interval : setInterval(() => {
        this.setState({elapsed: new Date() - this.state.startTime });
    }, 1);
  }

  stop() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({started: false});
      this.reset();
    }
  }

  reset() {
    this.setState({elapsed: null, startTime: null });
  }

  formatTime() {
    let now = this.state.elapsed;
    let msecs = now % 1000;

    if(msecs < 10) {
      msecs = `00${msecs}`;
    } else if(msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);
    let formatted;
    if(this.props.msecs) {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ?
          0 : ""}${seconds}:${msecs}`;
    } else {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }

    if (typeof this.props.getTime === "function")
      this.props.getTime(formatted);
    return formatted;
  }
  render() {
    const styles = this.props.options ? this.props.options : this.defaultStyles;
    return(
      <View ref="stopwatch" style={styles.container}>
        <Text style={styles.text}>{this.formatTime()}</Text>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    width:55,
  },
  text: {
    fontSize: 12,
    color: '#FFF',
  }
};
