import React from 'react'
import Content from '../components/Content'
import { StyleSheet, View, Image } from 'react-native';
import Button from '../components/Button';
import Text from '../components/Text'

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 56,
  },
  image: {
    width: 310,
    height: 310
  }
})

export default Home = ({ drawings, navigation, screen }) => {
  return (
    <Content style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', flex: 1 }}>
      <Text bold style={[styles.title, { fontSize: 56, fontFamily: 'Mina_700Bold' }]}>Art^2</Text>

      <View style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image style={styles.image} source={{ uri: drawings[Math.floor(Math.random() * drawings.length)].uri }} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Button style={{width: 150}} textSize={24} onPress={() => navigation.navigate('Gallery')}>My Gallery</Button>
        <Button style={{width: 150}} textSize={24} onPress={() => navigation.navigate("Lessons")}>Lessons</Button>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Button style={{width: 150}} textSize={24} onPress={() => navigation.navigate("Collaborate")}>Collaborate</Button>
        <Button style={{width: 150}} textSize={24} onPress={() => navigation.navigate("Canvas")}>Create</Button>
      </View>
    </Content >
  )
}


