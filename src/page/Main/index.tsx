import React, { useEffect, useState } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Header, Title, Body } from 'native-base'
import BackgroundGeolocation from 'react-native-background-geolocation'
import LoginContainer from '../../containers/LoginContainer'
import Login from '../Login'
import DeviceInfoList from '../../components/DeviceInfoList'

const BASE_URL = 'https://kiku-nyan.t-lab.cs.teu.ac.jp'

function Main() {
  const { loginState } = LoginContainer.useContainer()

  const [kikunyanData, setKikunyanData] = useState(null)

  useEffect(() => {
    AsyncStorage.getItem('kikunyan_data').then(itemValue => setKikunyanData(JSON.parse(itemValue)))
  }, [loginState])

  useEffect(() => {
    BackgroundGeolocation.onLocation(location => {
      console.log(location)
    })

    BackgroundGeolocation.onHttp(response => {
      console.log('[onHttp] ', response)
    })

    BackgroundGeolocation.setConfig({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true
    }).then(state => {
      console.log('[setConfig] success: ', state)
    })

    BackgroundGeolocation.ready(
      {
        // 位置情報に関する設定
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 10,
        stationaryRadius: 50,
        locationUpdateInterval: 1000,
        fastestLocationUpdateInterval: 5000,

        // アクティビティ認識の初期設定
        activityType: BackgroundGeolocation.ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION,
        activityRecognitionInterval: 5000,
        stopTimeout: 5,

        // HTTP送信を行う
        url: `${BASE_URL}/api/locations`,
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          user_id: kikunyanData?.user_id
        },
        method: 'POST',
        autoSync: true,

        // アプリケーションの設定
        debug: false,
        stopOnTerminate: false,
        startOnBoot: true,
        maxRecordsToPersist: 50
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
    <View>
      <Header>
        <Body>
          <Title>きくにゃんトラッキング</Title>
        </Body>
      </Header>
      <DeviceInfoList />
    </View>
  )
}

export default Main
