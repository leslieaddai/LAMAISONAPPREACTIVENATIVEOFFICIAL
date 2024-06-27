import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
  Image,
} from 'react-native';
import {COLORS, wp2, hp2, ICONS, IMAGES} from '../../theme';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {errorMessage} from '../../config/NotificationMessage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import LogoComponent from './componnets/LogoComponent';
import NewInputComp from '../../components/NewInputComp';

export default function SignupScreen(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Settings.setAppID('6305325462877732')
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '74975728118-9v9hiph09jaks6tgdfa755rkf7l7vsrq.apps.googleusercontent.com',
      iosClientId:
        '74975728118-k752rb5vodjvsfrk6bo0p0evvvg2ae6u.apps.googleusercontent.com',
      offlineAccess: true,
    });

    setFirstName('');
    setLastName('');
    setEmail('');
  }, []);

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    console.log('result', result, data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    console.log('facebookCredential of login', facebookCredential);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  // async function onGoogleButtonPress() {
  //   try {
  //     // Check if your device supports Google Play
  //     await GoogleSignin.hasPlayServices();

  //     // Get the users ID token
  //     const data = await GoogleSignin.signIn();

  //     // console.log("data",data)
  //     props.navigation.navigate('accountTypeSocial', {data: data});

  //     // Create a Google credential with the token
  //     const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

  //     // console.log("googleCredential of login", googleCredential);

  //     // Sign-in the user with the credential
  //     // return auth().signInWithCredential(googleCredential);
  //   } catch (error) {
  //     console.log('Google sign-in error:', error.code, error.message);
  //   }
  // }

  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  function ValidateEmail(input) {
    var validRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})?)$/;
    const isValidEmail = validRegex.test(input);

    // if (isValidEmail) {

    // } else {

    //   return false;

    // }

    return isValidEmail;
  }

  const onContinue = () => {
    if (firstName != '' && lastName != '' && email != '') {
      if (!numeric.test(firstName)) {
        if (!special.test(firstName.match(special))) {
          if (!numeric.test(lastName)) {
            if (!special.test(lastName.match(special))) {
              if (ValidateEmail(email)) {
                let data = {
                  firstName: firstName,
                  lastName: lastName,
                  email: email,
                };
                props.navigation.navigate('accountTypeScreen', {data: data});
              } else {
                errorMessage('Invalid email address!');
              }
            } else {
              errorMessage('Please remove special characters from last name!');
            }
          } else {
            errorMessage('Please remove numbers from last name!');
          }
        } else {
          errorMessage('Please remove special characters from first name!');
        }
      } else {
        errorMessage('Please remove numbers from first name!');
      }
    } else {
      errorMessage('Please fill all details');
    }
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={styles.container}>
        <LogoComponent txt="Create New Account"></LogoComponent>
        <View style={styles.inputWrap}>
          {/* <View style={[styles.inputBox]}>
            <TextInput
              style={styles.inputTxt}
              placeholder="First Name"
              placeholderTextColor={'grey'}
              onChangeText={val =>
                setFirstName(val.replace(/\s+/g, ' ').trim())
              }
            />
          </View> */}
          {/* <View style={[styles.inputBox]}>
            <TextInput
              style={styles.inputTxt}
              placeholder="Last Name"
              placeholderTextColor={'grey'}
              onChangeText={val => setLastName(val.replace(/\s+/g, ' ').trim())}
            />
          </View> */}
          {/* <View style={styles.inputBox}>
          <TextInput
            style={styles.inputTxt}
            placeholder="Email"
            placeholderTextColor={'grey'}
            onChangeText={val => setEmail(val.toLowerCase())}
          />
        </View> */}
          <NewInputComp
            handleOnChange={val =>
              setFirstName(val.replace(/\s+/g, ' ').trim())
            }
            inputText={'First Name'}
          />
          <View style={{marginVertical: -20}}>
            <NewInputComp
              handleOnChange={val =>
                setLastName(val.replace(/\s+/g, ' ').trim())
              }
              inputText={'Last Name'}
            />
          </View>
          <NewInputComp
            handleOnChange={val => setEmail(val.toLowerCase())}
            inputText={'Email'}
          />
        </View>

        <TouchableOpacity
          onPress={onContinue}
          style={[styles.button, {marginTop: 10}]}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        {/* <View style={styles.divider} /> */}

        {/* <TouchableOpacity
          onPress={() =>
            onGoogleButtonPress().then(res =>
              console.log('Signed in with Google!', res),
            )
          }
          style={[
            styles.buttonWhite,
            {
              flexDirection: 'row', // Display the icon and text in a row
              alignItems: 'center',
            },
          ]}>
          <Image
            source={IMAGES.googleIcon}
            style={{marginHorizontal: 10}}
            resizeMode="cover"
          />
          <Text style={styles.buttonTextBlack}>Continue with Google</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
        style={styles.button2}>
        <ICONS.AntDesign
          name="facebook-square"
          size={24}
          color="black"
          style={{position: 'absolute', left: wp2(4)}}
        />
        <Text style={styles.button2Text}>continue with facebook</Text>
      </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  logoWrap: {
    // width: wp2(30),
    height: hp2(10),
    // paddingBottom:100,
    overflow: 'hidden',
    marginTop: hp2(10),
    marginBottom: hp2(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  signinText: {
    color: 'black',
    fontSize: 22, // Assuming rfv() returns the font size in pixels
    fontFamily: 'Poppins-Regular', // Use the Poppins font
    fontWeight: '400', // Font weight 400
    lineHeight: 33, // Line height 33px
    marginVertical: 8, // Adjust margin as needed
    marginTop: Platform.OS === 'ios' ? 0 : 4, // Adjust margin top based on platform
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },
  inputBox: {
    // width: 374,
    width: '90%',
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: 2,
    alignSelf: 'center',
    // padding: '16px 20px', // Padding top, right, bottom, left
    borderWidth: 1,
    borderColor: '#D4D4D4',
    // position: 'absolute',
  },
  forgetText: {
    color: '#000000', // Black color
    fontWeight: '400', // Font weight 400
    fontSize: 14, // Font size 14 pixels
    fontFamily: 'Poppins-Medium', // Use the Poppins font
    lineHeight: 21, // Line height 21 pixels
    marginVertical: 2, // Adjust margin as needed
    alignSelf: 'center', // Center text horizontally
    marginBottom: 20,
  },

  buttonWhite: {
    width: '90%',
    paddingHorizontal: 10,
    height: 50,
    // paddingHorizontal: 20, // Horizontal padding
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D4D4D8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonTextBlack: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular', // Assuming "Poppins-Regular" is the name of your font
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
    fontFamily: 'Poppins-SemiBold', // Assuming "Poppins-Regular" is the name of your font
  },
  divider: {
    marginVertical: 40,
    height: 2,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 70,
  },
  inputTxt: {
    flex: 1,
    color: '#4D4D4D',
    paddingHorizontal: wp2(2),
    fontSize: rfv(16),
    fontWeight: '400',
  },

  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '100%',
    height: '75%',
  },
  cancelButton: {
    alignItems: 'flex-end',
    paddingHorizontal: wp2(1),
  },
  soccialbuttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  roundbutton: {
    backgroundColor: 'black',
    width: wp2(16),
    height: hp2(8),
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orstyle: {
    color: 'black',
    fontSize: hp2(3),
    alignSelf: 'center',
    marginTop: hp2(2),
  },
  button2: {
    width: wp2(68),
    height: hp2(6),
    borderRadius: wp2(3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginTop: hp2(2),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button2Text: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(11),
    textTransform: 'uppercase',
    marginLeft: wp2(2),
  },
});
