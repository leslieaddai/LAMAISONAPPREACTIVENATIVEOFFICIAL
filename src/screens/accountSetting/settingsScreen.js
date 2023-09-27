import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,
  
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,

  wp2,
  hp2,

} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LogoutUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';


export default function SettingsScreen(props) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {count} = useSelector(state => state.ordercount)
  const {warning} = useSelector(state => state.warningcheck)
  // const user = useSelector(state => state.userData);

  const dispatch = useDispatch();

  const settingOptions = (name, badge, navScreen) => {
    return (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(navScreen, {user: props.route.params.user})
        }
        style={styles.filters}>
        <Text
          style={{
            color: name == 'LOGOUT' ? '#EB1414' : 'black',
            fontWeight: name == 'LOGOUT' ? '700' : 'normal',
          }}>
          {name}
        </Text>
        {badge == 'blue' && (
          <View style={styles.circle}>
            <Text style={{color: 'white'}}>{count}</Text>
          </View>
        )}
        {badge == 'red' && (
          <View style={[styles.circle, {backgroundColor: '#B00002'}]}></View>
        )}
        {name != 'LOGOUT' && (
          <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
        )}
      </TouchableOpacity>
    );
  };

  const logoutButton = () => {
    const logoutHandle = () => {
      Alert.alert('Confirmation', 'Do you want to logout?', [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
           

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: LogoutUrl,
              headers: {
                Authorization: `Bearer ${props?.route?.params?.user?.token}`,
                Accept: 'application/json',
              },
            };

           
            axios
              .request(config)
              .then(async function (res) {
                
                dispatch({
                  type: types.Clearcart,
                });
                dispatch({
                  type: types.Logout,
                });
                OneSignal.removeExternalUserId()

                setLoading(false);
                successMessage('Logout Success');
              })
              .catch(function (error) {
               console.log(error.response)
                setLoading(false);
                errorMessage(errorHandler(error))
              });

            
          },
        },
      ]);
    };

    return (
      <TouchableOpacity onPress={logoutHandle} style={styles.filters}>
        <Text style={{color: '#EB1414', fontWeight: '700'}}>LOGOUT</Text>
      </TouchableOpacity>
    );
  };
useEffect(()=>{
  if(loading){
  const parent = props.navigation.setOptions({
    tabBarStyle: { display: 'none' },
  });}
  else{
    const parent = props.navigation.setOptions({
      tabBarStyle: { display: 'flex', width: wp2(100),height: Platform.OS==='ios'?hp2(10):hp2(8),backgroundColor: 'white',},
    });
  }
},[loading])
  return (
    <>
    
      <View style={{position: 'absolute', zIndex: 999}}>
      {loading &&
     
      <SkypeIndicator
      style={{
        width: wp2(100),
        height: hp2(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      color={'black'}
    />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1}}>
      
   
        <View style={styles.container}>
          <View style={styles.headWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.heading}>Settings</Text>
          </View>

          {props?.route?.params?.user?.userData?.role?.[0]?.id === 3 ? (
            <>
              {settingOptions('PROFILE', '', 'editProfile')}
              {settingOptions('NOTIFICATIONS', '', 'notificationScreen')}
              {settingOptions('IMAGE/PRODUCT UPLOAD', '', 'destinationScreen')}
              {settingOptions('INVENTORY', `${warning?'red':''}`, 'inventory')}
              {settingOptions('STANDARD SHIPPING', '', 'shippingLocation')}
              {settingOptions('ANALYTICS', '', 'analyticsScreen')}
              {settingOptions('ALL ORDERS', `${count>0 ? 'blue':''}`, 'orderTrackingScreen')}
              {settingOptions('TERM OF USE', '', 'termsScreen')}
              {settingOptions('PRIVACY & SECURITY', '', 'privacyScreen')}
              {settingOptions('CUSTOMER ADVICE', '', 'customerSupportScreen')}
             
              {logoutButton()}
            </>
          ) : (
            <>
              {settingOptions('PROFILE', '', 'editProfile')}
              {settingOptions('NOTIFICATIONS', '', 'notificationScreen')}
              {settingOptions('SHIPPING ADDRESS', '', 'shippingAddress')}
              {settingOptions('ALL ORDERS', '', 'orderTrackingScreen')}
              {settingOptions('TERM OF USE', '', 'termsScreen')}
              {settingOptions('PRIVACY & SECURITY', '', 'privacyScreen')}
              {settingOptions('CUSTOMER ADVICE', '', 'customerSupportScreen')}
              
              {logoutButton()}
            </>
          )}

         
        </View>
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    
    justifyContent: 'center',
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(1.5),
  },
  circle: {
    width: wp2(6),
    height: wp2(6),
    backgroundColor: '#0F2ABA',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp2(8),
  },
});
