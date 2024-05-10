import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import { LogBox, Text, useColorScheme,  } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './src/Redux/Reducer';
import FlashMessage from 'react-native-flash-message';

import NetInfo from "@react-native-community/netinfo";
import { showMessage,hideMessage } from 'react-native-flash-message';

import AppNavigatior from './src/route'

import OneSignal from 'react-native-onesignal';

import { StripeProvider } from '@stripe/stripe-react-native';
import {PRIVATE_KEY, ONESIGNAL_APP_ID} from '@env'


import * as Sentry from '@sentry/react-native';





Sentry.init({
  dsn: 'https://4c48c81399eeeae1a219b44661eb46a3@o4506812522692608.ingest.us.sentry.io/4506898683789312',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

const App = () => {

  const colortheme = useColorScheme()
  console.log(colortheme)
  OneSignal.setAppId(`${ONESIGNAL_APP_ID}`);

  OneSignal.promptForPushNotificationsWithUserResponse();
  
  
 
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
publishableKey={`${PRIVATE_KEY}`}
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