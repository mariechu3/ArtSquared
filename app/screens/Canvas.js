import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'


export default Canvas = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text>Canvas</Text>
    {/* <LinkFarm navigation={navigation} route={route} /> */}
    <DrawingCanvas/>
  </View>
)

function Pixel() {
  const [isClicked, setIsClicked] = useState(false);

  _onPressButton = () => {
    setIsClicked(!isClicked);
  }

  return (
    <TouchableWithoutFeedback onPress={this._onPressButton} >
      <View style={styles.pixel} backgroundColor={isClicked ? "#000000" : "#ffffff"}>
       {/* <Text style={styles.buttonText}>TouchableWithoutFeedback</Text> */}
      </View>
    </TouchableWithoutFeedback>
  );
};

Row = props => {
  return (
    <View style={styles.row}>
      <Pixel/><Pixel/><Pixel/><Pixel/><Pixel/><Pixel/><Pixel/><Pixel/>
    </View>
  );
}

DrawingCanvas = props => {
  return (
    <View style={styles.drawingCanvas}>
      <Row/>
      <Row/>
      <Row/>
      <Row/>
      <Row/>
      <Row/>
      <Row/>
      <Row/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    padding: 20,
    fontSize: 42,
  },
  menu: {
    width: 44,
    height: 44,

  },
  pixel: {
    width: 44,
    height: 44,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    flexDirection:"row",
  },
  row: {
    alignItems: 'center',
    flexDirection:"row",
  },
  drawingCanvas: {
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
})