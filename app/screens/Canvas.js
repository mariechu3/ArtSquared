import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback } from 'react-native'
import { StyleSheet, View, Text} from 'react-native'
import { Icon } from 'react-native-elements'
import { TriangleColorPicker, toHsv } from 'react-native-color-picker'

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
  const [selectedTool, setSelectedTool] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [actionsLen, setActionsLen] = useState(Actions.length)
  const [redosLen, setRedosLen] = useState(Redos.length)
  const [pickerShow, setPickerShow] = useState(false)
  const [gridShow, setGridShow] = useState(true)

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
        <View style={styles.pixel} margin={gridShow ? 0.5 : 0} marginHorizontal={gridShow ? 0.5 :0} backgroundColor={canvasData[rowCol2Index(props.row, props.col)]/*[this.col]*/}>
         
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

    onPickerPress = () => {
      setPickerShow(!pickerShow);
    }

    onGridPress = () => {
      setGridShow(!gridShow);
    }

    return (
      <View style={styles.toolbar}>
        {/* Draw Button */}
        <TouchableWithoutFeedback onPress={this.onDrawButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 0 ? selectedColor : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: selectedTool == 0 ? selectedColor : 'gray'}}>Draw</Text>*/}
            <Icon color={selectedTool == 0 ? selectedColor : 'gray'} size={25} type='ionicon' name='brush'/>
          </View>
        </TouchableWithoutFeedback>

        {/* Erase Button */}
        <TouchableWithoutFeedback onPress={this.onEraseButtonPress} >
          <View style={styles.tool} borderColor={selectedTool == 1 ? eraseColor : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: selectedTool == 1 ? eraseColor : 'gray'}}>Erase</Text>*/}
            <Icon color={selectedTool == 1 ? eraseColor : 'gray'} size={25} type='ionicon' name='backspace' />
          </View>
        </TouchableWithoutFeedback>

        {/* Undo Button */}
        <TouchableWithoutFeedback onPress={this.undo} >
          <View style={styles.tool} backgroundColor={actionsLen > 0? nonSelectColor : undoRedoFadedBackground} borderColor={actionsLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            {/*<Text style={styles.buttonText, {color: actionsLen > 0? workingToolColor : undoRedoFadedText}}>Undo</Text>*/}
            <Icon color={actionsLen > 0? workingToolColor : undoRedoFadedText} size={25} type='ionicon' name='arrow-undo' />
          </View>
        </TouchableWithoutFeedback>

        {/* Redo Button */}
        <TouchableWithoutFeedback onPress={this.redo} >
          <View style={styles.tool} backgroundColor={redosLen > 0? nonSelectColor : undoRedoFadedBackground} borderColor={redosLen > 0 ? nonSelectColor : undoRedoFadedBackground}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={redosLen > 0? workingToolColor : undoRedoFadedText} size={25} type='ionicon' name='arrow-redo' />
          </View>
        </TouchableWithoutFeedback>
        
        {/* Pallette Button */}
        <TouchableWithoutFeedback onPress={this.onPickerPress} >
          <View style={styles.tool} borderColor={pickerShow ? 'black' : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={pickerShow ? 'black' : 'gray'} size={25} type='ionicon' name='color-palette' />
          </View>
        </TouchableWithoutFeedback>

        {/* Grid Button */}
        <TouchableWithoutFeedback onPress={this.onGridPress} >
          <View style={styles.tool} borderColor={gridShow ? 'black' : nonSelectColor}>
            {/*<Text style={styles.buttonText, {color: redosLen > 0? workingToolColor : undoRedoFadedText}}>Redo</Text>*/}
            <Icon color={gridShow ? 'black' : 'gray'} size={25} type='ionicon' name='grid-outline' />
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

    onLongPressColor = () => {
      setModalVisible(true)
    }

    return (
      <TouchableWithoutFeedback onPress={this.onSelectColor} onLongPress={onLongPressColor}>
        <View style={styles.colorSelect} backgroundColor={clr} borderColor={selectedColor == clr ? '#000000' : clr}>
          
        </View>
      </TouchableWithoutFeedback>
    );
  }

  DrawingCanvas = props => {
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
          <ColorSelect color={'#ffff00'}/>
          <ColorSelect color={'#FA9D00'}/>
          <ColorSelect color={'#ED3624'}/>
          
          <ColorSelect color={'#a9ff17'}/>
          <ColorSelect color={'#60ba46'}/>
          <ColorSelect color={'#00733b'}/>

          <ColorSelect color={'#969696'}/>
        </View>
        <View style={styles.toolbar}>
          <ColorSelect color={'#FF00d4'}/>
          <ColorSelect color={'#a400c7'}/>
          <ColorSelect color={'#622d90'}/>

          <ColorSelect color={'#006fff'}/>
          <ColorSelect color={'#1749b3'}/>
          <ColorSelect color={'#120377'}/>

          <ColorSelect color={'#000000'}/>
        </View>
      </View>
    );
  }

  Picker = () => {
    pickerSelectColor = color => {
      setSelectedColor(color)
      setPickerShow(false)
    }
    return (
      <View style={styles.picker}>
        <TriangleColorPicker
          oldColor={selectedColor}
          onColorSelected={color => pickerSelectColor(color)}
          rotationHackFactor={0}
          style={{flex: 1}}
        />
      </View>
    )
  }

  return (
    <View style={styles.screen, {flex: 1, padding: 10}}>
      <DrawingCanvas/>
      {pickerShow == true ? (<Picker/>) : null }
    </View> 
  )
}

    /*<View style={styles.screen}>
      <DrawingCanvas/>
    </View>*/




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
  picker: {
    flex: 1,
    padding: 0,
    paddingBottom: 40,
    paddingHorizontal: 50,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    backgroundColor: '#f2f2f2'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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


