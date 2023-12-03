import React from 'react'
import Text from '../components/Text'
import Content from '../components/Content'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ScrollView } from 'react-native-gesture-handler'


export default Lessons = () => {

  return (
    <ScrollView>
      <YoutubePlayer
        height={230}
        play={false}
        videoId={'ye21r27kN9I'}
      />
      <Text textAlign='center'>  {"Lines and Curves"}</Text>
      <Text>{""}</Text>

      <YoutubePlayer
        height={230}
        play={false}
        videoId={'u7v4uEDwW9o'}
      />
      <Text textAlign='center'> {"Shading"}</Text>
      <Text>{""}</Text>

      <YoutubePlayer
        height={300}
        play={false}
        videoId={'NDno0U5UxSI'}
      />
      <Text textAlign='center'> {"Tips from a Master"}</Text>
      <Text>{""}</Text>
    </ScrollView>
  )
}