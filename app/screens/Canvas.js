import React, { useState } from 'react'


import { Button, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, View, Text } from 'react-native'

const NUM_ROWS = 8
const NUM_COLS = 8
// NOTE: These constants will effect "backend" construction, components need to be updated manually

eraseColor = "#ffffff"
nonSelectColor = "#aaaaaa"
workingToolColor = "#555555"
undoRedoFadedBackground = "#f0f0f0"
undoRedoFadedText = "#e0e0e0"

/*~~~~~~~~~~~*\
| tool codes  |
| 0 -> draw   |
| 1 -> erase  |
\*~~~~~~~~~~~*/

class Action {
  constructor(colorNew, colorOld, row, col) {
    this.colorNew = colorNew;
    this.colorOld = colorOld
    this.row = row;
    this.col = col;
  }
}

var Actions = new Array;
var Redos = new Array;

export default Canvas = ({ navigation, route }) => {
  var emptyCanvas = new Array
  for (i = 0; i < NUM_ROWS * NUM_COLS; i++) {
      emptyCanvas[i] = eraseColor
  }
  
  rowCol2Index = (row, col) => {
    return (NUM_COLS * row) + col
  }

  const [canvasData, setCanvasData] = useState(emptyCanvas)
  const [drawCurColor, setDrawCurColor] = useState(selectedColor);
  const [eraseCurColor, setEraseCurColor] = useState("#aaaaaa");
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#000000');

  
  const [actionsLen, setActionsLen] = useState(Actions.length)
  const [redosLen, setRedosLen] = useState(Redos.length)
  const [actionStr, setActionStr] = useState("No actions yet")

  applyAction = (action) => {
    cd = [...canvasData]
    cd[rowCol2Index(action.row, action.col)] = action.colorNew
    setCanvasData(cd)
  }
  
  revertAction = (action) => {
    cd = [...canvasData]
    cd[rowCol2Index(action.row, action.col)] = action.colorOld
    setCanvasData(cd)
  }

  undo = () => {
    if (Actions.length < 1) {
      return false
    }
    action = Actions.pop()
    setActionsLen(Actions.length)
    revertAction(action)
    Redos = Redos.concat([action])
    setRedosLen(Redos.length);
    return true
  }

  redo = () => {
    if (Redos.length < 1) {
      return false
    }
    redo = Redos.pop()
    setRedosLen(Redos.length)
    applyAction(redo)
    Actions = Actions.concat([redo])
    setActionsLen(Actions.length)
    return true
  }

  _onDrawButtonPress = () => {
    setSelectedTool(0)
  }
  
  _onEraseButtonPress = () => {
    setSelectedTool(1)
  }

  Pixel = props => {
    _onPressButton = () => {
      newColor = selectedColor  // By default assume the draw tool
      if (selectedTool == 1) {  // If the tool is the erase tool, use the erase color
        newColor = eraseColor;
      }
      if (newColor != canvasData[rowCol2Index(props.row, props.col)]) {
        action = new Action(newColor, canvasData[rowCol2Index(props.row, props.col)], props.row, props.col)
        Actions = Actions.concat([action])
        setActionsLen(Actions.length);
        Redos = []
        setRedosLen(Redos.length);
        cd = [...canvasData]
        cd[rowCol2Index(props.row, props.col)] = newColor
        setCanvasData(cd);  // Set the current color to the new color.
      }
    }
  
    return (
      <TouchableWithoutFeedback onPress={this._onPressButton} >
        <View style={styles.pixel} backgroundColor={canvasData[rowCol2Index(props.row, props.col)]/*[this.col]*/}>
         
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  Row = props => {
    return (
      <View style={styles.row}>
        <Pixel col={0} row={props.row}/>
        <Pixel col={1} row={props.row}/>
        <Pixel col={2} row={props.row}/>
        <Pixel col={3} row={props.row}/>
        <Pixel col={4} row={props.row}/>
        <Pixel col={5} row={props.row}/>
        <Pixel col={6} row={props.row}/>
        <Pixel col={7} row={props.row}/>
      </View>
    );
  }
  
  function Tools() {
    onDrawButtonPress = () => {
      setSelectedTool(0);
    }
   
    onEraseButtonPress = () => {
      setSelectedTool(1);
    }

    return (
      <View style={styles.toolbar}>
        {/* Draw Button */}
        <TouchableWithoutFeedback onPress={this.onDrawButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 0 ? selectedColor : nonSelectColor}>
            <Text style={styles.buttonText, {color: selectedTool == 0 ? selectedColor : 'gray'}}>Draw</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Erase Button */}
        <TouchableWithoutFeedback onPress={this.onEraseButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 1 ? eraseColor : nonSelectColor}>
            <Text style={styles.buttonText, {color: selectedTool == 1 ? eraseColor : 'gray'}}>Erase</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Undo Button */}
        <TouchableWithoutFeedback onPress={this.undo} >
          <View style={styles.tool} backgroundColor={actionsLen > 0? nonSelectColor : undoRedoFadedBackground} borderColor={actionsLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            <Text style={styles.buttonText, {color: actionsLen > 0? workingToolColor : undoRedoFadedText}}>Undo</Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Redo Button */}
        <TouchableWithoutFeedback onPress={this.redo} >
          <View style={styles.tool} backgroundColor={redosLen > 0? nonSelectColor : undoRedoFadedBackground} borderColor={redosLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            <Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  
  ColorSelect = props => {
    const [clr, setClr] = useState(props.color)

    onSelectColor = () => {
      setSelectedColor(clr)
    }
    return (
      <TouchableWithoutFeedback onPress={this.onSelectColor}>
        <View style={styles.colorSelect} backgroundColor={clr} borderColor={selectedColor == clr ? '#000000' : clr}>
          
        </View>
      </TouchableWithoutFeedback>
    );
  }
//{actionsLen > 0 ? "#ffffff" : workingToolColor}

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
        <View style={styles.toolbar}>
          <ColorSelect color={'#ff0000'}/>
          <ColorSelect color={'#00ff00'}/>
          <ColorSelect color={'#0000ff'}/>
        </View>
        { <Text style={styles.buttonText}>Actions: {actionsLen}</Text> } 
        { <Text style={styles.buttonText}>Redos: {redosLen}</Text> } 
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
    marginTop: 20,
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
    backgroundColor: '#ffffff',
    flexDirection:"row",
  },
  colorSelect: {
    width: 44,
    height: 44,
    margin: 0.5,
    marginHorizontal: 0.5,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection:"row",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 2,
    borderColor: nonSelectColor,
  },
  tool: {
    height: 44,
    alignItems: 'center',
    backgroundColor: nonSelectColor,
    flexDirection:"row",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 2,
    borderColor: nonSelectColor,
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
    color: 'gray',
  },
})


