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
import NextPickupComp from '../../components/nextPickupComp';

export default function NextPickupScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.pickupText}>NEXT PICKUP</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:wp2(100),flexDirection:'row',flexWrap:'wrap',paddingTop:hp2(1),paddingBottom:hp2(12),justifyContent:'space-between'}}>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
        <NextPickupComp/>
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
    marginTop: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  pickupText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
});
