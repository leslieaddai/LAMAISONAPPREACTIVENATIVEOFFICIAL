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

export default function OrderComp(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{marginLeft:wp(3)}}>
        <Text style={{color:'#065521',fontWeight:'600',fontSize:rfv(14),}}>Delivered</Text>
        <Text style={{color:'black'}}>Flannel Jacket</Text>
        <Text style={{color:'black'}}>Noongoons</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(92),
    height: hp(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp(0.5),
  },
  imgWrap: {
    width: wp(16),
    height: wp(18),
    overflow: 'hidden',
    borderRadius: wp(4),
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
