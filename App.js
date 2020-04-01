import React from 'react'
import {Provider} from 'react-redux'
import {store} from './src/store/configureStore'
import AppNavigator from './src/navigation/AppNavigator'

import {YellowBox} from 'react-native'
YellowBox.ignoreWarnings(['Warning: ...'])
console.disableYellowBox = true

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App
