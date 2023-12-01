import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigation/Navigation.js'
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications


export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>

  )
}