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
  },
  listItem:{
    flex:1,
    height:140,
    backgroundColor:"#ffffff",
    borderBottomColor:"#dddddd",
    borderBottomWidth:1,
    paddingRight:20,
    paddingTop:0,
    paddingBottom:10,
    paddingLeft:50,
  },
  listItemWrapper:{
    top:-10,
  },
  listItemImage:{
    left:-40,
    top:20,
  },
  listItemFooter:{
    flex:1,
    flexDirection:"row",
    marginTop:10,
    minHeight:20
  },
  timesheetListItem:{
    flex:1,
    minHeight:70,
    backgroundColor:"#ffffff",
    borderBottomColor:"#dddddd",
    borderBottomWidth:1,
    paddingRight:20,
    paddingTop:15,
    paddingBottom:10,
    paddingLeft:20,
  },

  smallUserImage:{
    width:30,
    height:30,
    borderRadius:15,
  },

  timerButtonWrapper:{
    flex:1,
    minHeight:165,
    backgroundColor:"#5C80FF",
    borderBottomColor:"#ffffff",
    borderBottomWidth:1,
  },
  timerButton:{
    minHeight:165,
    width:75,
    justifyContent:"center",
    alignItems:"center",
  },

  xlarge:{ fontSize: 28 },
  large:{ fontSize: 22 },
  normal:{ fontSize: 16 },
  small:{ fontSize: 14 },
  tiny:{ fontSize: 12 },

  bold:{ fontWeight: "bold" },
  slim:{ fontWeight: "normal" },
  white:{ color:"#ffffff" },
  mainColor:{ color:"#5F00D8" },
  lightColor:{ color:"#80808D" },

  right:{ justifyContent:"flex-end", flexDirection:"row" },
  left:{ justifyContent:"flex-start", flexDirection:"row" },
  center:{ justifyContent:"center", flexDirection:"row" },

  tabIcon:{ width:24, height:24, },
  addNewTabIcon: { width:60, height:60, borderRadius:30, borderColor:"#5F00D8", borderWidth:2, justifyContent:"center", alignItems:"center" },
  iconNormalSize: {width:24, height:24},
  iconSmallSize: {width:16, height:16},
  iconTinySize: {width:12, height:12},

  iconButton:{ width:40, height:40, justifyContent:"center", alignItems:"center" },
  boxButton:{ alignItems:"center", justifyContent:"center", backgroundColor:"#5F00D8", height:50 },

  // multiselect box
  searchInput:{ backgroundColor: "#E7E9F1", flex:1, borderRadius:5, padding:5, paddingRight:10, paddingLeft:10, alignItems:"center", fontSize:14 },

  input:{
    minHeight:50,
    backgroundColor:"#ffffff",
    borderColor:"#dddddd",
    borderWidth:1,
    paddingRight:12,
    paddingTop:0,
    paddingLeft:12,
    //justifyContent:"center",
    marginBottom:10,
  },

  contentWrapper:{
    flex:1,
    margin:20,
  },

  welcomeWrapper:{ flex:1, maxHeight:400, minHeight:250, },
  welcomeImage:{ flex:1, alignSelf:'center', resizeMode:'cover', width:"100%", top:0, left:0, },
  welcomeText:{ top:150, left:20, height:100, width:300, backgroundColor:"transparent" },

  listFiltersWrapper:{ padding:20, flex:1, flexDirection:"row" },

  // HORIZONTAL tabs
  horizontalTabsWrapper:{ flex:1, flexDirection:"row", maxHeight:55, backgroundColor:"#F4F6FB" },
  horizontalTab:{ height:55, justifyContent:"center", },
  borderBottom:{ borderBottomColor:"#7410E0", borderBottomWidth:3 },
});
