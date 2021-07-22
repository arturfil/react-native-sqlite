import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import EditScreen from '../screens/EditScreen';
import HomeScreen from '../screens/HomeScreen';

export type CryptoStackParams = {
  HomeScreen: undefined;
  EditScreen: { routedId?: number, routedName?: string }
}

const Stack = createStackNavigator<CryptoStackParams>();

const CryptosNavigation = (stack: CryptoStackParams) => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'transparent'
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Home', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="EditScreen"
        component={EditScreen}
      options={{title: 'Edit Crypto', headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  )
}

export default CryptosNavigation
