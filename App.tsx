import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from './src/containers/LocationContainer'
import Main from './src/page/Main'

export default function App() {
  return (
    <SafeAreaView>
      <Provider>
        <Main />
      </Provider>
    </SafeAreaView>
  )
}
