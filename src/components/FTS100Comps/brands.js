import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, wp2, hp2} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import ImageCompWithErrorProfile from './ImageCompWithErrorProfile';

export default function BrandComp(props) {
  const navigation = useNavigation();
  console.log(props?.data?.item?.user?.profile_image?.original_url);
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
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRightWidth: 10,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor:
          props?.key2 === 0
            ? '#fff'
            : props?.key2 === 1
            ? '#fff'
            : props?.key2 === 2
            ? '#fff'
            : '#F6F6F6',
        borderColor:
          props?.key2 === 0
            ? '#ECC90B'
            : props?.key2 === 1
            ? '#C0C0C0'
            : props?.key2 === 2
            ? '#CD7F32'
            : '#F6F6F6',
      }}>
      <View style={styles.button}>
        <Text
          style={{
            color: 'black',
            fontWeight: '400',
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          }}>
          {props?.key2 + 1}.
        </Text>
        <View style={styles.brandLogo}>
          <ImageCompWithErrorProfile uri={imageUri} />
        </View>
      </View>
      <Text style={{color: 'black', fontSize: 16}}>
        {props?.data?.item?.user?.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: wp2(10),
    gap: 10,
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
    width: 62,
    height: 60,
  },
});
