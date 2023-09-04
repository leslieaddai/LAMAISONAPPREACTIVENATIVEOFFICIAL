import React, { useState} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,
  TextInput,

  SafeAreaView,
  Platform,
 
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  COLORS,
 
  wp2,
  hp2,
 
} from '../../theme';
import AlertComp from '../../components/alertComp';
import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LoginUrl, RegisterGuest} from '../../config/Urls';
import {useDispatch} from 'react-redux';
import types from '../../Redux/types';
import Animated, {Layout} from 'react-native-reanimated';
import LoaderComp from '../../components/loaderComp';
import {getUniqueId} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import OneSignal from 'react-native-onesignal';

export default function LoginScreen(props) {
  const [showError, setShowError] = useState(false);
  const [errormsg,setError]= useState()
  const [PlayerId, setPlayerId] = useState('')

  const dispatch = useDispatch();

  const [stateChange, setStateChange] = useState({
    UserName: '',
    Password: '',
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {UserName, Password} = stateChange;

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState('');

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
        player_id:PlayerId
      };
      axios
        .post(LoginUrl, obj)
        .then(async function (res) {
          setLoading(false);
          if (res.data.user.email_verified === false) {
          
            props.navigation.navigate('verifyAccountScreen',{role:res?.data?.user?.role?.[0]?.id,data:res?.data?.user?.stripe_account});
            errorMessage('Please verify your email');
          } 
          else if (res?.data?.user?.stripe_account?.charges_enabled === false || res?.data?.user?.stripe_account?.details_submitted === false){
          
            
            props.navigation.navigate('connectStripe',{role:res?.data?.user?.role?.[0]?.id,data:res?.data?.user?.stripe_account});
          }
            else {
            OneSignal.setExternalUserId(String(res?.data?.user?.id))
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
        
          setLoading(false);
          setError(errorHandler(error))
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        });

      }else{
        setError('Remove spaces from username/email')
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } else {
      if(PlayerId ==''){OneSignal.promptForPushNotificationsWithUserResponse()}
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
       
        getUniqueId().then(uniqueId => {
         

          axios
            .post(RegisterGuest, {device_id: uniqueId, ip_address: ipAddress})
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
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
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
                value={stateChange.UserName}
                onChangeText={val => updateState({UserName: val})}
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholder="PASSWORD"
                secureTextEntry={true}
                placeholderTextColor={'grey'}
                value={stateChange.Password}
                onChangeText={val => updateState({Password: val})}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('resetPassScreen'),
                updateState({UserName:''}),
                updateState({Password:''})}}>
              <Text style={styles.forgetText}>
                Forgotten your Username/Password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSignIn} style={styles.button}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {props.navigation.navigate('signupScreen'),
              updateState({UserName:''}),
              updateState({Password:''})}}
              style={[styles.button, {width: wp2(48), marginTop: hp2(10)}]}>
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {registerGuest(),
                updateState({UserName:''}),
                updateState({Password:''})}
              }
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

      modal : {
        flex : 1,
        justifyContent:'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContainer : {
        width : '100%',
        height : '75%',
    },
    cancelButton:{
      alignItems:'flex-end',
      paddingHorizontal:wp2(1),
    },
});
