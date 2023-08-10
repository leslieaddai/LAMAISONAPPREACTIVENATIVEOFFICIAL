import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import { LogBox,  } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './src/Redux/Reducer';
import FlashMessage from 'react-native-flash-message';

import NetInfo from "@react-native-community/netinfo";
import { showMessage,hideMessage } from 'react-native-flash-message';

import AppNavigatior from './src/route'

import OneSignal from 'react-native-onesignal';

import { StripeProvider } from '@stripe/stripe-react-native';


const App = () => {
  
useEffect(() => {
  (async () => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested',
      'ViewPropTypes will be removed from React Native',
    ]);
    LogBox.ignoreAllLogs(true);
  })();
}, []);
  const NetworkCheck = () =>{
    NetInfo.addEventListener(networkState => {
      if(
        !networkState?.isConnected && 
        !networkState.isInternetReachable){
        showMessage({
                        message: "",
                        description: "Please Check Your Internet Connection",
                        autoHide:false,
                        type: "danger",
                        hideOnPress:false
        });
        }
        else{
           hideMessage();
    }
  });
  }
  
  useEffect(()=>{
    NetworkCheck()
  },[NetworkCheck()])
  
  return (
<StripeProvider 
publishableKey="pk_test_51M5W9vIM397QIZ0dUbeanZ7eh3Nr3Dj2IoAME2VdO0SgosRvWEjvuFve4TqjGfGiTD0ujvnez33CIgVImHqxMCIw00ghLGR6Lz"
>
<Provider store={store}>
        <PersistGate persistor={persistor}>
      
        <AppNavigatior/>
        
        </PersistGate>

        <FlashMessage position="top" />

        </Provider>
</StripeProvider>
  )
}

export default App