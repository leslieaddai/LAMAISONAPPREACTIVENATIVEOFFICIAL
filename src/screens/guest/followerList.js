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
import SearchComp from '../../components/searchComp';

export default function FollowerList(props) {
  return (
    <View style={styles.container}>

    <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>{props.route.params.list=='following'?"FOLLOWING":"FOLLOWERS"}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Text style={styles.text}>BRANDS</Text>
        <View style={styles.line}></View>
        <Text style={styles.text}>EDITORS</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp2(12),
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: wp2(96),
          alignSelf: 'center',
        }}>
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
        <SearchComp />
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
  inputBox: {
    width: wp2(78),
    height: hp2(5),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    //marginVertical: hp2(1),
    //alignSelf:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
  iconContainer: {
    width: wp2(48),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp2(1),
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  text: {
    fontWeight: '700',
    fontSize: rfv(18),
    color: 'black',
  },
});
