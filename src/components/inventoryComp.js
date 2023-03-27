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
import { useNavigation } from '@react-navigation/native';

export default function InventoryComp(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('reuploadScreen')} style={styles.imageContainer}>
      <Image
        source={IMAGES.lookbook}
        style={{width: '100%', height: '80%'}}
        resizeMode="cover"
      />
      <Text style={{color:'black',textAlign:'center',fontSize:rfv(11)}}>Represent Owners Club Hoodie</Text>
      <Text style={{color:props.value<50?"#EC3030":"black",textAlign:'center',fontSize:rfv(11),fontWeight:'bold'}}>{props.value==0?"Out of Stock!!":props.value+" Remaining"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(47),
    height: hp2(22),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin:wp2(1),
  },
});
