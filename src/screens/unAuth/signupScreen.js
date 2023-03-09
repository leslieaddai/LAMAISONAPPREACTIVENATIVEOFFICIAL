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

export default function SignupScreen(props) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom:hp(4)}}>
        <Text style={styles.signupText}>Create new account</Text>
        <View style={{flexDirection:'row',width:wp(80),justifyContent:'space-between',alignSelf:'center',}}>
        <View style={[styles.inputBox,{width:wp(36)}]}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp(2),
              fontSize: rfv(13),
              fontWeight: '700',
        
            }}
            placeholder="first name"
          />
        </View>
        <View style={[styles.inputBox,{width:wp(36)}]}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp(2),
              fontSize: rfv(13),
              fontWeight: '700',
              
            }}
            placeholder="last name"
          />
        </View>
        </View>
        <Text style={styles.text}>I hope you trust us but this is so know we can trust you</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp(2),
              fontSize: rfv(13),
              fontWeight: '700',
             
            }}
            placeholder="email"
          />
        </View>
        <Text style={styles.text}>This has to be real so we can stay in contact with you</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('signupScreen')}
          style={[styles.button, {width: wp(48)}]}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('signin with google')}
          style={styles.button2}>
          <ICONS.AntDesign name="google" size={24} color="black" style={{position:'absolute',left:wp(4)}} />
          <Text style={styles.button2Text}>continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('signin with fb')}
          style={styles.button2}>
          <ICONS.AntDesign name="facebook-square" size={24} color="black" style={{position:'absolute',left:wp(4)}} />
          <Text style={styles.button2Text}>continue with facebook</Text>
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
  signupText: {
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
  text:{
    color:'black',
    fontWeight:'700',
    marginLeft:wp(11),
    marginVertical:hp(1),
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
    marginTop: hp(2),
    alignSelf:'center',
    marginBottom:hp(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  button2:{
    width: wp(78),
    height: hp(6),
    backgroundColor: 'white',
    borderRadius: wp(3),
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
    marginTop: hp(2),
    alignSelf:'center',
    flexDirection:'row',
  },
  button2Text: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(14),
    textTransform:'uppercase',
  },
});
