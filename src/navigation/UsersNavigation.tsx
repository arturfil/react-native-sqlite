import { createStackNavigator } from "@react-navigation/stack"
import React from 'react';
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type UsersStackParams = {
  ProfileScreen: undefined;
  EditProfileScreen: {routeId?: number}
}

const Stack = createStackNavigator<UsersStackParams>();

const UsersNavigation = (stack: UsersStackParams) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile', headerTitleAlign: 'center'}}
      />
      <Stack.Screen 
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{title: 'Edit Profile', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  )
}

export default UsersNavigation;