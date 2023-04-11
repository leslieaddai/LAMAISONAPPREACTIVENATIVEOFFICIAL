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
import fonts from '../theme/fonts';
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
} from '../theme';

export default function QuantityComp(props) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.colorBox}></TouchableOpacity>

        <TouchableOpacity style={[styles.inputBox,{alignItems:'center',justifyContent:'center'}]}>
         <Text style={{color:'black',fontWeight:'700',fontSize:rfv(11),textTransform:'uppercase'}}>Sizes Available</Text>
        </TouchableOpacity>

        <View style={styles.inputBox}>
        <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp2(2),
              fontSize: rfv(13),
              fontWeight: '700',
            }}
            placeholderTextColor={'grey'}
            placeholder="QUANTITY"
          />
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        width:wp2(94),
        alignItems:'center',
        justifyContent:'space-around',
        marginVertical:hp2(1),
    },
    colorBox:{
        width: wp2(8),
        height: wp2(8),
        backgroundColor: 'white',
        borderRadius: wp2(2),

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
    },
    inputBox: {
        width: wp2(36),
        height: hp2(5),
        backgroundColor: 'white',
        borderRadius: wp2(4),

        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
});
