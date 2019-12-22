import { useState } from 'react'

import { Location } from 'react-native-background-geolocation'
import { createContainer } from 'unstated-next'

function useLocationLog(initialState: Location[] = []) {
  const [log, setLog] = useState(initialState)
  const addLog = (location: Location) => {
    setLog([location, ...log])
  }
  return { log, addLog }
}

export const { Provider, useContainer } = createContainer(useLocationLog)
