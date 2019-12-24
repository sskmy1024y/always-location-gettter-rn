import React, { useState, useEffect } from 'react'

import LineLogin from 'react-native-line-sdk'
import { View, Text, Button, Alert, AsyncStorage } from 'react-native'
import LoginContainer from '../../containers/LoginContainer'
import styled from 'styled-components/native'

const BASE_URL = 'https://kiku-nyan.t-lab.cs.teu.ac.jp'

function Login() {
  const {
    loginState,
    lineLogin: loginToLine,
    kikuLogin: loginToKikunyan
  } = LoginContainer.useContainer()

  const getKikunyanID = async line_id => {
    fetch(`${BASE_URL}/api/users?line_user_id=${line_id}`)
      .then(async response => {
        const json = await response.json()
        if (!json.user_id) {
          Alert.alert('error', 'kikunyan was not registered.')
          return false
        }
        try {
          const kikunyan_data = await JSON.stringify(json)
          await AsyncStorage.setItem('kikunyan_data', kikunyan_data)
          loginToKikunyan()
        } catch (e) {
          Alert.alert('error', e.toString())
          return false
        }
      })
      .catch(err => Alert.alert('kikunyan error', err.toString()))
  }

  const onLogin = () => {
    if (loginState.line && !loginState.kikunyan) {
      LineLogin.getUserProfile().then(async user => {
        loginToLine()
        await getKikunyanID(user.profile.userID)
      })
    } else if (!loginState.line) {
      LineLogin.loginWithPermissions(['profile'])
        .then(async user => {
          loginToLine()
          await getKikunyanID(user.profile.userID)
        })
        .catch(err => {
          Alert.alert('login error', err.toString())
        })
    }
  }

  return (
    <Container>
      <Button title={'login'} onPress={onLogin}></Button>
      <Text>{`LINE Logged In: ${loginState.line}`}</Text>
      <Text>{`Kiku Logged In: ${loginState.kikunyan}`}</Text>
    </Container>
  )
}

const Container = styled.SafeAreaView`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Login
