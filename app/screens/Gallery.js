import React, { useState } from 'react'
import Text from '../components/Text'
import { Image, TouchableOpacity, Modal, StyleSheet, View } from 'react-native'
import images from '../Variables/Images'
import { Icon } from 'react-native-elements'

export default Gallery = ({ navigation, screen }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Content style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ flexGrow: 1, display: "flex", alignItems: 'center' }}>
        <Image style={{ width: 150, height: 150 }} source={images['Dinosaur']} />
        <Text>Dinosaur</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Icon size={20} type="ionicon" name="close" />
          </TouchableOpacity>
          <View style={{ display: 'flex', width: '100%', height: '85%', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={styles.action}
              onPress={() => { navigation.navigate('Share'); setModalVisible(!modalVisible) }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Icon
                  size={24}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-share-outline" : "md-share-outline"}
                />
                <Text>Share</Text>

              </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => { navigation.navigate('Collaborate'); setModalVisible(!modalVisible) }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Icon
                  size={24}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-people-outline" : "md-people-outline"}
                />
                <Text>Collaborate</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => { setModalVisible(!modalVisible) }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Icon
                  size={24}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-trash-outline" : "md-trash-outline"}
                />
                <Text>Delete</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider}></View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => { setModalVisible(!modalVisible) }}>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Icon
                  size={24}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-create-outline" : "md-create-outline"}
                />
                <Text>Rename</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal >

    </Content >
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 'auto',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation: 5,
  },
  action: {
    alignItems: 'center',
  },
  divider: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
  button: {
    borderRadius: 20,
    padding: 5,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-end'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
