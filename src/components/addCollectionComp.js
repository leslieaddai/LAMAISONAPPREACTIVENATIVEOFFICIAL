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

export default function AddCollectionComp(props) {
  const navigation = useNavigation();
  const [selected, setSelected]=useState(false);
  return (
    <TouchableOpacity  onPress={()=> selected?setSelected(false):setSelected(true)} style={styles.imageContainer}>
      <Image
        source={IMAGES.lookbook}
        style={{width: '100%', height: '80%'}}
        resizeMode="cover"
      />
      <Text style={{color:'black',textAlign:'center',fontSize:rfv(11)}}>Represent Owners Club Hoodie{'\n'}£150</Text>
      {selected && (<ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
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
});
