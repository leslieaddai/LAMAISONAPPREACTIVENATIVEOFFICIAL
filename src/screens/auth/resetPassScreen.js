import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {COLORS, wp2, hp2} from '../../theme';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  ResetPasswordUrl,
  VerifyCodeUrl,
  ForgetPasswordUrl,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComp from '../../components/loaderComp';
import Animated, {FadeInUp, FadeOutUp, Layout} from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
import LogoComponent from './componnets/LogoComponent';
import TextEditingComponent from './componnets/TexteditingComponent';
import ContinueButton from './componnets/ContinueBtn';
import NewInputComp from '../../components/NewInputComp';

const CountdownContainer = () => {
  const initialCountdown = 20; // You can set any initial countdown time here
  const [countdown, setCountdown] = useState(initialCountdown);
  useEffect(() => {
    if (countdown > 0) {
      // If the countdown is greater than 0, start the countdown
      const timer = setTimeout(() => {
        setCountdown(countdown - 1); // Update the countdown every second
      }, 1000);

      // Clean up the timer when the component unmounts or countdown changes
      return () => clearTimeout(timer);
    } else {
      // When countdown reaches 0, reset it to a new value (e.g., 30 seconds) here:
      const newCountdown = 30;
      setCountdown(newCountdown);
    }
  }, [countdown]);
  return (
    <CountDown
      until={countdown}
      onPress={() => {
        alert('hello');
      }}
      timeToShow={['M', 'S']}
      digitStyle={{backgroundColor: '#FFF'}}
      digitTxtStyle={{color: '#1CC625'}}
      timeLabels={{m: 'MM', s: 'SS'}}
      size={20}
    />
  );
};
export default function ResetPassScreen(props) {
  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  const user = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const [showReset, setShowReset] = useState(false);
  const [verifyCode, setVerifyCode] = useState(false);
  const [showPassNotMatch, setShowPassNotMatch] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState();

  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    if (email !== '') {
      setLoading(true);

      let obj = {
        email: email,
      };

      axios
        .post(ForgetPasswordUrl, obj)
        .then(async function (res) {
          // setLoading(false);
          // setVerifyCode(true);
          successMessage(
            'Verification code is sent to your email. Please check.',
          );
          props.navigation.navigate('passwordconfirm', {email: email});
        })
        .catch(function (error) {
          setLoading(false);
          errorMessage(errorHandler(error));
        });
    } else {
      errorMessage('Please Enter Email Address');
    }
  };

  const onVerifyCode = () => {
    if (code) {
      setLoading(true);

      let obj = {
        email: email,
        password_reset_code: code,
      };

      axios
        .post(VerifyCodeUrl, obj)
        .then(async function (res) {
          setLoading(false);
          setShowReset(true);

          successMessage('Enter your new password');
        })
        .catch(function (error) {
          setLoading(false);
          errorMessage(errorHandler(error));
        });
    } else {
      errorMessage('Please Enter Verification Code');
    }
  };

  const onResetPassword = () => {
    if (newPassword !== '' && confirmPassword !== '') {
      if (newPassword.length >= 8) {
        if (numeric.test(newPassword)) {
          if (special.test(newPassword.match(special))) {
            if (newPassword === confirmPassword) {
              setLoading(true);

              let obj = {
                email: email,
                password: newPassword,
                password_confirmation: confirmPassword,
              };

              axios
                .post(ResetPasswordUrl, obj)
                .then(async function (res) {
                  setLoading(false);
                  props.navigation.navigate('loginScreen');
                  successMessage('Password Changed Successfully!');
                })
                .catch(function (error) {
                  setLoading(false);

                  errorMessage(errorHandler(error));
                });
            } else {
              setShowPassNotMatch(true);
              setTimeout(() => {
                setShowPassNotMatch(false);
              }, 3000);
            }
          } else {
            errorMessage('Password must include at least 1 special character');
          }
        } else {
          errorMessage('Password must include at least 1 Numerical character');
        }
      } else {
        errorMessage('Password must be at least 8 characters');
      }
    } else {
      errorMessage('Please fill all fields');
    }
  };

  const resetPasswordComp = () => {
    return (
      <Animated.View layout={Layout.duration(1000)}>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutUp.duration(500)}>
          <TextEditingComponent
            isPassword={true}
            style={styles.inputTxt}
            placeholderTextColor={'grey'}
            placeholder="Enter Password"
            value={newPassword}
            onChangeText={val => setNewPassword(val)}
            secureTextEntry={true}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutUp.duration(500)}>
          <TextEditingComponent
            style={styles.inputTxt}
            isPassword={true}
            placeholderTextColor={'grey'}
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChangeText={val => setConfirmPassword(val)}
            secureTextEntry={true}
          />
        </Animated.View>

        <ContinueButton
          onPress={onResetPassword}
          style={{width: '90%', marginHorizontal: 20, marginTop: 10}}
          text={'Reset Password'}></ContinueButton>

        {showPassNotMatch && errorMessage('Password Does not Match')}
      </Animated.View>
    );
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={styles.container}>
        <LogoComponent txt={'Reset Password'}></LogoComponent>
        {showReset ? (
          //  true
          resetPasswordComp()
        ) : verifyCode ? (
          <>
            <Animated.View
              entering={FadeInUp.duration(1000)}
              exiting={FadeOutUp.duration(500)}>
              <NewInputComp
                value={code}
                inputText={'Verify code'}
                handleOnChange={val => setCode(val)}
              />
              {/* <TextEditingComponent
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder="VERIFY CODE"
                value={code}
                onChangeText={val => setCode(val)}
                keyboardType={'number-pad'}
              /> */}
            </Animated.View>

            <ContinueButton
              onPress={onVerifyCode}
              style={{width: '90%', marginHorizontal: 20, marginTop: 10}}
              text={'Verify Code'}></ContinueButton>
          </>
        ) : (
          <>
            <NewInputComp
              value={email}
              inputText={'Email Address'}
              handleOnChange={val => setEmail(val)}
            />
            {/* <TextEditingComponent
              style={styles.inputTxt}
              placeholderTextColor={'grey'}
              placeholder="Email Address"
              value={email}
              onChangeText={val => setEmail(val)}
            /> */}

            <ContinueButton
              onPress={sendEmail}
              style={{width: '90%', marginHorizontal: 20, marginTop: 10}}
              text={'Send link to email address'}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  resetText: {
    color: 'black',
    fontSize: rfv(26),
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
  button: {
    width: wp2(62),
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

    marginTop: hp2(2),
    alignSelf: 'center',
    marginBottom: hp2(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(11),
    textTransform: 'uppercase',
  },
  textTwo: {fontWeight: '700', fontSize: rfv(10)},
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
