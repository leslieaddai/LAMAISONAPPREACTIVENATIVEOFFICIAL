import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {wp2, hp2, IMAGES, COLORS} from '../../theme';
import NothingListedComponnet from '../../screens/profileBrand/nothingListedComponnet';
import fonts from '../../theme/fonts';
import {RFValue as rfv} from 'react-native-responsive-fontsize';

export function ImgComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onLoading = (value, label) => {
    setLoading(value);
  };
  const [imageError, setImageError] = useState(false);

  console.log('Image URL:', props.path.original_url); // Debugging line
  const onImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('imageViewScreen', {
          item: [{image: [{original_url: props.path.original_url}]}],
        })
      }
      style={styles.imageContainer}>
      <Image
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        progressiveRenderingEnabled={true}
        onLoadStart={() => onLoading(true)}
        onLoadEnd={() => onLoading(false)}
        onError={onImageError} // Handle image load error
        source={
          imageError || props.path.original_url == null
            ? IMAGES.notFoundImage
            : {uri: props.path.original_url}
        }
      />
    </TouchableOpacity>
  );
}

export default function Lookbook(props) {
  const navigation = useNavigation();
  return (
    <>
      <Text style={styles.titleTxt}>Lookbook</Text>
      <View style={styles.galaryContainer}>
        {props?.data?.length !== 0 ? (
          props?.data?.reverse().map((item, index) => {
            if (index < 6) return;

            <ImgComp key={index} path={item.items} />;
          })
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              width: '100%',
              height: 113,
              backgroundColor: COLORS.gray100,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: rfv(15),
                color: COLORS.gray400,
              }}>
              Nothing Here Yet
            </Text>
          </View>
        )}
      </View>
      {props?.data?.length !== 0 && (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('lookbookScreen', {
              userData: props?.route?.params?.userData,
            })
          }
          style={styles.viewAll}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: rfv(16)}}>
            View Lookbook
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleTxt: {
    fontWeight: '400',
    fontSize: rfv(20),
    color: 'black',
    marginTop: 25,
    marginBottom: 16,
  },
  lookbook: {
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
    width: wp2(90),
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
  skeletonView: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
  },
  viewAll: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    marginTop: 16,
  },
});
