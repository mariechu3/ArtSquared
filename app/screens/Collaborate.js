import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Image } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button'
import Dinosaur from '../assets/dinosaur.png'

const DinosaurUri = Image.resolveAssetSource(Dinosaur).uri
const FriendList = ({ buttonText, imageTitle, navigation }) => {

  const [selectedFriends, setSelectedFriends] = useState(new Set())
  const addFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends, name]))
    console.log("addFriend:", selectedFriends)
  }
  const removeFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends].filter(x => x !== name)))
    console.log("removeFriend:", selectedFriends)
  }



  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
        <View style={{ display: 'flex', flexDirection: 'row', columnGap: '8' }}>
          <Friend name="Leyth" addFriend={addFriend} removeFriend={removeFriend} picture={images["Leyth"]} />
          <Friend name="Marie" addFriend={addFriend} removeFriend={removeFriend} picture={images["Marie"]} />
          <Friend name="David" addFriend={addFriend} removeFriend={removeFriend} picture={images["David"]} />
          <Friend name="Becky" addFriend={addFriend} removeFriend={removeFriend} picture={images["Becky"]} />
        </View>
      </ScrollView>
      <View style={{ flexGrow: 1, display: "flex", alignItems: 'center' }}>
        <Image style={{ width: 200, height: 200 }} source={images[imageTitle]} />
        <Text>{imageTitle}</Text>
      </View>
      <View style={{ padding: 50, alignItems: 'center' }}>
        <Button onPress={() => navigation.navigate("Canvas")} textSize={24}>{buttonText}</Button>
        <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
      </View>
    </View >
  )
}

export default Collaborate = ({ navigation, screen }) => (
  <Content>
    <Text>Select Friends</Text>
    <FriendList buttonText="Add collaborators" imageTitle="Dinosaur" navigation={navigation} />
  </Content>
)