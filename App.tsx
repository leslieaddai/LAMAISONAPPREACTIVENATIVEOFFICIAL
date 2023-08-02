import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react'
import { LogBox, StyleSheet, Text, View,Platform,PermissionsAndroid,Linking,Alert } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store,persistor } from './src/Redux/Reducer';
import FlashMessage from 'react-native-flash-message';

import NetInfo from "@react-native-community/netinfo";
import { showMessage,hideMessage } from 'react-native-flash-message';
//import Geolocation from '@react-native-community/geolocation';
//import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import AppNavigatior from './src/route'

import OneSignal from 'react-native-onesignal';

import { StripeProvider } from '@stripe/stripe-react-native';

//Geolocation.setRNConfiguration({skipPermissionRequests: true});

const App = () => {
  
// OneSignal Initialization
OneSignal.setAppId('846ceb6d-8445-4ba5-b9f7-ac7660c6d60a');

// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
OneSignal.promptForPushNotificationsWithUserResponse();

//Method for handling notifications received while app in foreground
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  // Complete with null means don't show a notification.
  notificationReceivedEvent.complete(notification);
});

//Method for handling notifications opened
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});

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