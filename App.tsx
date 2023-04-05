import React, {useState} from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {store, persistor } from './src/store';

import AppNavigatior from './src/route'

const App = () => {
  return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
      
        <AppNavigatior/>
        
        </PersistGate>
        </Provider>
  )
}

export default App