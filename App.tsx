import 'react-native-gesture-handler';
import React, {useState} from 'react'
import { LogBox, StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './src/Redux/Reducer';
import FlashMessage from 'react-native-flash-message';

import AppNavigatior from './src/route'

const App = () => {
  return (
        <Provider store={store}>
        <PersistGate persistor={persistor}>
      
        <AppNavigatior/>
        
        </PersistGate>

        <FlashMessage position="top" />

        </Provider>
  )
}

export default App