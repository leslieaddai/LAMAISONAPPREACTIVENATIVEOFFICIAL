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
import BottomComp from '../../components/bottomComp';

export default function AccountTypeScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.accTypeText}>Account Type</Text>
      <TouchableOpacity style={[styles.box,{marginTop:hp(20),marginBottom:hp(6)}]}>
        <View style={styles.iconWrap}>
        <Image
            source={IMAGES.editoricon}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={{color:'black'}}>Editor</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box}>
        <View style={styles.iconWrap}>
        <Image
            source={IMAGES.brandicon}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={{color:'black'}}>Brand</Text>
      </TouchableOpacity>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
  },
  accTypeText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: hp(5),
  },
  box:{
    width: wp(38),
    height: hp(18),
    backgroundColor: 'white',
    borderRadius: wp(6),
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
  },
  iconWrap:{
    width: wp(18),
    height: wp(18),
    overflow: 'hidden',
  },
});
