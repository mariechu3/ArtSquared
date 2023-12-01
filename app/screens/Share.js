import Content from '../components/Content'
import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import Dinosaur from '../assets/dinosaur.png'
import * as SMS from 'expo-sms';
import numbers from '../Variables/Numbers'

const DinosaurUri = Image.resolveAssetSource(Dinosaur).uri
const FriendList = ({ buttonText, imageTitle }) => {
  const [isAvailable, setIsAvailable] = useState(false);

  const [selectedFriends, setSelectedFriends] = useState(new Set())
  const addFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends, name]))
    console.log("addFriend:", selectedFriends)
  }
  const removeFriend = (name) => {
    setSelectedFriends(friends => new Set([...friends].filter(x => x !== name)))
    console.log("removeFriend:", selectedFriends)
  }

  useEffect(async () => {
    const isSmsAvailable = await SMS.isAvailableAsync();
    setIsAvailable(isSmsAvailable)
  }, [])

  const sendSMS = async (numbers) => {
    const { result } = await SMS.sendSMSAsync(
      numbers,
      'Check out my artwork!',
      {
        attachments: {
          uri: DinosaurUri,
          mimeType: 'image/png',
          filename: '../assets/dinosaur.png',
        },
      }
    )
    console.log(result)
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
        {isAvailable ? <Button onPress={() => sendSMS([...selectedFriends].map(x => numbers[x]))} textSize={30}>{buttonText}</Button> : <Text>sms not available</Text>}
        <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
      </View>
    </View >
  )
}

export default Share = () => (
  <Content>
    <Text>Select Friends</Text>
    <FriendList buttonText="Next" imageTitle="Dinosaur" />
  </Content>
)