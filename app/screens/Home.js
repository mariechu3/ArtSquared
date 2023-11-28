import React from 'react'
import Content from '../components/Content'
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 42,
  },
})

export default Home = () => (
  <Content>
    <Text style={styles.title}>Art^2</Text>
  </Content>
)


