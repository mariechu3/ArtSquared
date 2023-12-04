import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'

export default Collaborate = ({ showModal, route, navigation, drawings }) => {
  const [image, setImage] = useState({ name: drawings[0].name, uri: drawings[0].uri });
  const selectedDrawing = route?.params?.selectedDrawing ? route.params.selectedDrawing : null;
  const modalShow = route?.params?.showModal === false ? route.params.showModal : null;


  useEffect(() => {
    if (selectedDrawing) {
      setImage(selectedDrawing);
    }
  }, [selectedDrawing])


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (modalShow !== false)
        setModalVisible(showModal)
    });
    return unsubscribe;
  }, [navigation])


  const [modalVisible, setModalVisible] = useState(showModal);

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
    <Content>
      <Text>Select collaborators</Text>

      <Modal
        animationType="none"
        transparent={false}
        visible={modalVisible}
      >
        <Content style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: "center", paddingTop: 20, gap: 20 }}>
          <Text style={{ fontSize: 30 }}>Select an image</Text>
          <ScrollView vertical showsVerticalScrollIndicator={false}>

            <View style={{ width: "100%", display: 'flex', flexWrap: 'wrap', flexDirection: 'row', rowGap: 30 }}>
              {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
              {drawings.map((image) => {
                return (
                  <TouchableOpacity key={image.name} onPress={() => { setModalVisible(false); setImage(image) }} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 150, display: "flex", alignItems: 'center' }}>
                    <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
                    <Text>{image.name}</Text>
                  </TouchableOpacity>
                );
              })}

              {/* <Button onPress={pickImage} textSize={30}>Choose from camera roll</Button>
            <Button onPress={() => setModalVisible(false)} textSize={30}>Next</Button> */}

            </View>
          </ScrollView>

        </Content>
      </Modal>
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
          <Image style={{ width: 200, height: 200 }} source={{ uri: image.uri }} />
          <Text>{image.name}</Text>
        </View>
        <View style={{ padding: 50, alignItems: 'center' }}>
          <Button onPress={() => navigation.navigate("Canvas", { selectedDrawing: image })} textSize={24}>Add collaborators</Button>
          <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
        </View>
      </View >
    </Content>
  )
}
