import React, { useState, useEffect } from 'react'
import { SafeAreaView, AsyncStorage } from 'react-native'
import Main from './src/page/Main'
import LoginContainer from './src/containers/LoginContainer'

export default function App() {
  return (
    <LoginContainer.Provider>
      <Main />
    </LoginContainer.Provider>
  )
}
