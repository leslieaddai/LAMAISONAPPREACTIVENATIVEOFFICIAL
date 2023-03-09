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
import GalleryComp from '../../components/galleryComp';

export default function GalleryScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity style={{position: 'absolute', left: wp(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.galleryText}>Gallery</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:wp(96),flexDirection:'row',flexWrap:'wrap',paddingTop:hp(1),paddingBottom:hp(12),}}>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
        <GalleryComp/>
      </ScrollView>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: hp(5),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp(100),
  },
  galleryText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
});
