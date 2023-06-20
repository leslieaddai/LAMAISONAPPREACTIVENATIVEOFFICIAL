import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
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

export function ImgComp(props) {
  const user = useSelector(state => state.userData);
  const navigation = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => user?.userData?.role?.[0]?.id!==3?
      navigation.navigate('dressingRoomScreen', {
        // userData:props?.userData,
        data: {product: {id: props?.path?.item?.product_id}},
      }):navigation.navigate('imageViewScreen')
    }
     style={styles.imageContainer}>
      <Image
        //source={IMAGES.randomPic}
        source={{
          uri: props?.path?.item?.product?.product_images?.[0]?.image?.[0]?.url,
        }}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

export default function NextPickup(props) {
  const navigation = useNavigation();
  //console.log(props.data.data)
  return (
    <View>
      <View style={styles.galaryContainer}>
        {props?.data?.wishlists?.reverse().map((item, index) => {
          if (index < 6) return <ImgComp key={index} path={{item}} />;
        })}
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('nextPickupScreen', {data: props.data.wishlists})
        }
        style={styles.nextpickup}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          NEXT PICK UP
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nextpickup: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
  galaryContainer: {
    width: wp2(91),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imageContainer: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
