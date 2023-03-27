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
import { useNavigation } from '@react-navigation/native';

export default function BrandComp(props) {
  const navigation = useNavigation();
  return (
    <View style={{flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('brandProfileScreen')} style={[styles.button, {backgroundColor: props.rank===1 ? '#ECC90B' : props.rank===2 ? '#C0C0C0' : props.rank===3 ? '#CD7F32' : 'white'}]}>
        <Text style={{color:'black',fontWeight:'700',fontSize:rfv(22)}}>{props.rank}</Text>
        <View style={styles.brandLogo}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
    </TouchableOpacity>
    <Text style={{color:'black',fontSize:rfv(18)}}>Cole Buxton</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  button: {
    width: wp2(24),
    height: hp2(8),
    borderRadius: wp2(8),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal:wp2(4),
    marginVertical:hp2(1),
    flexDirection:'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  brandLogo: {
    width: wp2(12),
    height: wp2(12),
    overflow: 'hidden',
    borderRadius:wp2(4),
  },
});
