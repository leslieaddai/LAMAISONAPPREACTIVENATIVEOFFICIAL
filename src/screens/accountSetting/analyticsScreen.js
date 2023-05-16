import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
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

export default function AnalyticsScreen(props) {
  const boxComp = badge => {
    return (
      <View style={styles.box2}>
        <Text style={[styles.textOne, {fontSize: rfv(24)}]}>20,000</Text>
        {badge ? (
          <View style={styles.badge}>
            <Image
              source={IMAGES.badge}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text style={styles.textTwo}>SALES</Text>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
         <View style={styles.container}>
      <Text style={styles.heading}>Hello Represent!</Text>

      <View style={styles.box}>
        <Text style={styles.textOne}>£255,000</Text>
        <Text style={styles.textTwo}>PROFIT</Text>
      </View>

      <View style={styles.detailsContainer}>
        {boxComp(false)}
        {boxComp(false)}
        {boxComp(false)}
        {boxComp(false)}
        {boxComp(false)}
        {boxComp(true)}
      </View>

      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontSize: rfv(22),
    fontWeight: '700',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    marginLeft: wp2(8),
  },
  box: {
    width: wp2(88),
    height: hp2(22),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  detailsContainer: {
    width: wp2(88),
    //backgroundColor: 'red',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp2(2),
  },
  box2: {
    width: wp(40),
    height: hp(12),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp2(1.5),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textOne: {color: '#076426', fontSize: rfv(30)},
  textTwo: {color: 'black', fontSize: rfv(18), fontWeight: '600'},
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
});
