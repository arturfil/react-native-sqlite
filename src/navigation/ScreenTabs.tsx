import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
import AddStockScreen from '../screens/AddStockScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { COLORS } from '../styles/Constants';
import CryptosNavigation from './CryptosNavigation';
import UsersNavigation from './UsersNavigation';


const Tab = createBottomTabNavigator();

const ScreenTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: 'gray',
        labelStyle: {
          marginBottom: 10
        },
        style: {
          paddingTop: 10,
          height: 65,
          paddingBottom: 2
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={CryptosNavigation}
        options={{
          tabBarLabel: "Stocks",
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={25} />
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddStockScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({color}) => <Icon name="add-circle-outline" color={color} size={25} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UsersNavigation}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({color}) => (<Icon name="person" color={color} size={20} />)
        }}
      />
    </Tab.Navigator>
  )
}

export default ScreenTabs
