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
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

export default function Popular(props) {
  console.log(props?.data);
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  return (
    <TouchableOpacity
      onPress={() => user?.userData?.role?.[0]?.id!==3?
        navigation.navigate('dressingRoomScreen', {
          data: {product: {id: props?.data?.product_id}},
        }):navigation.navigate('imageViewScreen')
      }
      // onPress={()=>navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'dressingRoomScreen' }],
      // })}
      // onPress={()=>navigation.navigate('bottomNavigation', {
      //   screen: 'stackNavComp',
      //   params: {
      //     screen: 'dressingRoomScreen',
      //   },
      // })}
      style={styles.container}>
      <Text style={{color: 'black', marginLeft: wp2(3)}}>{props?.no + 1}</Text>
      <View style={styles.productImage}>
        <Image
          //source={IMAGES.randomPic}
          source={{
            uri: props?.data?.product?.product_images?.[0]?.image?.[0]
              ?.original_url,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={{color: 'black'}}>{props?.data?.product?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(100),
    flexDirection: 'row',
    marginVertical: hp2(1),
    alignItems: 'center',
  },
  productImage: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
    borderRadius: wp2(4),
    marginHorizontal: wp2(2),
  },
});
