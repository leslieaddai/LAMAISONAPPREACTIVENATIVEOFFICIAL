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
  //console.log(props.item.item,'=======>');
  return (
    <View style={styles.imageContainer}>
      {props?.item?.item?.media?.[0]?.original_url && 
            <Image
            //source={IMAGES.randomPic}
            source={{uri:props?.item?.item?.media?.[0]?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(30),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop:hp2(1),
  },
});
