import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import SearchScreen from '../screens/SearchScreen'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: 'Geri',
          headerTintColor: "#fff",
          headerBackTitleStyle: {color: '#fff'},
          headerStyle: {backgroundColor: '#3D8EB9'},
        }}>
        <Stack.Screen
          name='Search'
          component={SearchScreen}
          options={{title: 'Github Kullanıcıları'}}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{title: 'Kullanıcı Profili'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator
