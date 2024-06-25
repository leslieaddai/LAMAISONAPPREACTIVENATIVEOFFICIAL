import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {wp2, hp2} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function InventoryComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('reuploadScreen', {data: props?.data})}
      style={[styles.imageContainer, {backgroundColor: '#F6F6F6'}]}>
      <View style={{padding: 10}}>
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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={{
              uri: props?.data?.product_images[0]?.image[0]?.original_url,
            }}
            style={{width: '100%', height: 158, borderRadius: 10}}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            gap: 10,
            alignItems: 'flex-start',
            paddingTop: 10,
          }}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 16}}>
            {props?.data?.name}
          </Text>
          <Text style={{color: '#A1A1AA', textAlign: 'center', fontSize: 16}}>
            2 colors
          </Text>
          <Text
            style={{
              color:
                props?.data?.quantity_percentage < 20
                  ? '#EC2D30'
                  : props?.data?.product_variations_sum_quantity == 1
                  ? '#FE9B0E'
                  : props?.data?.product_variations_sum_quantity >= 2
                  ? 'black'
                  : 'black',
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {props?.data?.product_variations_sum_quantity < 1
              ? 'Out of Stock'
              : props?.data?.product_variations_sum_quantity + ' remaining'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(47),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    margin: wp2(1),
  },
  skeletonView: {
    width: wp2(47),
    height: hp2(22),
  },
});
