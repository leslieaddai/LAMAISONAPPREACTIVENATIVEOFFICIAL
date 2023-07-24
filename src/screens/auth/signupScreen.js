import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import {ICONS, COLORS, wp2, hp2} from '../../theme';
import {
  RFValue as rfv,
  RFPercentage as rfp,
} from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import {errorMessage} from '../../config/NotificationMessage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { LoginManager, AccessToken ,Settings} from 'react-native-fbsdk-next';

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
    console.log("result", result,data)
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
  

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();

      // Get the users ID token
      const data = await GoogleSignin.signIn();

      console.log("data",data)

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

      // console.log("googleCredential of login", googleCredential);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Google sign-in error:', error.code, error.message);
    }
  }

  const special = /[!@#\$%\^\&*\)\(+=._-]/g;
  const numeric = /[0-9]/;

  function ValidateEmail(input) {

    //var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    if (input.match(validRegex)) {
  
      return true;
  
    } else {
  
      return false;
  
    }
  
  }
  
  

  const onContinue = () => {
    if (firstName != '' && lastName != '' && email != '') {
      if(!numeric.test(firstName)){
        if(!special.test(firstName.match(special))){
          if(!numeric.test(lastName)){
            if(!special.test(lastName.match(special))){
             if(ValidateEmail(email)){
              let data = {
                firstName: firstName,
                lastName: lastName,
                email: email,
              };
              props.navigation.navigate('accountTypeScreen', {data: data});
             }else{
              errorMessage('Invalid email address!');
             }
            }else{
              errorMessage('Please remove special characters from last name!');
            }
          }else{
            errorMessage('Please remove numbers from last name!');
          }
        }else{
          errorMessage('Please remove special characters from first name!');
        }
      }else{
        errorMessage('Please remove numbers from first name!');
      }
    } else {
      errorMessage('Please fill all details');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:hp2(4)}}> */}
      <Text style={[styles.signupText]}>Create new account</Text>
      <View style={styles.inputWrap}>
        <View style={[styles.inputBox, {width: wp2(36)}]}>
          <TextInput
            style={styles.inputTxt}
            placeholder="FIRST NAME"
            placeholderTextColor={'grey'}
            onChangeText={val => setFirstName(val.replace(/\s+/g, ' ').trim())}
          />
        </View>
        <View style={[styles.inputBox, {width: wp2(36)}]}>
          <TextInput
            style={styles.inputTxt}
            placeholder="LAST NAME"
            placeholderTextColor={'grey'}
            onChangeText={val => setLastName(val.replace(/\s+/g, ' ').trim())}
          />
        </View>
      </View>
      <Text style={styles.text}>
        I hope you trust us but this is so we know we can trust you
      </Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.inputTxt}
          placeholder="EMAIL"
          placeholderTextColor={'grey'}
          onChangeText={val => setEmail(val)}
        />
      </View>
      <Text style={styles.text}>
        This has to be real so we can stay in contact with you
      </Text>
      <TouchableOpacity
        onPress={onContinue}
        style={[styles.button, {width: wp2(48)}]}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          onGoogleButtonPress().then(res =>
            console.log('Signed in with Google!',res),
          )
        }
        style={styles.button2}>
        <ICONS.AntDesign
          name="google"
          size={24}
          color="black"
          style={{position: 'absolute', left: wp2(4)}}
        />
        <Text style={styles.button2Text}>continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
        style={styles.button2}>
        <ICONS.AntDesign
          name="facebook-square"
          size={24}
          color="black"
          style={{position: 'absolute', left: wp2(4)}}
        />
        <Text style={styles.button2Text}>continue with facebook</Text>
      </TouchableOpacity>
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  signupText: {
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
  text: {
    color: 'black',
    fontWeight: '700',
    marginHorizontal: wp2(11),
    marginVertical: hp2(1),
    fontSize: rfv(8.5),
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
    //marginVertical:hp(2),
    marginTop: hp2(2),
    alignSelf: 'center',
    marginBottom: hp2(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  button2: {
    width: wp2(78),
    height: hp2(6),
    backgroundColor: 'white',
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
    elevation: 8,
    //marginVertical:hp(2),
    marginTop: hp2(2),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button2Text: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(11),
    textTransform: 'uppercase',
  },
  inputWrap: {
    flexDirection: 'row',
    width: wp2(80),
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  inputTxt: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
});
