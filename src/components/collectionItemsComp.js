import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {wp2, hp2} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function CollectionItemsComp(props) {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        user?.userData?.role?.[0]?.id !== 3
          ? navigation.navigate('dressingRoomScreen', {
              data: props?.data,
            })
          : navigation.navigate('imageViewScreen', {
              item: props?.data?.product?.product_images,
            })
      }
      style={styles.imageContainer}>
      <View style={{height: hp2(18), overflow: 'hidden'}}>
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
          source={props.uri}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </View>
      <View style={{flexDirection: 'column', gap: 10}}>
        <Text style={{color: 'black', fontSize: 16}}>{props?.name}</Text>
        <Text style={{fontSize: 16, fontWeight: 700}}>£{props.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(45),
    overflow: 'hidden',
    marginHorizontal: 5,
    backgroundColor: '#F6F6F6',
    gap: 10,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  skeletonView: {
    width: wp2(45),
    height: hp2(18),
    borderRadius: 10,
  },
});
