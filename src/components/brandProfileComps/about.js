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

export default function About(props) {
  return (
    <>
      <Text style={styles.aboutText}>ABOUT</Text>
      

      
      <Text style={styles.aboutDesc}>{props?.data?.about}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  aboutText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(18),
    marginLeft: wp2(3),
    marginBottom: hp2(2),
  },
  aboutDesc: {
    color: 'black',
    marginHorizontal: wp2(3),
    textTransform: 'uppercase',
    textAlign: 'justify',
  },
});
