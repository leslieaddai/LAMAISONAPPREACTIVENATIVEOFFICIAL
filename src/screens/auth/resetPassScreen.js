import React, {useState,useRef,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  ResetPasswordUrl,
  VerifyCodeUrl,
  ForgetPasswordUrl,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

import Animated, {FadeInUp, FadeOutUp, Layout} from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';
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
      onPress={() => {alert('hello')}}
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
          console.log(res.data);

          setLoading(false);
          setVerifyCode(true);
          successMessage(
            'Verification code is sent to your email. Please check.',
          );
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoading(false);
          //errorMessage('Something Went Wrong!')
          //errorMessage(error.response.data.message);
          errorMessage(errorHandler(error))
          //errorMessage(errorHandler(error))
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
          console.log(res.data);

          setLoading(false);
          setShowReset(true);
          //successMessage('Code Has Been Verified!')
          successMessage('Enter your new password');
        })
        .catch(function (error) {
          console.log(error.response.data);
          setLoading(false);
          //errorMessage('Something Went Wrong!')
          //errorMessage(error?.response?.data?.errors?.password_reset_code[0]);
          errorMessage(errorHandler(error))
          //errorMessage(errorHandler(error))
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
                  console.log(res.data);

                  setLoading(false);
                  props.navigation.navigate('loginScreen');
                  successMessage('Password Changed Successfully!');
                })
                .catch(function (error) {
                  console.log(error.response.data);
                  setLoading(false);
                  //errorMessage('Something Went Wrong!');
                  errorMessage(errorHandler(error))
                  //errorMessage(errorHandler(error))
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
          exiting={FadeOutUp.duration(500)}
          style={styles.inputBox}>
          <TextInput
            style={styles.inputTxt}
            placeholderTextColor={'grey'}
            placeholder="ENTER PASSWORD"
            value={newPassword}
            onChangeText={val => setNewPassword(val)}
            secureTextEntry={true}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutUp.duration(500)}
          style={styles.inputBox}>
          <TextInput
            style={styles.inputTxt}
            placeholderTextColor={'grey'}
            placeholder="RE-ENTER PASSWORD"
            value={confirmPassword}
            onChangeText={val => setConfirmPassword(val)}
            secureTextEntry={true}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(1000)}
          exiting={FadeOutUp.duration(500)}
          style={{alignSelf: 'center', marginTop: hp2(2), width: wp2(80)}}>
          <Text
            style={[
              styles.textTwo,
              {color: newPassword.length >= 8 ? COLORS.green : COLORS.red},
            ]}>
            Must be at least 8 characters
          </Text>
          <Text
            style={[
              styles.textTwo,
              {color: numeric.test(newPassword) ? COLORS.green : COLORS.red},
            ]}>
            Must include at least 1 Numerical character
          </Text>
          <Text
            style={[
              styles.textTwo,
              {color: newPassword.match(special) ? COLORS.green : COLORS.red},
            ]}>
            Must include at least 1 special character ( Examples !”£$)
          </Text>
        </Animated.View>

        <TouchableOpacity onPress={onResetPassword} style={styles.button}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        {showPassNotMatch && errorMessage("Password Does not Match")}
      </Animated.View>
    );
  };

  return (
    <>
      <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: hp2(4),flexGrow:1}}> */}
        <Text style={styles.resetText}>Reset Password</Text>
        {showReset ? (
          resetPasswordComp()
        ) : verifyCode ? (
          <>
            <Animated.View
              entering={FadeInUp.duration(1000)}
              exiting={FadeOutUp.duration(500)}
              style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder="VERIFY CODE"
                value={code}
                onChangeText={val => setCode(val)}
                keyboardType={'number-pad'}
              />
            </Animated.View> 
                  {/* <TouchableOpacity onPress={()=>{onVerifyCode()}} style={styles.button}>
              <Text style={styles.buttonText}>Resend Code</Text>
            </TouchableOpacity> */}
            {/* <CountdownContainer/> */}
            <TouchableOpacity onPress={onVerifyCode} style={styles.button}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.inputTxt}
                placeholderTextColor={'grey'}
                placeholder="EMAIL ADDRESS"
                value={email}
                onChangeText={val => setEmail(val)}
              />
            </View>
            <TouchableOpacity onPress={sendEmail} style={styles.button}>
              <Text style={styles.buttonText}>Send link to email address</Text>
            </TouchableOpacity>
          </>
        )}
        {/* </KeyboardAwareScrollView> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
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
    //marginVertical:hp(2),
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
