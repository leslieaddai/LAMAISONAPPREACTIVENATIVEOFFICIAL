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

  // useEffect(() => {    
  //   async function runThis () {
  //     if (Platform.OS === "android" && (await hasAndroidPermission())) {
  //       console.log('Android Permissions Granted Go Ahead...')
  //       Geolocation.getCurrentPosition(info => console.log(info));
  //     }
  //     // if (Platform.OS === 'ios' && (await hasIosPermission())) {
  //     //   console.log('IOS Permissions Granted Go Ahead...')
  //     //   Geolocation.getCurrentPosition(info => console.log(info));
  //     // }

  //     if(Platform.OS === 'ios'){
  //       Geolocation.requestAuthorization(
  //         () => {
  //           console.log('IOS Permissions Granted Go Ahead...')
  //           Geolocation.getCurrentPosition(info => console.log(info));
  //         },
  //         error => {
  //           console.log(error)
  //           Alert.alert(
  //             'Location Permission',
  //             'Location permission is blocked in the device ' +
  //                 'settings. Allow the app to access Location.',
  //             [
  //                 {
  //                     text: 'OK',
  //                     onPress: () => {
  //                         Linking.openSettings()
  //                     },
    
  //                 },
  //                 { text: 'CANCEL',  onPress:()=>console.log('permissions not granted on ios')}
  //             ],
  //         )
  //         })
  //     }

  //   }
  //   runThis();
  // }, []);

//  async function hasAndroidPermission() {
//   const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION || PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION

//   const hasPermission = await PermissionsAndroid.check(permission);
//   if (hasPermission) {
//     //setPerm(true);
//     //console.log(hasPermission)
//     return true;
//   }

//   const status = await PermissionsAndroid.request(permission);
//   if (status === 'granted') {
//     //setPerm(true);
//   }
//   else if (status === 'denied' || status === 'never_ask_again'){
//     Alert.alert(
//       'Location Permission',
//       'Location permission is blocked in the device ' +
//           'settings. Allow the app to access Location.',
//       [
//           {
//               text: 'OK',
//               onPress: () => {
//                   Linking.openSettings()
//               },

//           },
//           { text: 'CANCEL',  onPress:()=>
//           console.log('permissions not granted on android')
//         }
//       ],
//   )
//   }
//   //console.log(status);
//   return status === 'granted';
// }

// async function hasIosPermission() {

//   const hasPermission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
//   .then((result) => {
//     switch (result) {
//       case RESULTS.UNAVAILABLE:
//         console.log('This feature is not available (on this device / in this context)');
//         return false;
//         //break;
//       case RESULTS.DENIED:
//         console.log('The permission has not been requested / is denied but requestable');
//         return false;
//         //break;
//       case RESULTS.LIMITED:
//         console.log('The permission is limited: some actions are possible');
//         //setPerm(true);
//         return true;
//         //break;
//       case RESULTS.GRANTED:
//         console.log('The permission is granted');
//         //setPerm(true);
//         return true;
//         //break;
//       case RESULTS.BLOCKED:
//         console.log('The permission is denied and not requestable anymore');
//         Alert.alert(
//           'Location Permission',
//           'Location permission is blocked in the device ' +
//               'settings. Allow the app to access Location.',
//           [
//               {
//                   text: 'OK',
//                   onPress: () => {
//                       Linking.openSettings()
//                   },

//               },
//               { text: 'CANCEL',  onPress:()=>console.log('permissions not granted on ios')}
//           ],
//       )
//         return false;
//         //break;
//     }
//   })
//   .catch((error) => {
//     // …
//   });

//   if (hasPermission) {
//     //setPerm(true);
//     return true;
//   }

// const status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS || PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
//     if (result===RESULTS.GRANTED || result===RESULTS.LIMITED){
//       return true;
//     }
//   })
//   .catch((error)=>{

//   });

// if (status) {
//   //setPerm(true);
// }

// return status===true;
  
// }

// "reactNativePermissionsIOS": [
//   "PhotoLibrary",
//   "LocationAccuracy",
//   "LocationAlways",
//   "LocationWhenInUse"
// ],

  const NetworkCheck = () =>{
    NetInfo.addEventListener(networkState => {
      console.log(networkState)
      if(
        !networkState?.isConnected && 
        !networkState.isInternetReachable&&
        networkState.isInternetReachable!==null){
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
  },[])
  
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