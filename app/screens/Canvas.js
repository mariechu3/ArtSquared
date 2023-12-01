import React, { useState } from 'react'


import { Button, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'

selectedColor = "#000000"
eraseColor = "#ffffff"
selectedTool = 0
/*~~~~~~~~~~~*\
| tool codes  |
| 0 -> draw   |
| 1 -> erase  |
\*~~~~~~~~~~~*/

export default Canvas = ({ navigation, route }) => (
  <View style={styles.screen}>
    <Text>Canvas</Text>
    {/* <LinkFarm navigation={navigation} route={route} /> */}
    <DrawingCanvas/>
  </View>
)


_onColorButtonPress = () => {
  selectedColor = "#ff0000"
}


_onDrawButtonPress = () => {
  selectedTool = 0
}


_onEraseButtonPress = () => {
  selectedTool = 1
}


function Pixel() {
  const [curColor, setCurColor] = useState("#ffffff");


  _onPressButton = () => {
    if (selectedTool == 0) {
      setCurColor(selectedColor);
    }
    if (selectedTool == 1) {
      setCurColor(eraseColor);
    }
  }


  return (
    <TouchableWithoutFeedback onPress={this._onPressButton} >
      <View style={styles.pixel} backgroundColor={curColor}>
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


function Tools() {
  const [drawCurColor, setDrawCurColor] = useState(selectedColor);
  const [eraseCurColor, setEraseCurColor] = useState("#aaaaaa");
 
  nonSelectColor = "#aaaaaa"
  selectEraseColor = "#555555"


  _onDrawButtonPressLocal = () => {
    this._onDrawButtonPress()
    this._onToolButtonPress();
  }
 
  _onEraseButtonPressLocal = () => {
    this._onEraseButtonPress()
    this._onToolButtonPress();
  }


  _onToolButtonPress = () => {
    if (selectedTool == 0) {
      setDrawCurColor(selectedColor);
      setEraseCurColor(nonSelectColor)
    }
    if (selectedTool == 1) {
      setDrawCurColor(nonSelectColor);
      setEraseCurColor(selectEraseColor)
    }
  }


  return (
    <View style={styles.toolbar}>
      <TouchableWithoutFeedback onPress={this._onDrawButtonPressLocal} >
        <View style={styles.tool} backgroundColor={drawCurColor}>
          <Text style={styles.buttonText}>Draw</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={this._onEraseButtonPressLocal} >
        <View style={styles.tool} backgroundColor={eraseCurColor}>
          <Text style={styles.buttonText}>Erase</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};


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
      <View style={styles.toolbar}>
        <Tools/>
      </View>
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
    margin: 1,
    marginHorizontal: 1,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    flexDirection:"row",
  },
  tool: {
    height: 44,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    flexDirection:"row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection:"row",
  },
  drawingCanvas: {
    alignItems: 'center',
  },
  toolbar: {
    flexDirection:"row",
    margin: 5,
  },
  buttonText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
})


