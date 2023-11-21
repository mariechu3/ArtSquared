import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, Pressable } from 'react-native'
import Home from './screens/Home.js'
import Share from './screens/Share.js'
import Canvas from './screens/Canvas.js'
import Collaborate from './screens/Collaborate.js'
import Lessons from './screens/Lessons.js'
import Gallery from './screens/Gallery.js'
import Hamburger from './components/Hamburger.js'
import Navigation from './navigation/Navigation.js'
import { Icon } from 'react-native-elements'
// import Icon from 'react-native-ionicons'

const Root = createStackNavigator()
// const [show, setShow] = useState(false);


// const headerConfig =
// {
//   headerStyle: {
//     backgroundColor: '#D9D9D9',
//     height: 80,
//   },

//   headerTintColor: '#000',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//     paddingLeft: 24
//   },
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    paddingLeft: 10
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

// const headerConfig = {
//   headerLeft: () =>
//     <Text>left</Text>
//   ,
//   headerRight: ({ navigation, route }) =>
//     <Hamburger navigation={navigation} route={route} />

// };

const headerConfig = {

  headerLeft: (navigation) =>
    <Pressable
      android_ripple={{
        color: '#666666',
        foreground: true,
        borderless: true,
      }}
      onPress={() => { navigation.openDrawer() }}>

      <Icon
        style={{ paddingRight: 10 }}
        size={44}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
      />
    </Pressable>

}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Root.Navigator>
//         <Root.Screen name="Home" options={{ ...headerConfig, title: "Home" }} component={Home} />
//         <Root.Screen name="Canvas" options={{ ...headerConfig, title: "Canvas" }} component={Canvas} />
//         <Root.Screen name="Collaborate" options={{ ...headerConfig, title: "Collaborate" }} component={Collaborate} />
//         <Root.Screen name="Lessons" options={{ ...headerConfig, title: "Lessons" }} component={Lessons} />
//         <Root.Screen name="Share" options={{ ...headerConfig, title: "Share" }} component={Share} />
//         <Root.Screen name="Gallery" options={{ ...headerConfig, title: "Gallery" }} component={Gallery} />
//       </Root.Navigator>
//     </NavigationContainer>
//   )
// }

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  )
}