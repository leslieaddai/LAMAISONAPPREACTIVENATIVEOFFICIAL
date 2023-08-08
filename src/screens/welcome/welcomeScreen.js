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

import { useDispatch,useSelector } from 'react-redux';

export default function WelcomeScreen(props) {
  const user = useSelector(state => state.userData)
 
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{'Hi '+user.userData.username}</Text>
      <View style={[styles.imgWrap,{backgroundColor:Platform.OS =='android'&&'white'}]}>
        <Image
          source={user?.userData?.profile_image!==''?{uri:user?.userData?.profile_image}:IMAGES.profileIcon3}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.text,{fontSize:rfv(28),textAlign:'center'}]}>Welcome Back</Text>
      <View style={{width:wp2(100),height:hp2(8),position:'absolute',bottom:hp2(2),elevation:5}}>
        <Text style={{fontSize:rfv(18),alignSelf:'center',color:'gray'}}>LA MAISON APP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imgWrap: {
    width: wp2(50),
    height: wp2(60),
    overflow: 'hidden',
    borderRadius: wp2(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:5
  },
  text:{
    color:'black',
    fontWeight:'700',
    fontSize:rfv(34),
  },
});
