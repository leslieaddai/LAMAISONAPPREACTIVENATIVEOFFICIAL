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
import fonts from '../theme/fonts';
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
} from '../theme';

export default function AlertComp(props) {
    //console.log(props);
  return (
    <View style={styles.errorWrap}>
      <Text style={styles.errorText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorWrap: {
    width: wp2(80),
    height: hp2(10),
    backgroundColor: '#B00002',
    borderRadius: wp2(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp2(4),
    marginBottom: hp2(2),
    alignSelf: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(13),
    textTransform: 'uppercase',
  },
});