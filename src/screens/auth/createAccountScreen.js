import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
  ImageComponent,
  Image,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2, IMAGES} from '../../theme';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {signup} from '../../store/actions/authAction';

import DatePicker from 'react-native-date-picker';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {RegisterUrl} from '../../config/Urls';

import LoaderComp from '../../components/loaderComp';
import LogoComponent from './componnets/LogoComponent';
import TextEditingComponent from './componnets/TexteditingComponent';
import MyCheckBox from './componnets/MyCheckBox';
import CustomDatePicker from './componnets/BirthdayComponent';
import PasswordValidationRow from './componnets/PasswordValidationComponent';
import ContinueButton from './componnets/ContinueBtn';

const CreateAccountScreen = props => {
  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  const [stateChange, setStateChange] = useState({
    BrandName: props?.route?.params?.user == 'editor' ? undefined : '',
    UserName: '',
    Newpassword: '',
    ConfirmPass: '',
    Birthday: subtractYears(new Date(), 6),
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {BrandName, UserName, Newpassword, ConfirmPass, Birthday} = stateChange;
  const [checkBox, setCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  const onCreate = () => {
    if (
      BrandName != '' &&
      UserName != '' &&
      Newpassword != '' &&
      ConfirmPass != '' &&
      Birthday != ''
    ) {
      if (!containsWhitespace(UserName)) {
        if (UserName.length >= 6) {
          if (Newpassword.length >= 8) {
            if (numeric.test(Newpassword)) {
              if (special.test(Newpassword.match(special))) {
                if (ConfirmPass === Newpassword) {
                  if (checkBox) {
                    let obj = {
                      first_name: props.route.params.data.firstName,
                      last_name: props.route.params.data.lastName,
                      name:
                        props?.route?.params?.user == 'editor'
                          ? UserName
                          : BrandName,
                      username: UserName,
                      dob: Birthday.toISOString().split('T')[0],
                      email: props.route.params.data.email,
                      password: Newpassword,
                      password_confirmation: ConfirmPass,
                      role_id: props.route.params.user == 'editor' ? 2 : 3,
                    };

                    setLoading(true);

                    axios
                      .post(RegisterUrl, obj)
                      .then(async function (res) {
                        console.log(res);
                        setLoading(false);

                        props.navigation.navigate('verifyAccountScreen', {
                          role: props?.route?.params?.user == 'editor' ? 2 : 3,
                          data: res?.data?.user?.stripe_account,
                        });

                        successMessage(
                          'Account verification code is sent to your email. Please check.',
                        );
                      })
                      .catch(function (error) {
                        setLoading(false);
                        console.log(error?.response?.data);
                        errorMessage(errorHandler(error));
                      });
                  } else {
                    errorMessage('Please accept our Terms and Condition');
                  }
                } else {
                  errorMessage('Confirm password not matched');
                }
              } else {
                errorMessage(
                  'Password must include at least 1 special character',
                );
              }
            } else {
              errorMessage(
                'Password must include at least 1 Numerical character',
              );
            }
          } else {
            errorMessage('Password must be at least 8 characters');
          }
        } else {
          errorMessage('Username must contain at least 6 characters');
        }
      } else {
        errorMessage('Please remove space from username!');
      }
    } else {
      errorMessage('Please fill all details');
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
        <LogoComponent txt={
          props.route.params.user == 'brand'?
          'Create New Brand Account'  :
          'Create New Editor Account'}></LogoComponent>

        {props.route.params.user == 'brand' && (
          // <View style={styles.inputBox}>
          <TextEditingComponent
            style={styles.textBox}
            onChangeText={val => updateState({BrandName: val})}
            placeholder="Brand Name"
            placeholderTextColor={'grey'}
          />
          // </View>
        )}

        <TextEditingComponent
          onChangeText={val => updateState({UserName: val})}
          placeholder="Username"
          placeholderTextColor={'grey'}
        />
        <CustomDatePicker
          birthday={Birthday}
          onPress={() => setOpen(true)}></CustomDatePicker>
        <TextEditingComponent
          style={styles.textBox}
          secureTextEntry={true}
          isPassword={true}
          onChangeText={val => updateState({Newpassword: val})}
          placeholder="Password"
          placeholderTextColor={'grey'}
        />

        <TextEditingComponent
          style={styles.textBox}
          secureTextEntry={true}
          isPassword={true}
          onChangeText={val => updateState({ConfirmPass: val})}
          placeholder="Confirm Password"
          placeholderTextColor={'grey'}
        />

        <PasswordValidationRow password={Newpassword}></PasswordValidationRow>

        <DatePicker
          modal
          mode="date"
          open={open}
          date={Birthday}
          maximumDate={subtractYears(new Date(), 6)}
          onConfirm={date => {
            setOpen(false);
            updateState({Birthday: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View style={{flex: 1}}>
          {/* Spacer to push elements to the top */}
          <View style={{flex: 1}}></View>

          {/* CheckBox and Terms */}
          <View style={styles.checkBoxWrap}>
            <MyCheckBox
              onTintColor="black"
              tintColor="black"
              onFillColor="black"
              onCheckColor="white"
              boxType="square"
              value={checkBox}
              onValueChange={setCheckBox}
              tintColors={{true: 'black', false: 'black'}}
              style={{
                marginBottom: Platform.OS === 'android' ? hp2(-0.5) : hp2(0),
              }}
            />
            <TouchableOpacity
              onPress={() => props.navigation.navigate('termsScreen')}>
              <Text style={styles.termsTxt}>
                I’ve read and accept app Terms and Conditions
              </Text>
            </TouchableOpacity>
          </View>

          {/* Continue Button */}
          <ContinueButton
            text={'Create Account'}
            style={{width: '90%', marginHorizontal: 20, marginBottom: 50}}
            onPress={onCreate}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default connect(null, {signup})(CreateAccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',

    justifyContent: 'center',
    marginBottom: hp2(1),
  },
  heading: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
  },
  inputBox: {
    width: wp2(80),
    height: hp2(5),
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
  BDaystyle: {
    width: wp2(80),
    height: hp2(5),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: 'row',
    alignItems: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center',
    fontSize: rfv(10),
  },
  button: {
    width: wp2(50),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textBox: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
  textTwo: {fontWeight: '400', fontSize: rfv(10)},
  checkBoxWrap: {
    flexDirection: 'row',
    marginLeft: wp2(4),
    marginTop: 20,
    alignItems: 'flex-end',
    marginVertical: hp2(3),
  },
  termsTxt: {
    marginBottom: 2,
    color: 'black',
    fontWeight: '400',
    fontSize: rfv(11),
    marginLeft: Platform.OS === 'android' ? wp2(0) : wp2(2),
  },
});
