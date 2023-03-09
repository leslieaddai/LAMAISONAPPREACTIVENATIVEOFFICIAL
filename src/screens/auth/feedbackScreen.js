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
import FeedbackMessageComp from '../../components/feedbackMessageComp';
import BottomComp from '../../components/bottomComp';
import LineComp from '../../components/lineComp';

export default function FeedbackScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.supportText}>Customer Support</Text>
      <LineComp/>
      <FeedbackMessageComp />
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  supportText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: hp(5),
    marginLeft: wp(12),
  },
});
