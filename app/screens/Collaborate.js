import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinkFarm from '../components/LinkFarm'

export default Collaborate = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text>Collaborate</Text>
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