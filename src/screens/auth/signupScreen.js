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
  SafeAreaView,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { errorMessage } from '../../config/NotificationMessage';

export default function SignupScreen(props) {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [email,setEmail]=useState('')

  const onContinue = () => {
    if (firstName != "" && lastName != "" && email != "") {
        let data = {
          firstName: firstName,
          lastName: lastName,
          email: email,
        };
        props.navigation.navigate("accountTypeScreen", { data: data });
    } else {
      //alert("Please fill all details");
      errorMessage('Please fill all details');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={{paddingBottom:hp2(4)}}>
        <Text style={[styles.signupText]}>Create new account</Text>
        <View style={{flexDirection:'row',width:wp2(80),justifyContent:'space-between',alignSelf:'center',}}>
        <View style={[styles.inputBox,{width:wp2(36)}]}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp2(2),
              fontSize: rfv(13),
              fontWeight: '700',
        
            }}
            placeholder="FIRST NAME"
            placeholderTextColor={'grey'}
            onChangeText={(val) => setFirstName(val.replace(/\s+/g, " ").trim())}
          />
        </View>
        <View style={[styles.inputBox,{width:wp2(36)}]}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp2(2),
              fontSize: rfv(13),
              fontWeight: '700',
              
            }}
            placeholder="LAST NAME"
            placeholderTextColor={'grey'}
            onChangeText={(val) => setLastName(val.replace(/\s+/g, " ").trim())}
          />
        </View>
        </View>
        <Text style={styles.text}>I hope you trust us but this is so know we can trust you</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp2(2),
              fontSize: rfv(13),
              fontWeight: '700',
             
            }}
            placeholder="EMAIL"
            placeholderTextColor={'grey'}
            onChangeText={(val) => setEmail(val)}
          />
        </View>
        <Text style={styles.text}>This has to be real so we can stay in contact with you</Text>
        <TouchableOpacity onPress={onContinue}
          style={[styles.button, {width: wp2(48)}]}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('signin with google')}
          style={styles.button2}>
          <ICONS.AntDesign name="google" size={24} color="black" style={{position:'absolute',left:wp2(4)}} />
          <Text style={styles.button2Text}>continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert('signin with fb')}
          style={styles.button2}>
          <ICONS.AntDesign name="facebook-square" size={24} color="black" style={{position:'absolute',left:wp2(4)}} />
          <Text style={styles.button2Text}>continue with facebook</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    marginLeft:wp2(8),
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
    alignSelf:'center',
  },
  text:{
    color:'black',
    fontWeight:'700',
    marginHorizontal:wp2(11),
    marginVertical:hp2(1),
    fontSize:rfv(8.5),
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
    alignSelf:'center',
    marginBottom:hp2(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  button2:{
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
    alignSelf:'center',
    flexDirection:'row',
  },
  button2Text: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(11),
    textTransform:'uppercase',
  },
});
