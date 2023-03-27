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

export default function WardrobeComp(props) {
  const navigation = useNavigation();
  //console.log(props);
  const [heart,setHeart]=useState(false);
  const [share,setShare]=useState(false);
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('dressingRoomScreen')} style={styles.imageContainer}>
      <Image
        source={IMAGES.lookbook}
        style={{width: '100%', height: '80%'}}
        resizeMode="cover"
      />
      <View style={styles.iconWrap}>
        <TouchableOpacity onPress={()=>{heart?setHeart(false):setHeart(true)}}>
        <ICONS.AntDesign name="heart" size={24} color={heart?'#FC0004':'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{share?setShare(false):setShare(true)}}>
        <ICONS.FontAwesome name="retweet" size={24} color={share?'#13D755':'black'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(45),
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
    margin:wp2(2),
  },
  iconWrap: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
