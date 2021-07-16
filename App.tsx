import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScreenTabs from './src/navigation/ScreenTabs';
import { DatabaseProvider } from './src/database/DatabaseContext';

const App = () => {
  const Stack = createStackNavigator();
  const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
      <DatabaseProvider>
        {children}
      </DatabaseProvider>
    )
  }

  return (
    <NavigationContainer>
      <AppState>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={ScreenTabs} />
        </Stack.Navigator>
      </AppState>
    </NavigationContainer>
  )
}

export default App;
