import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
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
import AlertComp from '../../components/alertComp';

export default function LoginScreen(props) {
  const [showError, setShowError] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:hp(4)}}>
        <Text style={styles.signinText}>Sign in - Welcome Back</Text>
        {showError && (
          <AlertComp text="Username or Password is incorrect"/>
        )}
        <View style={styles.inputBox}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp(2),
              fontSize: rfv(13),
              fontWeight: '700',
            }}
            placeholder="username"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp(2),
              fontSize: rfv(13),
              fontWeight: '700',
            }}
            placeholder="password"
          />
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('resetPassScreen')}>
          <Text style={styles.forgetText}>
            Forgotten your Username/Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('loginScreen')}
          style={styles.button}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('signupScreen')}
          style={[styles.button, {width: wp(48), marginTop: hp(10)}]}>
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('guestScreen')}
          style={[styles.button, {width: wp(54), marginTop: hp(4)}]}>
          <Text style={styles.buttonText}>CONTINUE AS GUEST</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  signinText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginVertical: hp(5),
    marginLeft:wp(8),
  },
  inputBox: {
    width: wp(80),
    height: hp(6),
    backgroundColor: 'white',
    borderRadius: wp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp(2),
    alignSelf:'center',
  },
  forgetText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    textDecorationLine: 'underline',
    textTransform: 'uppercase',
    marginVertical: hp(2),
    alignSelf:'center',
  },
  button: {
    width: wp(28),
    height: hp(7),
    backgroundColor: 'black',
    borderRadius: wp(10),
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
    marginTop: hp(3),
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
});
