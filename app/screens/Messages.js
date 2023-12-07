import React, { useState } from 'react'
import Text from '../components/Text'
import { Image, TouchableOpacity, Modal, StyleSheet, View, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Message from '../components/Message'


const styles = StyleSheet.create({
  divider: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 2,
  },
});


export default Messages = ({ }) => {

  return (
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      <Content style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', rowGap: 30 }}>
        <Message name="Becky" drawing="Dinosaur" message="You: can you add ..." />
        <View style={styles.divider}></View>

        <Message name="Marie" drawing="Dinosaur" message="I like burritos" />
        <View style={styles.divider}></View>

        <Message name="Leyth" drawing="Dinosaur" message="Just finished drawing ..." />
        <View style={styles.divider}></View>

        <Message name="David" drawing="Dinosaur" message="You: how was your ..." />
      </Content >
    </ScrollView>
  )
}
