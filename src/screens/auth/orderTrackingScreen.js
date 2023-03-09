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
import LineComp from '../../components/lineComp';
import OrderComp from '../../components/orderComp';

export default function OrderTrackingScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.orderText}>Order Tracking</Text>
      <ScrollView contentContainerStyle={{paddingBottom: hp(12)}}>
        <LineComp />
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <LineComp />
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
        <OrderComp/>
      </ScrollView>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  orderText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
    marginTop:hp(5),
    alignSelf:'center',
  },
});
