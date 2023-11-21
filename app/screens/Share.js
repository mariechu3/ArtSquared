import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'

export default Share = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text>Share</Text>
    {/* <LinkFarm navigation={navigation} route={route}/> */}
  </View>
)

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  menu: {
    width: 44,
    height: 44,

  }
})