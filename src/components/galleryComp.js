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

export default function GalleryComp(props) {
  //console.log(props);
  return (
    <View style={styles.imageContainer}>
      <Image
        source={IMAGES.randomPic}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp(30),
    height: hp(18),
    overflow: 'hidden',
    marginHorizontal: wp(1),
    marginTop:hp(1),
  },
});
