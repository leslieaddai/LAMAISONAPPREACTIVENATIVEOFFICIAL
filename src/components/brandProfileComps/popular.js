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

export default function Popular(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('dressingRoomScreen')} style={styles.container}>
        <Text style={{color:'black',marginLeft:wp2(3)}}>{props.no}</Text>
        <View style={styles.productImage}>
      <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
      </View>
      <Text style={{color:'black'}}>Souvenir Shorts - Black/Concrete</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        width:wp2(100),
        flexDirection:'row',
        marginVertical:hp2(1),
        alignItems:'center',
    },
    productImage:{
        width:wp2(18),
        height:wp2(18),
        overflow:'hidden',
        borderRadius:wp2(4),
        marginHorizontal:wp2(2),
      },

});
