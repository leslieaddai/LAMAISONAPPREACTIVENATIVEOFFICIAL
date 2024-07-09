import React, {useState} from 'react';
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
import {VerifyAccount} from '../../config/Urls';
import LoaderComp from '../../components/loaderComp';
import LogoComponent from './componnets/LogoComponent';
import TextEditingComponent from './componnets/TexteditingComponent';
import ContinueButton from './componnets/ContinueBtn';
import Arrow from '../../assets/icons/next-arrow.svg';

export default function VerifyAccountScreen(props) {
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);

  const onVerifyCode = () => {
    if (code) {
      setLoading(true);
      axios
        .post(VerifyAccount, {code: code})
        .then(async function (res) {
          if (props?.route?.params?.role === 2) {
            setLoading(false);
            props.navigation.navigate('loginScreen');
            successMessage('Email Has Been Verified!');
          } else {
            setLoading(false);
            props.navigation.navigate('connectStripe', {
              role: props?.route?.params?.role,
              data: props?.route?.params?.data,
            });
            successMessage('Email Has Been Verified!');
          }
        })
        .catch(function (error) {
          setLoading(false);
          errorMessage(errorHandler(error));
        });
    } else {
      errorMessage('Please Enter Verification Code');
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
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Arrow color={'#000'} width={13} height={13} />
          </TouchableOpacity>
        </View>
        <LogoComponent txt={'Verify Account'}></LogoComponent>
        <View style={{marginHorizontal: 20}}>
          <TextEditingComponent
            style={styles.inputTxt}
            placeholderTextColor={'grey'}
            placeholder="Verify Code"
            value={code}
            onChangeText={val => setCode(val)}
            keyboardType={'number-pad'}
          />
        </View>
        <ContinueButton
          onPress={onVerifyCode}
          style={{width: '90%', marginHorizontal: 20, marginTop: 10}}
          text={'Verify Account'}></ContinueButton>
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
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
