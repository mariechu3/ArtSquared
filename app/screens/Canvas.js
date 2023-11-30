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

export default Canvas = ({ navigation, route }) => {
  const [canvasData, setCanvasData] = useState(new Array(new Array))

  _onDrawButtonPress = () => {
    selectedTool = 0
  }
  
  _onEraseButtonPress = () => {
    selectedTool = 1
  }
  
  class Action {
    constructor(colorNew, colorOld, row, col) {
      this.colorNew = colorNew;
      this.colorOld = colorOld
      this.row = row;
      this.col = col;
    }
  }
  
  var Actions = new Array;
  
  Pixel = props => {
    const [curColor, setCurColor] = useState("#ffffff");
  
    _onPressButton = () => {
      newColor = selectedColor  // By default assume the draw tool
      if (selectedTool == 1) {  // If the tool is the erase tool, use the erase color
        newColor = eraseColor;
      }
  
      action = new Action(newColor, curColor, this.row, this.col)
      Actions.push(action)
      setCurColor(newColor);  // Set the current color to the new color.
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
        <Pixel col={0} row={this.row}/>
        <Pixel col={1} row={this.row}/>
        <Pixel col={2} row={this.row}/>
        <Pixel col={3} row={this.row}/>
        <Pixel col={4} row={this.row}/>
        <Pixel col={5} row={this.row}/>
        <Pixel col={6} row={this.row}/>
        <Pixel col={7} row={this.row}/>
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
        setEraseCurColor(selectEraseColor);
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
    // var Rows = new Array();
    // for (i = 0; i < props.Rows; i++) {
    //   Rows[i] = <Row row={i} Cols={this.Cols}/>
    // }
    return (
      <View style={styles.drawingCanvas}>
        <Row row={0}/>
        <Row row={1}/>
        <Row row={2}/>
        <Row row={3}/>
        <Row row={4}/>
        <Row row={5}/>
        <Row row={6}/>
        <Row row={7}/>
        <View style={styles.toolbar}>
          <Tools/>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      {/* <LinkFarm navigation={navigation} route={route} /> */}
      <DrawingCanvas/>
    </View>
  )
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
    margin: 0.5,
    marginHorizontal: 0.5,
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


