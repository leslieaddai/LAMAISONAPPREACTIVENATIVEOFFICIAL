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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

export default function CollectionItemsComp(props) {
  const navigation = useNavigation();
  console.log(props);
  const user = useSelector(state => state.userData);
  return (
    <TouchableOpacity
      onPress={() => user?.userData?.role?.[0]?.id!==3?
        navigation.navigate('dressingRoomScreen', {
          // userData:props?.userData,
          data: props?.data,
        }):navigation.navigate('imageViewScreen',{item:props?.data?.product?.product_images})
      }
      style={styles.imageContainer}>
      <View style={{height: hp2(18), overflow: 'hidden'}}>
        <Image
          source={props.uri}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <Text style={{color: 'black', textAlign: 'center', fontSize: rfv(11)}}>
        {props?.name}
        {'\n'}
        <Text>{props.price}</Text>
      </Text>
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
    margin: wp2(2),
  },
});
