import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default Canvas = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text>Canvas</Text>
    {/* <LinkFarm navigation={navigation} route={route} /> */}
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