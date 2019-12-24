import React from 'react'

import LineLogin from 'react-native-line-sdk'
import { View, Button, Alert } from 'react-native'

function Login() {
  const onPress = () => {
    LineLogin.loginWithPermissions(['profile'])
      .then(user => {
        Alert.alert('login success', user.profile.displayName)
      })
      .catch(err => {
        Alert.alert('login error', err.toString())
      })
  }

  return (
    <View>
      <Button title={'login'} onPress={onPress}></Button>
    </View>
  )
}

export default Login
