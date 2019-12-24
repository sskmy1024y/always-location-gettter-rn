import { useState } from 'react'

import { createContainer } from 'unstated-next'
import { LoginState } from '../../models/LoginState'
import { Alert } from 'react-native'

const initialState = {
  line: false,
  kikunyan: false
}

function useLoginState(state: LoginState = initialState) {
  const [loginState, setLoginState] = useState(state)
  const lineLogin = () => {
    setLoginState({
      ...loginState,
      line: true
    })
  }

  const lineLogout = () => {
    setLoginState({
      ...loginState,
      line: false
    })
  }

  const kikuLogin = () => {
    setLoginState({
      ...loginState,
      kikunyan: true
    })
  }

  const kikuLogout = () => {
    setLoginState({
      ...loginState,
      kikunyan: false
    })
  }

  return { loginState, lineLogin, lineLogout, kikuLogin, kikuLogout }
}

export default createContainer(useLoginState)
