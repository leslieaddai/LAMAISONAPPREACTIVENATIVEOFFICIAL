import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {
 
  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,

  COLORS,
  
  wp2,
  hp2,

} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import { RegisterGuest} from '../../config/Urls';
import {useDispatch} from 'react-redux';
import types from '../../Redux/types';

import {getUniqueId} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

import LoaderComp from '../../components/loaderComp';

export default function GuestScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const registerGuest = () => {
    try {
      setLoading(true);
      fetch('https://api64.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
         getUniqueId().then(uniqueId => {
         

          axios
            .post(RegisterGuest, {device_id: uniqueId, ip_address: data.ip})
            .then(async function (res) {
             
              dispatch({
                type: types.LoginGuest,
                payload: res?.data,
              });
              setLoading(false);
              successMessage('Login Success as Guest');
              props.navigation.navigate('bottomNavigationGuest');
            })
            .catch(function (error) {
             
              setLoading(false);
              errorMessage(errorHandler(error));
            });
        });
    })
    .catch(error => {
      console.error('Error fetching public IP address:', error);
    });
    } catch {
      errorMessage('Something went wrong!');
    }
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <Image
            source={IMAGES.logowhite}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('signupScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('loginScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
         
          onPress={() => registerGuest()}
         
          style={{marginTop: hp2(12)}}>
          <Text style={styles.guestText}>CONTINUE AS GUEST</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
   
  },
  logoWrap: {
    width: wp2(60),
    height: hp2(20),
    overflow: 'hidden',
    marginTop: hp2(24),
  },
  button: {
    width: wp2(70),
    height: hp2(7),
    backgroundColor: 'black',
    borderRadius: wp2(8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(2),
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  guestText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    textDecorationLine: 'underline',
  },
});
