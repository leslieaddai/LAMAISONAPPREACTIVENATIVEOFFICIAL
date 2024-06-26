import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,

} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,
  
  wp2,
  hp2,

} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SearchComp2(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false); // State to track image loading error

  const onImageLoadStart = () => setLoading(true);
  const onImageLoad = () => setLoading(false);
  const onImageLoadError = () => {
    setLoading(false);
    setImageError(true); // Set the error state to true
  };
        console.log(props?.data?.profile_image?.original_url);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('editorProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.id,
            },
          },
        })
      }
      style={styles.container}>
      <View style={styles.imageContainer}>
        {loading && !imageError && (
          <SkeletonPlaceholder
            borderRadius={4}
            alignItems="center"
            backgroundColor="#dddddd">
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.skeletonView} />
            </View>
          </SkeletonPlaceholder>
        )}
        <Image
          onLoadStart={onImageLoadStart}
          onLoad={onImageLoad}
          onLoadEnd={onImageLoad}
          onError={onImageLoadError} // Handle image load error
          source={
            imageError ||
            !props?.data?.profile_image ||
            props?.data?.profile_image?.original_url==undefined
              ? IMAGES.profileIcon3
              : {uri: props?.data?.profile_image?.original_url}
          }
          style={{
            width: 110,
            height: 110,
            borderRadius: 10,
          }}
          // resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>{props?.data?.username}</Text>
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
    maxWidth: 100,
    fontWeight: '400',
  },
  skeletonView:{
    width: wp2(18),
    height: hp2(18),
  }
});
