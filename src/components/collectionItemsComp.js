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

export default function CollectionItemsComp(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity  onPress={() => navigation.navigate('dressingRoomScreen')} style={styles.imageContainer}>
      <View style={{height:hp2(18),overflow:'hidden'}}>
      <Image
        source={IMAGES.lookbook}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
      </View>
      <Text style={{color:'black',textAlign:'center',fontSize:rfv(11)}}>Represent Owners Club Hoodie{'\n'}£150</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(45),
    //height: hp2(22),
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
    margin:wp2(2),
  },
});
