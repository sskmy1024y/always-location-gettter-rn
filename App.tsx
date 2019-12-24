import React, { useState, useEffect } from 'react'
import { SafeAreaView, AsyncStorage } from 'react-native'
import LocationContainer from './src/containers/LocationContainer'
import Main from './src/page/Main'
import LoginContainer from './src/containers/LoginContainer'

export default function App() {
  return (
    <SafeAreaView>
      <Providers>
        <Main />
      </Providers>
    </SafeAreaView>
  )
}

const Providers = ({ children }: { children?: React.ReactElement }) => (
  <LoginContainer.Provider>
    <LocationContainer.Provider>{children}</LocationContainer.Provider>
  </LoginContainer.Provider>
)
