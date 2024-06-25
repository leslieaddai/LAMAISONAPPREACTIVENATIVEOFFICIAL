import React from 'react';
import {StyleSheet, View, Image, Text, Platform} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';

import {useSelector} from 'react-redux';
import LogoComponent from '../auth/componnets/LogoComponent';
import fonts from '../../theme/fonts';
import SmallLogoComponnet from './smallLogoComp';

export default function WelcomeScreen(props) {
  const user = useSelector(state => state.userData);
  console.log('2222');
  console.log(user?.userData);
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>{'Hi '+user.userData.username}</Text> */}
      <View style={{padding: 20}}>
        <SmallLogoComponnet></SmallLogoComponnet>
      </View>
      <View
        style={[
          styles.imgWrap,
          {backgroundColor: Platform.OS == 'android' && 'white'},
        ]}>
        <Image
          source={
            user?.userData?.profile_image !== ''
              ? {uri: user?.userData?.profile_image}
              : IMAGES.profileIcon3
          }
          style={[
            {
              width: '100%',
              height: '100%',
              alignItems: 'center',
              borderRadius: 200, // Ensure the image stays within the circle
            },
          ]}
        />
      </View>
      <Text style={styles.largeText}>Hi {user?.userData?.name} 👋</Text>
      <Text style={styles.smallText}>Welcome Back</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  imgWrap: {
    // paddingBottom:20,
    width: wp2(50),
    height: wp2(50),
    overflow: 'hidden',
    borderRadius: 100,
    alignItems: 'center',
    elevation: 1,
  },

  text: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(34),
  },
  largeText: {
    paddingTop: 40,
    fontFamily: fonts.PoppinsMedium,
    // fontWeight: '400',
    fontSize: 34,
    textAlign: 'center',
    color: 'black',
  },
  smallText: {
    paddingTop: 20,
    fontFamily: fonts.PoppinsRegular,
    fontWeight: '400',
    fontSize: 18,
    // lineHeight: 18,
    textAlign: 'center',
    color: 'black',
  },
  // text: {
  //   fontFamily: 'Open Sans',
  //   fontWeight: '400',
  //   fontSize: 20,
  //   lineHeight: 27.24,
  //   textAlign: 'center',
  //   color: 'gray',
  // },
});
