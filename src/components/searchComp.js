import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, wp2, hp2} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SearchComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('brandProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.user?.id,
            },
          },
        })
      }
      style={styles.container}>
      <View style={styles.imageContainer}>
        {loading ? (
          <SkeletonPlaceholder
            borderRadius={4}
            alignItems="center"
            backgroundColor="#dddddd">
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.skeletonView} />
            </View>
          </SkeletonPlaceholder>
        ) : undefined}
        <Image
          progressiveRenderingEnabled={true}
          onLoadStart={() => {
            onloading(true, 'onLoadStart');
          }}
          onLoad={() => onloading(false, 'onLoad')}
          onLoadEnd={() => {
            onloading(false, 'onLoadEnd');
          }}
          source={
            props?.data?.user?.profile_image !== null
              ? {uri: props?.data?.user?.profile_image?.original_url}
              : IMAGES.profileIcon3
          }
          style={{
            width: 110,
            height: 110,
            borderRadius: 10,
          }}
          // resizeMode="contain"
        />
      </View>
      {/* <Text style={styles.text}>{props?.data?.user?.name}</Text> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  imageContainer: {
    // width: wp2(28),
    // height: hp2(18),
    // overflow: 'hidden',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: rfv(11),
    fontWeight: '400',
  },
  skeletonView: {
    width: wp2(18),
    height: hp2(18),
  },
});
