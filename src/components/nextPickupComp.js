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

export default function NextPickupComp(props) {
  //console.log(props);
  //console.log(props.item.item.product.product_images[0].image[0].url,'=======>');
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  return (
    <TouchableOpacity
      onPress={() => user?.userData?.role?.[0]?.id!==3?
        navigation.navigate('dressingRoomScreen', {
          data: {product: {id: props?.item?.item?.product_id}},
        }):navigation.navigate('imageViewScreen')
      }
      style={styles.imageContainer}>
      {props?.item?.item?.product?.product_images?.[0]?.image?.[0]?.url && (
        <Image
          //source={IMAGES.randomPic}
          source={{
            uri: props?.item?.item?.product?.product_images?.[0]?.image?.[0]
              ?.url,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(47),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
