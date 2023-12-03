import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './navigation/Navigation.js'
import { Image } from 'react-native-elements'
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

import Dinosaur from './assets/dinosaur.png'

const DinosaurUri = Image.resolveAssetSource(Dinosaur).uri;

export default function App() {
  // each item in here is of type {uri, name, pixels}
  const [drawings, setDrawings] = useState(
    [
      { uri: DinosaurUri, name: 'Dinosaur1', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur2', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur3', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur4', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur5', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur6', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur7', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur8', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur9', pixels: null },
      { uri: DinosaurUri, name: 'Dinosawur10', pixels: null },
    ])
  const addDrawing = (drawing) => {
    setDrawings(drawings => [...drawings, { ...drawing }])
    console.log("addedDrawing:", drawing.name)
  }
  const removeDrawing = (drawing) => {
    setSelectedFriends(drawings => drawings.filter(x => x.name != drawing.name))
    console.log("removeDrawing:", drawing.name)
  }
  return (
    <NavigationContainer>
      <Navigation drawings={drawings} addDrawing={addDrawing} removeDrawing={removeDrawing} />
    </NavigationContainer>

  )
}