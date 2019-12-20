import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BackgroundGeolocation, { Location } from 'react-native-background-geolocation'

export default function App() {
  useEffect(() => {
    BackgroundGeolocation.onLocation(onLocation)
  })

  function onLocation(location: Location) {
    console.log('[location] -', location)
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
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
