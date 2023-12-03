import React from 'react'
import Content from '../components/Content'
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Button from '../components/Button';
import images from '../Variables/Images'
import Text from '../components/Text'

const styles = StyleSheet.create({
  title: {
    padding: 20,
    fontSize: 42,
  },
  image: {
    width: 300,
    height: 300
  }
})

export default Home = ({ drawings, navigation, screen }) => {
  return (
    <Content style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', flex: 1 }}>
      <Text style={styles.title}>Art^2</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>

        <View style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image style={styles.image} source={{ uri: drawings[Math.floor(Math.random() * drawings.length)].uri }} />
        </View>
      </ScrollView>
      <Button textSize={36} onPress={() => navigation.navigate('Gallery')}>My Gallery</Button>
      <Button textSize={36} onPress={() => navigation.navigate("Collaborate")}>Collaborate</Button>
      <Button textSize={36} onPress={() => navigation.navigate("Canvas")}>Create</Button>
    </Content >
  )
}


