import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {wp2, hp2, IMAGES} from '../theme';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function CollectionComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState(props?.uri); // Initialize with props uri
  const user2 = props?.user;

  const onloading = (value, label) => {
    setLoading(value);
  };

  // Define a function to handle image load error
  const handleImageError = () => {
    onloading(false, 'onLoadEnd');
    console.log('ss');
    setImageSource(IMAGES.notFoundImage); // Update the image source to the "not found" image
  };

  return (
    <View>
      <View style={{width: wp2(54), alignItems: 'center'}}></View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('collectionScreen', {
            collection: props?.itemscollection,
            collectionname: props?.name,
            user: user2,
          })
        }
        style={styles.imageContainer}>
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
          onLoadStart={() => onloading(true, 'onLoadStart')}
          onLoad={() => onloading(false, 'onLoad')}
          onLoadEnd={() => onloading(false, 'onLoadEnd')}
          onError={handleImageError} // Handle the error by updating the image source
          source={
            typeof imageSource === 'string' ? {uri: imageSource} : imageSource
          } // Handle both local and remote URIs
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(48),
    height: hp2(30),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: wp2(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: wp2(3),
    marginTop: hp2(1),
  },
  skeletonView: {
    width: wp2(48),
    height: hp2(30),
    borderRadius: wp2(6),
  },
});
