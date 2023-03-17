import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
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

export default function GuestScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Image
          source={IMAGES.logo}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('signupScreen')}
        style={styles.button}>
        <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('loginScreen')}
        style={styles.button}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> alert('continue as guest')} style={{marginTop:hp2(12)}}>
        <Text style={styles.guestText}>CONTINUE AS GUEST</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    //justifyContent:'center',
  },
  logoWrap: {
    width: wp2(60),
    height: hp2(20),
    overflow: 'hidden',
    marginTop:hp2(24),
  },
  button: {
    width: wp2(70),
    height: hp2(7),
    backgroundColor: 'black',
    borderRadius: wp2(8),
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
    marginVertical:hp2(2),
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  guestText:{
    color:'black',
    fontWeight:'700',
    fontSize:rfv(13),
    textDecorationLine:'underline',
  },
});
