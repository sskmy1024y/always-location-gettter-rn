import React from 'react'

import LineLogin from 'react-native-line-sdk'
import { View, Button } from 'react-native'

function Login() {
  const onPress = () => {
    LineLogin.login()
      .then(user => {
        console.log(user.profile.displayName)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <View>
      <Button title={'login'} onPress={onPress}></Button>
    </View>
  )
}

export default Login
