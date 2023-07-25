import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  Button,
  SafeAreaView,
  ActivityIndicator,
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
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';
import {signup} from '../../store/actions/authAction';
import {message} from '../../store/message';
import DatePicker from 'react-native-date-picker';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {RegisterUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import LoaderComp from '../../components/loaderComp';

const CreateAccountScreen = props => {
  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  const [stateChange, setStateChange] = useState({
    BrandName: props?.route?.params?.user=='editor'?undefined:'',
    UserName: '',
    Newpassword: '',
    ConfirmPass: '',
    Birthday: subtractYears(new Date(),6),
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {BrandName, UserName, Newpassword, ConfirmPass, Birthday} = stateChange;
  const [checkBox, setCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(special.test(Newpassword));
  
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
    if(!containsWhitespace(UserName)){
      if (UserName.length >= 6) {
        if (Newpassword.length >= 8) {
          if (numeric.test(Newpassword)) {
            if (special.test(Newpassword.match(special))) {
              if (ConfirmPass === Newpassword) {
                if (checkBox) {
                  let obj = {
                    first_name: props.route.params.data.firstName,
                    last_name: props.route.params.data.lastName,
                    name: BrandName,
                    username: UserName,
                    dob: Birthday.toISOString().split('T')[0],
                    email: props.route.params.data.email,
                    password: Newpassword,
                    password_confirmation: ConfirmPass,
                    role_id: props.route.params.user == 'editor' ? 2 : 3,
                  };

                  console.log(obj);
                  setLoading(true);

                  axios
                    .post(RegisterUrl, obj)
                    .then(async function (res) {
                      console.log(res.data);
                      setLoading(false);
                      //props.navigation.navigate('loginScreen');
                      props.navigation.navigate('verifyAccountScreen',{role:props?.route?.params?.user == 'editor' ? 2 : 3,data:res?.data?.user?.stripe_account});
                      //props.navigation.replace('loginScreen')
                      successMessage(
                        'Account verification code is sent to your email. Please check.',
                      );
                    })
                    .catch(function (error) {
                      setLoading(false);
                      errorMessage(errorHandler(error))
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
    }else{
      errorMessage('Please remove space from username!')
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
      <SafeAreaView style={styles.container}>
        {/* <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: hp2(4)}}> */}
        <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>
          {props.route.params.user == 'editor'
            ? 'Create Editor Account'
            : 'Create Brand Account'}
        </Text>
      </View>

        {props.route.params.user == 'brand' && (
          <View style={styles.inputBox}>
            <TextInput
              style={styles.textBox}
              onChangeText={val => updateState({BrandName: val})}
              placeholder="BRAND NAME"
              placeholderTextColor={'grey'}
            />
          </View>
        )}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textBox}
            onChangeText={val => updateState({UserName: val})}
            placeholder="USERNAME"
            placeholderTextColor={'grey'}
          />
        </View>
        <Text style={styles.text}>What do you want to be known for?</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textBox}
            secureTextEntry={true}
            onChangeText={val => updateState({Newpassword: val})}
            placeholder="PASSWORD"
            placeholderTextColor={'grey'}
          />
        </View>
        <Text style={styles.text}>
          Something you will remember but is hard to guess
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textBox}
            secureTextEntry={true}
            onChangeText={val => updateState({ConfirmPass: val})}
            placeholder="CONFIRM PASSWORD"
            placeholderTextColor={'grey'}
          />
        </View>
        <Text style={styles.text}>Type it again, but its not a test.</Text>
        <View style={{alignSelf: 'center', marginTop: hp2(2), width: wp2(80)}}>
          <Text
            style={[
              styles.textTwo,
              {color: Newpassword.length >= 8 ? COLORS.green : COLORS.red},
            ]}>
            Must be at least 8 characters
          </Text>
          <Text
            style={[
              styles.textTwo,
              {color: numeric.test(Newpassword) ? COLORS.green : COLORS.red},
            ]}>
            Must include at least 1 Numerical character
          </Text>
          <Text
            style={[
              styles.textTwo,
              {color: Newpassword.match(special) ? COLORS.green : COLORS.red},
            ]}>
            Must include at least 1 special character ( Examples !”£$)
          </Text>
        </View>
        <TouchableOpacity
          style={styles.BDaystyle}
          onPress={() => setOpen(true)}>
          {/* <TextInput  placeholder="BIRTHDAY DD/MM/YYYY" onChangeText={(val) => updateState({Birthday:val})} placeholderTextColor={'grey'}/> */}
          {/* <Button title="Open" onPress={() => setOpen(true)} /> */}
          <Text style={styles.textBox}>{Birthday == null?`BIRTHDAY DD/MM/YYYY`:` ${Birthday.getDate()} - ${ Birthday.getMonth()+1} - ${Birthday.getFullYear()}`}</Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode="date"
          open={open}
          date={Birthday}
          maximumDate={subtractYears(new Date(),6)}
          onConfirm={date => {
            setOpen(false);
            updateState({Birthday: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Text style={styles.text}>So we can wish you a Happy Birthday</Text>

        <View style={styles.checkBoxWrap}>
          <CheckBox
            onTintColor="black"
            tintColor="black"
            onFillColor="black"
            onCheckColor="white"
            boxType="square"
            value={checkBox}
            onValueChange={setCheckBox}
            tintColors={{true: 'black', false: 'black'}}
          />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('termsScreen')}>
            <Text style={styles.termsTxt}>Terms and Conditions</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onCreate} style={styles.button}>
          <Text style={{color: 'white'}}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        {/* </KeyboardAwareScrollView> */}
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
    //backgroundColor:'red',
    justifyContent: 'center',
    marginBottom:hp2(1),
  },
  heading: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    //marginLeft: wp2(8),
    //marginBottom: hp2(2),
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
  textTwo: {fontWeight: '700', fontSize: rfv(10)},
  checkBoxWrap: {
    flexDirection: 'row',
    marginLeft: wp2(8),
    //alignItems: 'center',
    alignItems: 'flex-end',
    marginVertical: hp2(3),
  },
  termsTxt: {
    color: 'black',
    fontWeight: '700',
    textDecorationLine: 'underline',
    marginLeft: wp2(2),
  },
});
