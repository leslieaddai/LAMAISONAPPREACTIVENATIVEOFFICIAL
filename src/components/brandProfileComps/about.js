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
      {/* <Text
        style={[styles.aboutText, {fontSize: rfv(12), marginBottom: hp2(0.5)}]}>
        A NEW AGE
      </Text> */}

      {/* <Text
        style={{
          color: 'black',
          marginHorizontal: wp2(3),
          textTransform: 'uppercase',
          textAlign:'justify',
        }}>
        The year began with an overhaul of our website, with a completely new
        site built to align with the aesthetic of what we had become. The new
        site also provided customers with a seamless purchasing experience and
        new ways of viewing our garments. The 247 pants had been an instant
        success, and sold out instantly with every restock, so we began to build
        out the range with the same crossover of fashion and activewear goal.
        {'\n\n'}
        The 3 pillars of Represent were born. We defined these as mainline, 247
        and Blank, each having dedicated launches throughout the year, with
        every pillar having a slightly different demographic of customer.
        {'\n\n'} 
        2021 also saw the launch of our Owners’ Club collection, a
        range inspired by vintage car owners’ clubs, where like-minded
        enthusiasts can share their passions. We branded Owners’ Club to be ‘For
        enthusiasts, by enthusiasts’ to create garments which can be worn by
        customers to acknowledge their passion for the brand.
      </Text> */}
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
