import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './Home.js'
import { MLScreen} from './ML.js'
import { AboutProjectScreen } from "./AboutProject";
import { AboutUSScreen } from "./AboutUs";


const Tab = createBottomTabNavigator();


// TABS PAGE
// INCLUDES SCREEN COMPONENTS FROM FILES: Home.js, ML.js, AboutProject.js, & AboutUs.js
export function MyTabs() {
  return (
    // initializes a bottom tab navigator from Tab variable
    <Tab.Navigator>
      <Tab.Screen 
      name="Parking Lot Data" 
      component={HomeScreen}
      options={{
        tabBarLabel: "Home",
        tabBarLabelStyle: {focused: false},
        tabBarIcon: ({ name, color, size }) => (
          <MaterialCommunityIcons name="car-multiple" color={"#228647"} size={31} />
        ),
      }}/>
      <Tab.Screen 
      name="ML Insights" 
      component={MLScreen} 
      options={{
        tabBarLabel: 'ML Insights',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="brain" color={"#228647"} size={31} />
        ),
      }}/>
      <Tab.Screen 
      name="About Project" 
      component={AboutProjectScreen} 
      options={{
        tabBarLabel: 'About Project',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="information-outline" color={"#228647"} size={31} />
        ),
      }}/>
      <Tab.Screen 
      name="About Us" 
      component={AboutUSScreen} 
      options={{
        tabBarLabel: 'About Us',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account-group" color={"#228647"} size={31} />
        ),
      }}/>
    </Tab.Navigator>
  );
}