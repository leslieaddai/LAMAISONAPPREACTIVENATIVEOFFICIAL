import React, {useState,useEffect} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function ImageUploadScreen(props) {

const openGallery = async () => {
    const result = await launchImageLibrary({mediaType:'photo'});
    console.log(result.assets);
}

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>openGallery()}>
      <Text style={styles.heading}>Gallery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginVertical: hp2(4),
    //marginLeft: wp2(8),
    alignSelf:'center',
  },
});
