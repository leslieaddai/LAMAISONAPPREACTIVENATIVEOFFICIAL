import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInUp, FadeOutUp, Layout } from 'react-native-reanimated'
import { RFValue as rfv} from 'react-native-responsive-fontsize';
import {COLORS,wp2,hp2} from '../../theme';
import LoaderComp from '../../components/loaderComp';
import { errorMessage, successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { ResetPasswordUrl, VerifyCodeUrl } from '../../config/Urls';

const NewpasswordScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const special = /[!@#\$%\^\&*\)\(+=._-]/g;
    const numeric = /[0-9]/;
    const [showPassNotMatch, setShowPassNotMatch] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onResetPassword = () => {
        if (newPassword !== '' && confirmPassword !== '') {
          if (newPassword.length >= 8) {
            if (numeric.test(newPassword)) {
              if (special.test(newPassword.match(special))) {
                if (newPassword === confirmPassword) {
                  setLoading(true);
    
                  let obj = {
                    email: props?.route?.params?.email,
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
                     
                      errorMessage(errorHandler(error))
                
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
  return (
    <>
    <View style={{position: 'absolute', zIndex: 999}}>
    {loading && <LoaderComp />}
    </View>
    <SafeAreaView
    style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    <SafeAreaView style={styles.container}>
    <Text style={styles.resetText}>Reset Password</Text>
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
   </SafeAreaView>
   </>
  )
}

export default NewpasswordScreen

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
})