import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {wp2, hp2, COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function ImgComp(props) {
  const user = useSelector(state => state.userData);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        user?.userData?.role?.[0]?.id !== 3
          ? navigation.navigate('dressingRoomScreen', {
              data: {product: {id: props?.path?.item?.product_id}},
            })
          : navigation.navigate('imageViewScreen', {
              item: props?.path?.item?.product?.product_images,
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
      {props?.path?.item?.product?.product_images?.[0]?.image?.[0]?.url && (
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          progressiveRenderingEnabled={true}
          onLoadStart={() => {
            onloading(true, 'onLoadStart');
          }}
          onLoad={() => onloading(false, 'onLoad')}
          onLoadEnd={() => {
            onloading(false, 'onLoadEnd');
          }}
          source={{
            uri: props?.path?.item?.product?.product_images?.[0]?.image?.[0]
              ?.url,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

export default function NextPickup(props) {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.galaryContainer}>
        {props?.data?.wishlists?.length !== 0 ? (
          props?.data?.wishlists?.reverse().map((item, index) => {
            if (index < 3)
              return (
                <>
                  <ImgComp key={index} path={{item}} />
                </>
              );
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
      {props?.data?.wishlists?.length !== 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('nextPickupScreen', {
              data: props.data.wishlists,
            })
          }
          style={styles.nextpickup}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: rfv(16)}}>
            View All
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  nextpickup: {
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
    borderRadius: 10,
  },
  skeletonView: {
    width: wp2(28),
    height: hp2(12),
  },
});
