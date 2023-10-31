import 'react-native-gesture-handler';
import React, {useEffect} from 'react'
import { LogBox, useColorScheme,  } from 'react-native'
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
  const colortheme = useColorScheme()
  console.log(colortheme)
  OneSignal.setAppId('846ceb6d-8445-4ba5-b9f7-ac7660c6d60a');

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
publishableKey="pk_live_51M5W9vIM397QIZ0dNEcinW5xkRVb0oLNxei4sDwOuqBtCC1Djr33b2wSTTG25EBDRFkM3fAg6Lb4u7nxfAEpdP0C00KrfcB1t3"
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