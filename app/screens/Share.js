import Content from '../components/Content'
import Text from '../components/Text'
import Friend from '../components/Friend'
import images from '../Variables/Images'
import { ScrollView, View, Modal, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Button from '../components/Button'
import * as SMS from 'expo-sms';
import numbers from '../Variables/Numbers';
import * as ImagePicker from 'expo-image-picker';

// export default Share = () => (
//   <Content>
//     <Text>Select Friends</Text>
//     <FriendList buttonText="Next" imageTitle="Dinosaur" />
//   </Content>
// )
export default Share = ({ navigation, route, buttonText, drawings }) => {
  // image is {name: string, uri: string}
  const [image, setImage] = useState({ name: drawings[0].name, uri: drawings[0].uri });
  const selectedDrawing = route?.params?.selectedDrawing ? route.params.selectedDrawing : null;
  const showModal = route?.params?.showModal === false ? route.params?.showModal : null;
  console.log("showModal", showModal)
  const { fromGallery } = route.params

  const [modalVisible, setModalVisible] = useState(true);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log("result", result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };
  useEffect(() => {
    if (fromGallery) {
      console.log("fromGallery")
      setModalVisible(false)
    }
    else {
      console.log("not from gallery")
      setModalVisible(true)
    }
  }, [fromGallery])
  useEffect(() => {
    if (selectedDrawing) {
      setImage(selectedDrawing);
    }
  }, [selectedDrawing])

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

  useEffect(() => {
    // declare the data fetching function
    const isSmsAvailable = async () => {
      const available = await SMS.isAvailableAsync();
      setIsAvailable(available)
    }

    // call the function
    isSmsAvailable()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // if (showModal !== false) {
  //     //   setModalVisible(true)
  //     //   console.log("collab: this runs", showModal, selectedDrawing)
  //     // }
  //     // else {
  //     //   setModalVisible(false)
  //     // }
  //     if(!fromGallery)
  //     setModalVisible(true)

  //   });
  //   return unsubscribe;
  // }, [navigation])


  // useEffect(async () => {
  //   const isSmsAvailable = await SMS.isAvailableAsync();
  //   setIsAvailable(isSmsAvailable)
  // }, [])

  // downloadImageFile = (uri) => {
  //   const file = new Blob([uriuri], {type: 'image/png'});
  // }

  const sendSMS = async (numbers) => {
    const { result } = await SMS.sendSMSAsync(
      numbers,
      `Check out my ${image.name} artwork!`,
      {
        attachments: {
          uri: image.uri,
          mimeType: 'image/png',
          filename: `${image.name}.png`,
          data: image.data
        },
      }
    ).catch(
      // console.error
      await SMS.sendSMSAsync(numbers, `Check out my ${image.name} artwork!`)
    )
    console.log(result)
  }

  return (
    <Content>
      <Text bold>Select friends</Text>

      <Modal
        animationType="none"
        transparent={false}
        visible={false}
      >
        <Content style={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: "center", paddingTop: 20, gap: 20 }}>
          <Text bold style={{ fontSize: 30 }}>Select an image</Text>
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
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          <Text>{image.name}</Text>
        </View>
        <View style={{ padding: 50, alignItems: 'center' }}>
          {isAvailable ? <Button onPress={() => { sendSMS([...selectedFriends].map(x => numbers[x])); setModalVisible(false) }} textSize={30}>{buttonText}</Button> : <Text>sms not available</Text>}
          <Text style={{ fontSize: 18, opacity: selectedFriends.size > 0 ? 1 : 0 }}>Selected {selectedFriends.size} friend{selectedFriends.size > 1 ? "s" : ""}</Text>
        </View>
      </View >
    </Content>
  )
}

