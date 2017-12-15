import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
//import { Stopwatch, Timer } from 'react-native-stopwatch-timer'

styles = require("../../app/styles");
Globals = require("../../app/Globals");

export default class Minus99Tabs extends React.Component {

  constructor(props){
    super(props);
    this.state = {

      timerStart: false,
      stopwatchStart: true,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,

    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
    Globals.timer.on = !this.state.timerStart;

    console.log(Globals.timer);
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    Globals.timer.on = !this.state.stopwatchStart;

    console.log(Globals.timer);
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  };

  render() {

    return (
      <View style={{top:0, right:0, left:0, backgroundColor:'#5C80FF', padding:15, paddingTop:5, paddingBottom:5, position:'absolute', alignItems:'center', justifyContent:'center'}}>
        <Watch startTime="2017-12-13T08:33:59.696Z" start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={{fontSize: 10}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    backgroundColor: '#000',
    width: 220,
  },
  text: {
    fontSize: 12,
    color: '#FFF',
    marginLeft: 7,
  }
};

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
