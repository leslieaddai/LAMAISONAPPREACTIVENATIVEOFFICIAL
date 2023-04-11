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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function PasswordChange(props) {
    // const textBox = (placeText,onChangeText) => {
    //     return(
            
    //     )
    // }
    const special =/[!@#\$%\^\&*\)\(+=._-]/g
    const numeric = /[0-9]/

    const [stateChange, setStateChange] = useState({
      currentPassword:'',
      Newpassword:'',
      ReEnterpassword:'',
    })
    const updateState = data => setStateChange(prev => ({...prev, ...data}));
    const {
      currentPassword,
      Newpassword,
      ReEnterpassword,
    } = stateChange;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>PASSWORD</Text>
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
      <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder={'ENTER CURRENT PASSWORD'}
              placeholderTextColor={'grey'}
              onChangeText={(e)=>{updateState({currentPassword:e})}}
            />
            
          </View>
      <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder={'ENTER NEW PASSWORD'}
              placeholderTextColor={'grey'}
              onChangeText={(e)=>{updateState({Newpassword:e})}}
            />
            
          </View>
      <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder={'RE-ENTER NEW PASSWORD'}
              placeholderTextColor={'grey'}
              onChangeText={(e)=>{updateState({ReEnterpassword:e})}}
            />
            
          </View>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>RESET PASSWORD</Text>
        </TouchableOpacity>

        <View style={{alignSelf: 'center', marginTop: hp2(10),width:wp2(80)}}>
          <Text style={[styles.text,{color:Newpassword.length>=8?COLORS.green:COLORS.red}]}>Must be at least 8 characters</Text>
          <Text style={[styles.text,{color:numeric.test(Newpassword)?COLORS.green:COLORS.red}]}>
            Must include at least 1 Numerical character
          </Text>
          <Text style={[styles.text,{color:special.test(Newpassword)?COLORS.green:COLORS.red}]}>
            Must include at least 1 special character ( Examples !”£$)
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
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
    marginVertical: hp2(1),
    alignSelf:'center',
  },
  button: {
    width: wp2(62),
    height: hp2(6),
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
    marginTop: hp2(3),
    alignSelf:'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
  text: { fontWeight: '800', fontSize: rfv(10)},
});
