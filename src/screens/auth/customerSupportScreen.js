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

export default function CustomerSupportScreen(props) {
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center',paddingBottom:hp(12),}}>
      <Text style={styles.customerText}>Customer Advice</Text>
      <View style={styles.textBox}>
        <TextInput
          placeholder={
            'Description of Issue' +
            '\n' +
            '(Please can you keep short and to the point)'
          }
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
      <View style={{width:wp(88)}}>
      <Text style={{color:'black',fontWeight:'700',marginBottom:hp(2)}}>How do you feel?</Text>
      </View>
      {options('ANGRY')}
      {options('WORRIED')}
      {options('UPSET')}
      {options('EXCITED')}
      {options('CONFUSED')}
      {options('PANICKED')}
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'white'}}>SEND</Text>
      </TouchableOpacity>
      </ScrollView>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    //justifyContent:'center',
  },
  customerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
    marginTop: hp(5),
  },
  textBox: {
    width: wp(88),
    height: hp(30),
    backgroundColor: 'white',
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp(4),
    marginBottom:hp(2),
    paddingHorizontal: wp('2%'),
    paddingVertical: wp('2%'),
  },
  optionWrap:{
    width:wp(90),
    height:hp(4),
    //backgroundColor:'red',
    borderBottomWidth:1,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:wp(1),
    marginTop:hp(2),
  },
  circle:{
    width:wp(5),
    height:wp(5),
    backgroundColor:'#D9D9D9',
    borderRadius:100,
  },
  button:{
    width:wp(32),
    height:wp(8),
    backgroundColor:'black',
    borderRadius:wp(4),
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
    marginTop:hp(6),
  },
});
