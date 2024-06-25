import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, wp2, hp2, COLORS} from '../theme';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function AddCollectionComp(props) {
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };
  return (
    <TouchableOpacity
      onPress={() =>
        props?.state?.selectedProducts.some(e => e === props?.data?.item?.id)
          ? props?.state?.setSelectedProducts(
              props?.state?.selectedProducts.filter(
                e => e !== props?.data?.item?.id,
              ),
            )
          : props?.state?.setSelectedProducts([
              ...props?.state?.selectedProducts,
              props?.data?.item?.id,
            ])
      }
      style={
        props?.state?.selectedProducts.some(e => e === props?.data?.item?.id)
          ? {
              width: wp2(45),
              overflow: 'hidden',
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              padding: 10,
              margin: wp2(2),
              borderWidth: 1,
              borderColor: COLORS.main,
            }
          : {
              width: wp2(45),
              overflow: 'hidden',
              backgroundColor: '#F6F6F6',
              borderRadius: 10,
              padding: 10,
              margin: wp2(2),
            }
      }>
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
          source={{
            uri: props?.data?.item?.product_images[0]?.image[0]?.original_url,
          }}
          style={{width: '100%', height: '100%', borderRadius: 10}}
        />
      </View>
      <View style={{flexDirection: 'column', gap: 10, paddingTop: 10}}>
        <Text style={{color: 'black', textAlign: 'left', fontSize: 16}}>
          {props?.data?.item?.name}
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 700,
            textAlign: 'left',
            fontSize: 16,
          }}>
          £{props?.data?.item?.price}
        </Text>
      </View>
      {props?.state?.selectedProducts.some(
        e => e === props?.data?.item?.id,
      ) && (
        <ICONS.AntDesign
          name="checkcircle"
          size={20}
          color="#0F2ABA"
          style={{
            position: 'absolute',
            right: wp2(2),
            top: hp2(0.5),
            zIndex: 999,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(45),
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    margin: wp2(2),
  },
  skeletonView: {
    width: wp2(45),
    height: hp2(18),
  },
});
