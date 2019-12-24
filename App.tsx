import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from './src/containers/LocationContainer'
import Main from './src/page/Main'
import Login from './src/page/Login'

export default function App() {
  return (
    <SafeAreaView>
      <Provider>
        <Login />
      </Provider>
    </SafeAreaView>
  )
}
