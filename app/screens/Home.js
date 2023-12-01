import React from 'react'
import Content from '../components/Content'
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../components/Button';
import images from '../Variables/Images'

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 42,
  },
})

export default Home = () => (
  <Content style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
    <Text style={styles.title}>Art^2</Text>
    <View style={{ flexGrow: 1 }}>
      <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={images.Marie} />
    </View>
    <Button textSize={36}>Create</Button>
    <Button textSize={36}>Collaborate</Button>
  </Content>
)


