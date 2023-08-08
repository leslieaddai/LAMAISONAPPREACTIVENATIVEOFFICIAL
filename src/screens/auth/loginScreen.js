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
  Modal,
  Linking,
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

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LoginUrl, RegisterGuest,ConnectAccountLink} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import Animated, {Layout} from 'react-native-reanimated';

import LoaderComp from '../../components/loaderComp';

import {getUniqueId, getIpAddress} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';

import WebView from 'react-native-webview';

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
  const [showModal, setShowModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState('');

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  const onStripeConnect = (acc_id) => {

      // axios
      //   .post('https://api.stripe.com/v1/accounts', 'type=express&capabilities[card_payments][requested]=true&capabilities[transfers][requested]=true',
      //   {
      //     headers:{'Authorization':`Bearer sk_test_51M5W9vIM397QIZ0d1tVmBjhgCC87vwl0B9wbWDDdfVHfpdq0emhxfx3jBpnJgTxveh7c9XVquF0JzCFl5NT3Lj3e00u5ffQwQ9`},
      //     // params:{type:'express',capabilities: {card_payments: { requested: true },transfers: { requested: true }}}
      //   })
      //   .then(async function (res) {
      //     console.log(res?.data?.capabilities);

      //     axios
      //     .post('https://api.stripe.com/v1/account_links', null,
      //     {
      //       headers:{'Authorization':`Bearer sk_test_51M5W9vIM397QIZ0d1tVmBjhgCC87vwl0B9wbWDDdfVHfpdq0emhxfx3jBpnJgTxveh7c9XVquF0JzCFl5NT3Lj3e00u5ffQwQ9`},
      //       params:{account:res?.data?.id,refresh_url: "https://www.facebook.com",return_url: "https://www.google.com",type: "account_onboarding"}
      //     })
      //     .then(async function (res) {
      //       console.log(res?.data);
      //       await Linking.openURL(res?.data?.url);
      //     })
      //     .catch(function (error) {
      //       console.log(error?.response?.data);
      //     });

      //   })
      //   .catch(function (error) {
      //     console.log(error?.response?.data);
      //   });

      // axios
      // .post('https://api.stripe.com/v1/account_links', null,
      // {
      //   headers:{'Authorization':`Bearer sk_test_51M5W9vIM397QIZ0d1tVmBjhgCC87vwl0B9wbWDDdfVHfpdq0emhxfx3jBpnJgTxveh7c9XVquF0JzCFl5NT3Lj3e00u5ffQwQ9`},
      //   params:{account:'acct_1NWEl2IMlVqan7Ua',refresh_url: "https://www.facebook.com",return_url: "https://www.google.com",type: "account_onboarding"}
      // })
      // .then(async function (res) {
      //   console.log(res?.data);
      //   await Linking.openURL(res?.data?.url);
      //   setShowModal(true);
      //   setConnectUrl(res?.data?.url)

      // })
      // .catch(function (error) {
      //   console.log(error?.response?.data);
      // });

      axios
        .post(ConnectAccountLink, {stripe_account_id:acc_id})
        .then(async function (res) {
          console.log(res?.data?.data)
          setConnectUrl(res?.data?.data?.url)
          setShowModal(true);
        })
        .catch(function (error) {
          console.log(error?.response?.data);
          setError(errorHandler(error))
        });

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
          console.log('login response=====>', res.data);
          setLoading(false);
          if (res.data.user.email_verified === false) {
            //setError('Please verify your email');
            props.navigation.navigate('verifyAccountScreen',{role:res?.data?.user?.role?.[0]?.id,data:res?.data?.user?.stripe_account});
            errorMessage('Please verify your email');
          } 
          else if (res?.data?.user?.stripe_account?.charges_enabled === false || res?.data?.user?.stripe_account?.details_submitted === false){
            //onStripeConnect(res?.data?.user?.stripe_account?.id);
            console.log(res?.data?.user?.stripe_account?.details_submitted);
            props.navigation.navigate('connectStripe',{role:res?.data?.user?.role?.[0]?.id,data:res?.data?.user?.stripe_account});
          }
            else {
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
        setError('Remove spaces from username/email')
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
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={styles.container}>

      {/* <Modal animationType="slide"
        transparent={true} visible={showModal}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setShowModal(!showModal);
        // }}
        >
                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={()=> setShowModal(!showModal)} style={styles.cancelButton}>
                              <ICONS.MaterialIcons name="cancel" size={30} color="red" />
                        </TouchableOpacity>
                            <WebView 
                                style={{ flex : 1 }} 
                                source={{uri: connectUrl}}
                            />
                        </View>
                    </View>
          </Modal> */}

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
