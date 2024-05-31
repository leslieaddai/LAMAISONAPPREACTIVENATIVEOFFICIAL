import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {RegisterGuest} from '../../config/Urls';
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
            style={{width: '50%', height: '50%'}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('loginScreen')}
            style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('signupScreen')}
            style={styles.button}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => registerGuest()}
            style={styles.button}>
            <Text style={styles.buttonText}>Continue As Guest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    width: wp2(60),
    height: hp2(20),
    // paddingBottom:100,
    overflow: 'hidden',
    marginTop: hp2(15),
    marginBottom: hp2(10),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: '100%', // Width set to fill available space
    height: 50,
    paddingHorizontal: 20, // Horizontal padding

    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular', // Assuming "Poppins-Regular" is the name of your font
  },
  guestText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    textDecorationLine: 'underline',
  },
});
