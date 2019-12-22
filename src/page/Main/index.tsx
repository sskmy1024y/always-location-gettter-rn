import React, { useEffect } from 'react'
import { View, FlatList, Text, SafeAreaView } from 'react-native'
import { ListItem, Left } from 'native-base'
import { Provider, useContainer } from '../../containers/LocationContainer'
import BackgroundGeolocation from 'react-native-background-geolocation'

function Main() {
  const { log, addLog } = useContainer()

  useEffect(() => {
    BackgroundGeolocation.onLocation(addLog)

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

  return (
    <SafeAreaView>
      <FlatList
        data={log}
        renderItem={({ item }) => (
          <ListItem first>
            <Left>
              <Text>{item.timestamp}</Text>
            </Left>
          </ListItem>
        )}
        keyExtractor={item => item.uuid}
      />
    </SafeAreaView>
  )
}

export default Main
