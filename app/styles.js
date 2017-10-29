/* STYLES */
'use strict';
var React = require('react-native');
var { StyleSheet, } = React;

module.exports = StyleSheet.create({
  // ALL STYLES GO HERE
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
  },
  redBox:{
    backgroundColor:"red",
    height:200,
    justifyContent:"center",
    alignItems:"center",
    marginLeft: 20,
    marginRight: 20,
  },
  container2:{
    backgroundColor:"blue",
    flex:1,
  }
});
