import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import Animated, { FadeInUp, FadeOutUp, Layout } from 'react-native-reanimated'
import { RFValue as rfv} from 'react-native-responsive-fontsize';
import {COLORS,wp2,hp2} from '../../theme';
import LoaderComp from '../../components/loaderComp';
import { errorMessage, successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { ResetPasswordUrl, VerifyCodeUrl } from '../../config/Urls';

const PasswordConfirmation = (props) => {
    const [showReset, setShowReset] = useState(false);
    const [verifyCode, setVerifyCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const special = /[!@#\$%\^\&*\)\(+=._-]/g;
    const numeric = /[0-9]/;
    const [code, setCode] = useState();
    const [showPassNotMatch, setShowPassNotMatch] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onVerifyCode = () => {
        if (code) {
          setLoading(true);
    
          let obj = {
            email: props?.route?.params?.email,
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
              errorMessage(errorHandler(error))
            });
        } else {
          errorMessage('Please Enter Verification Code');
        }
      };


    const resetpasswordcomp = () =>{
        props.navigation.navigate('newpasswordScreen',{email:props?.route?.params?.email})
    }

  return (
    <>
     <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>
    <SafeAreaView
    style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    <SafeAreaView style={styles.container}>
    <Text style={styles.resetText}>Reset Password</Text>
    {showReset ? (
          resetpasswordcomp()
        ):
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
                 
            <TouchableOpacity onPress={onVerifyCode} style={styles.button}>
              <Text style={styles.buttonText}>Verify Code</Text>
            </TouchableOpacity>
          </>
        }
    </SafeAreaView>
    </>
  )
}

export default PasswordConfirmation

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