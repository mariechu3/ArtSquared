import React from 'react'
import { Button, Text, View, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Root = createStackNavigator()

const Screen1 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 1</Text>
    <TouchableOpacity onPress={() => navigation.push('Screen2')}>
      <Image style={styles.menu} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} />
    </TouchableOpacity>

  </View>
)

const Screen2 = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text style={styles.title}>Screen 2</Text>
    <Button
      title="Go back"
      onPress={() => {
        navigation.pop()
      }}
    />
  </View>
)

export default function App() {
  return (
    <NavigationContainer>
      <Root.Navigator>
        <Root.Screen name="Screen1" options={{
          title: 'Art^2',
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: '#D9D9D9',
            height:80,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            paddingLeft: 24
          },
        }} component={Screen1} />
        <Root.Screen name="Screen2" component={Screen2} />
      </Root.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    // alignItems: 'center',
    backgroundColor: '#00FF00'
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  menu: {
    width: 44,
    height: 44,
    margin: 100

  }
})