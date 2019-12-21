import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundGeolocation, { Location } from 'react-native-background-geolocation'

export default function App() {
  const [text, setText] = useState('')

  useEffect(() => {
    BackgroundGeolocation.onLocation(onLocation)

    BackgroundGeolocation.ready(
      {
        distanceFilter: 10,
        startOnBoot: true,
        debug: true,
        stopTimeout: 1
      },
      state => {
        console.log('- BackgroundGeolocation is ready: ', state)

        if (!state.enabled) {
          BackgroundGeolocation.start(function() {
            console.log('- Start success')
          })
        }
      }
    )
  })

  function onLocation(location: Location) {
    setText(`${JSON.stringify(location)}`)
    console.log('[location] -', location)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Text>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})
