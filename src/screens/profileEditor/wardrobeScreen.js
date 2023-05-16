import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
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
import WardrobeComp from '../../components/wardrobeComp';

export default function WardrobeScreen(props) {
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.wardrobeText}>WARDROBE</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',paddingTop:hp2(4),paddingBottom:hp2(12),justifyContent:'space-between'}}>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      <WardrobeComp/>
      </ScrollView>
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
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  wardrobeText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
  },
});
