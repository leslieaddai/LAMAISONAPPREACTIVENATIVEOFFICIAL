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
import ReviewComp from '../../components/reviewComp';
import BottomComp from '../../components/bottomComp';
import LineComp from '../../components/lineComp';

export default function Review(props) {
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
       <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.supportText}>Review</Text>
        <TouchableOpacity  onPress={()=>props.navigation.navigate('addReview')}  style={{position: 'absolute', right: wp2(4)}}>
        <ICONS.AntDesign name="pluscircle" size={30} color="#162FAC" />
        </TouchableOpacity>
      </View>
      <LineComp/>
      <ReviewComp />
      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    //justifyContent: 'center',
    width:wp2(100),
  },
  supportText: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    marginLeft: wp2(12),
  },
});
