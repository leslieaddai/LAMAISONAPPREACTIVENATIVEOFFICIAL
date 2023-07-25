import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../../theme/fonts';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  screenHeight,
  screenWidth,
  wp2,
  hp2,
  getFont,
  FONTS,
} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LoginUrl, RegisterGuest} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import {getUniqueId, getIpAddress} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

import LoaderComp from '../../components/loaderComp';

export default function GuestScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const registerGuest = () => {
    try {
      setLoading(true);
      NetworkInfo.getIPAddress().then(ipAddress => {
        console.log(ipAddress);
        getUniqueId().then(uniqueId => {
          console.log(uniqueId);

          axios
            .post(RegisterGuest, {device_id: uniqueId, ip_address: ipAddress})
            .then(async function (res) {
              console.log(res.data);
              dispatch({
                type: types.LoginGuest,
                payload: res?.data,
              });
              setLoading(false);
              successMessage('Login Success as Guest');
              props.navigation.navigate('bottomNavigationGuest');
            })
            .catch(function (error) {
              console.log(error.response.data);
              setLoading(false);
              errorMessage(errorHandler(error))
            });
        });
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
          //onPress={()=> props.navigation.navigate('homeScreen')}
          onPress={() => registerGuest()}
          //     onPress={()=>navigation.navigate('bottomNavigation', {
          //   screen: 'stackNavComp',
          //   params: {
          //     screen: 'dressingRoomScreen',
          //   },
          // })}
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
    //justifyContent:'center',
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
