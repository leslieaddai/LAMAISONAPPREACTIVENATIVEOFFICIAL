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

export default function ConfirmationScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <View style={styles.circle}>
            <ICONS.FontAwesome name="check" size={wp(18)} color="white" />
        </View>
      <Text style={styles.text}>Congratulations!</Text>
      <Text style={{color:'black',textTransform:'uppercase'}}>Your order is on it’s way</Text>
      <View style={styles.iconWrap}>
        <Image
            source={IMAGES.rightArrow}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      <Text style={{color:'black',textTransform:'uppercase',textAlign:'center'}}>Tell your friends about{'\n'}your great choice</Text>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity>
        <ICONS.AntDesign name="twitter" size={wp(12)} color="black" style={{marginHorizontal:wp(1)}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <ICONS.AntDesign name="facebook-square" size={wp(12)} color="black" style={{marginHorizontal:wp(1)}} />
        </TouchableOpacity>
        <TouchableOpacity>
        <ICONS.AntDesign name="linkedin-square" size={wp(12)} color="black" style={{marginHorizontal:wp(1)}}  />
        </TouchableOpacity>
        
      </View>
      </View>
      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    justifyContent:'center',
  },
  wrap:{
    width:wp(80),
    height:hp(60),
    //backgroundColor:'red',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  circle:{
    width:wp(36),
    height:wp(36),
    backgroundColor:'#13D755',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
  },
  text: {
    color: 'black',
    fontSize: rfv(17),
    fontWeight: '700',
    textTransform:'uppercase',
  },
  iconWrap:{
    width: wp(36),
    height: wp(10),
    overflow: 'hidden',
  },
});
