import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  FlatList,
} from 'react-native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {COLORS, wp2, hp2, IMAGES} from '../../theme';
import AlertComp from '../../components/alertComp';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {LoginUrl, RegisterGuest} from '../../config/Urls';
import {useDispatch} from 'react-redux';
import types from '../../Redux/types';
import LoaderComp from '../../components/loaderComp';
import {getUniqueId} from 'react-native-device-info';
import {NetworkInfo} from 'react-native-network-info';
import OneSignal from 'react-native-onesignal';
import NewInputComp from '../../components/NewInputComp';
import Arrow from '../../assets/icons/next-arrow.svg';

export default function LoginScreen(props) {
  const [showError, setShowError] = useState(false);
  const [errormsg, setError] = useState('');
  const [PlayerId, setPlayerId] = useState('');

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
    if (UserName !== '' && Password !== '') {
      if (!containsWhitespace(UserName)) {
        setLoading(true);
        let obj = {
          email: UserName,
          password: Password,
          player_id: PlayerId,
        };
        axios
          .post(LoginUrl, obj)
          .then(async function (res) {
            setLoading(false);
            console.log(res.data);
            if (res.data.user.email_verified === false) {
              props.navigation.navigate('verifyAccountScreen', {
                role: res?.data?.user?.role?.[0]?.id,
                data: res?.data?.user?.stripe_account,
              });
              AlertComp('Please verify your email');
            } else if (false) {
              props.navigation.navigate('connectStripe', {
                role: res?.data?.user?.role?.[0]?.id,
                data: res?.data?.user?.stripe_account,
              });
            } else {
              OneSignal.setExternalUserId(String(res?.data?.user?.id));
              AlertComp('Login Successfully');
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
            setError(errorHandler(error));
            setShowError(true);
            setTimeout(() => {
              setShowError(false);
            }, 3000);
          });
      } else {
        setError('Remove spaces from username/email');
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    } else {
      if (PlayerId === '') {
        OneSignal.promptForPushNotificationsWithUserResponse();
      }
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
              AlertComp('Login Success as Guest');
              props.navigation.navigate('bottomNavigationGuest');
            })
            .catch(function (error) {
              setLoading(false);
              setError(errorHandler(error));
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

  const renderItem = ({item}) => (
    <View style={{paddingHorizontal: 20, position: 'absolute', top: 80}}>
      <TouchableOpacity onPress={() => props.navigation.goBack()}>
        <Arrow color={'#000'} width={13} height={13} />
      </TouchableOpacity>

      <View style={styles.logoWrap}>
        <Image
          source={IMAGES.logowhite}
          style={{width: '22%', height: '75%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={[styles.signinText]}>Sign In - Welcome Back!</Text>
      {showError && <AlertComp text={errormsg} />}
      <View>
        <View style={{marginBottom: -20}}>
          <NewInputComp
            value={stateChange}
            handleOnChange={val => updateState({UserName: val})}
            inputText={'Username'}
          />
        </View>

        <NewInputComp
          value={stateChange.Password}
          handleOnChange={val => updateState({Password: val})}
          inputText={'Password'}
          resetPassword={true}
          setPassword={true}
          resetNavigation={() => {
            props.navigation.navigate('resetPassScreen'),
              updateState({UserName: ''}),
              updateState({Password: ''});
          }}
        />
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => {
            props.navigation.navigate('resetPassScreen'),
              updateState({UserName: ''}),
              updateState({Password: ''});
          }}>
          <Text style={styles.forgetText}>
            Forgotten your Username/Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('signupScreen'),
              updateState({UserName: ''}),
              updateState({Password: ''});
          }}
          style={[styles.buttonWhite]}>
          <Text style={styles.buttonTextBlack}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            registerGuest(),
              updateState({UserName: ''}),
              updateState({Password: ''});
          }}
          style={[styles.buttonWhite]}>
          <Text style={styles.buttonTextBlack}>Continue As Guest</Text>
        </TouchableOpacity>
        <View style={styles.spacer} />
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.select({ios: 64, android: 64})}>
        {/* <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={Platform.select({
            ios: 0,
            android: 500,
          })}> */}
        <FlatList
          data={[{key: 'item1'}]}
          renderItem={renderItem}
          keyExtractor={item => item.key}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardDismissMode="interactive"
        />
        {/* </KeyboardAwareScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Встановлюємо білий колір фону
  },
  logoWrap: {
    height: hp2(10),
    overflow: 'hidden',
    marginTop: hp2(4),
    marginBottom: hp2(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  signinText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    lineHeight: 33,
    marginVertical: 8,
    marginTop: Platform.OS === 'ios' ? 0 : 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },
  forgetText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 21,
    marginVertical: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonWhite: {
    width: '90%',
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonTextBlack: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '90%',
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: '#5D5FEF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },
  divider: {
    marginVertical: 40,
    height: 2,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 70,
  },
  spacer: {
    marginBottom: wp2(40),
  },
});
