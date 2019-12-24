import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { View, FlatList, Text, SafeAreaView, AsyncStorage } from 'react-native'
import { ListItem, Left } from 'native-base'
import LocationContainer from '../../containers/LocationContainer'
import BackgroundGeolocation from 'react-native-background-geolocation'
import LoginContainer from '../../containers/LoginContainer'
import Login from '../Login'

function Main() {
  const { loginState } = LoginContainer.useContainer()
  const { log, addLog } = LocationContainer.useContainer()

  const [kikunyanData, setKikunyanData] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('kikunyan_data').then(itemValue => setKikunyanData(JSON.parse(itemValue)))
  }, [loginState])

  useEffect(() => {
    BackgroundGeolocation.onLocation(addLog)

    BackgroundGeolocation.ready(
      {
        distanceFilter: 10,
        startOnBoot: true,
        debug: false,
        stopTimeout: 1
      },
      state => {
        console.log('- BackgroundGeolocation is ready: ', state)

        if (!state.enabled && kikunyanData?.user_id) {
          BackgroundGeolocation.start(function() {
            console.log('- Start success')
          })
        }
      }
    )
  }, [kikunyanData])

  if (!loginState.kikunyan && kikunyanData === null) {
    return <Login />
  }

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
