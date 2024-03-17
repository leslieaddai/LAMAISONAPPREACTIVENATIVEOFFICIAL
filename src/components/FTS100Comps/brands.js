import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, wp2, hp2} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import ImageCompWithErrorProfile from './ImageCompWithErrorProfile';

export default function BrandComp(props) {
  const navigation = useNavigation();
console.log(props?.data?.item?.user?.profile_image?.original_url);
  // State to manage the image source URI
  const [imageUri, setImageUri] = useState(
    props?.data?.item?.user?.profile_image?.original_url || IMAGES.profileIcon3,
  );


  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('brandProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.item?.user?.id,
              profile_image: imageUri, // Use state-managed URI
              name: props?.data?.item?.user?.name,
              role: [{id: 3}],
            },
          },
        })
      }
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={[
          styles.button,
          {
            backgroundColor:
              props?.key2 === 0
                ? '#ECC90B'
                : props?.key2 === 1
                ? '#C0C0C0'
                : props?.key2 === 2
                ? '#CD7F32'
                : 'white',
          },
        ]}>
        <Text style={{color: 'black', fontWeight: '700', fontSize: rfv(14)}}>
          {props?.key2 + 1}
        </Text>
        <View style={styles.brandLogo}>
          <ImageCompWithErrorProfile
            uri={{uri: imageUri}}></ImageCompWithErrorProfile>

        </View>
      </View>
      <Text style={{color: 'black', fontSize: rfv(18)}}>
        {props?.data?.item?.user?.name}
      </Text>
    </TouchableOpacity>
  );
}








const styles = StyleSheet.create({
  button: {
    width: wp2(24),
    height: hp2(8),
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: wp2(4),
    marginVertical: hp2(1),
    flexDirection: 'row',

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
    borderRadius: wp2(4),
  },
});
