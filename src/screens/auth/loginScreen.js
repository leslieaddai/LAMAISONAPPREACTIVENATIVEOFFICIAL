import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
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
import AlertComp from '../../components/alertComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LoginUrl, RegisterGuest} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import Animated, {Layout} from 'react-native-reanimated';

import LoaderComp from '../../components/loaderComp';

import {getUniqueId, getIpAddress} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

export default function LoginScreen(props) {
  const [showError, setShowError] = useState(false);
  const [errormsg,setError]= useState()

  const dispatch = useDispatch();

  const [stateChange, setStateChange] = useState({
    UserName: '',
    Password: '',
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {UserName, Password} = stateChange;

  const [loading, setLoading] = useState(false);

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  const onSignIn = () => {
    if (UserName != '' && Password != '') {
      if(!containsWhitespace(UserName)){
        setLoading(true);
      let obj = {
        email: UserName,
        password: Password,
      };
      axios
        .post(LoginUrl, obj)
        .then(async function (res) {
          console.log('login response', res.data.user.basket_count);
          setLoading(false);
          if (res.data.user.email_verified === false) {
            setError('Please verify your email');
          } else {
            successMessage('Login Successfully');
            dispatch({
              type: types.CartCount,
              payload: res.data.user.basket_count,
            });
            dispatch({
              type: types.Login,
              payload: res.data,
            });
          }
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoading(false);
          setError(errorHandler(error))
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        });

      }else{
        setError('Please remove space from username!')
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } else {
      setError('Please fill all details');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

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
              setError(errorHandler(error))
              setShowError(true);
              setTimeout(() => {
                setShowError(false);
              }, 3000);
            });
        });
      });
    } catch {
      setError('Something went wrong!');
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView style={styles.container}>
        <View style={{flexGrow: 1}}>
          <Text style={[styles.signinText]}>Sign in - Welcome Back</Text>
          {showError && <AlertComp text={errormsg} />}

          <Animated.View layout={Layout.duration(1000)}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="USERNAME"
                placeholderTextColor={'grey'}
                onChangeText={val => updateState({UserName: val})}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="PASSWORD"
                secureTextEntry={true}
                placeholderTextColor={'grey'}
                onChangeText={val => updateState({Password: val})}
              />
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('resetPassScreen')}>
              <Text style={styles.forgetText}>
                Forgotten your Username/Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignIn} style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('signupScreen')}
              style={[styles.button, {width: wp2(48), marginTop: hp2(10)}]}>
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => registerGuest()}
              style={[styles.button, {width: wp2(54), marginTop: hp2(4)}]}>
              <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>
            </TouchableOpacity>
          </Animated.View>
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
  signinText: {
    color: 'black',
    fontSize: rfv(22),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    marginLeft: wp2(8),
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  forgetText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  button: {
    width: wp2(28),
    height: hp2(7),
    backgroundColor: 'black',
    borderRadius: wp2(10),
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
    marginTop: hp2(3),
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
