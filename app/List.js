import React from 'react';
import {
  Text,
  View,
} from 'react-native';

styles = require('../app/styles');

export default class ListPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {

      /* state */

    }
  }

  /* general functions - all your calculations */

  render(){

    /* functions that are triggered on each render - only simple rendertime logic */

    return(

      /* non logic only UI Components */

      <View style={styles.container}>
        <View style={[styles.container, styles.redBox]}><Text>Tada</Text></View>
      </View>
    )
  }
}
