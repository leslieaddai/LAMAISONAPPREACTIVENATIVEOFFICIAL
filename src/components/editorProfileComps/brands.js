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

export default function BrandComp(props) {
  return (
    <View style={styles.brandImage}>
      <Image
        source={IMAGES.randomPic}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  brandImage: {
    width: wp2(20),
    height: hp2(10),
    overflow: 'hidden',
    borderRadius: wp2(6),
    marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
