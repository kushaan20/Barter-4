import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Home';
import Exchange from '../screens/Exchange';



export const AppTabNavigator = createBottomTabNavigator({
  Home : {
    screen: Home,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Donate Items",
    }
  },
  BookRequest: {
    screen: Exchange,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-item.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Request Items",
    }
  }
});