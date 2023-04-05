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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ShippingLocation(props) {
    const options = (text) => {
        return(
            <View style={styles.optionWrap}>
                <Text style={{color:'black'}}>{text}</Text>
                <TouchableOpacity style={styles.circle}>

                </TouchableOpacity>
            </View>
        )
    }
  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:hp2(2),}}>

        <Text style={styles.heading}>Shipping Information</Text>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'PLEASE INPUT YOUR BRANDS GENERAL SHIPPING INFORMATION'}
          multiline={true}
          style={{
            flex: 1,
            color: 'black',
            fontWeight: '700',
            fontSize: rfv(14),
            textAlignVertical: 'top',
          }}
        />
      </View>
      <View style={{width:wp2(88),alignSelf:'center'}}>
      <Text style={{color:'black',fontWeight:'700',marginBottom:hp2(2)}}>Select Shipping Location</Text>
      </View>
      {options('ASIA')}
      {options('AFRICA')}
      {options('NORTH AMERICA')}
      {options('SOUTH AMERICA')}
      {options('EUROPE')}
      {options('AUSTRALIA')}
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'white'}}>CONFIRM</Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
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
    fontWeight: '700',
    fontSize: rfv(20),
    textTransform:'uppercase',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignSelf:'center',
  },
  textBox: {
    width: wp2(88),
    height: hp2(30),
    backgroundColor: 'white',
    borderRadius: wp2(2),
    alignSelf:'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp2(4),
    marginBottom:hp2(2),
    paddingHorizontal: wp2(2),
    paddingVertical: wp2(2),
  },
  optionWrap:{
    width:wp2(90),
    height:hp2(4),
    //backgroundColor:'red',
    borderBottomWidth:1,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:wp2(1),
    marginTop:hp2(2),
    alignSelf:'center',
  },
  circle:{
    width:wp2(5),
    height:wp2(5),
    backgroundColor:'#D9D9D9',
    borderRadius:100,
  },
  button:{
    width:wp2(28),
    height:wp2(10),
    backgroundColor:'black',
    borderRadius:wp2(6),
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop:hp2(6),
    alignSelf:'flex-end',
    marginRight:wp2(6),
  },
});
