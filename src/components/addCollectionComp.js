import React, { useState } from 'react';
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
 
  ICONS,
 
  wp2,
  hp2,

} from '../theme';
import {SkypeIndicator} from 'react-native-indicators';

export default function AddCollectionComp(props) {
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
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
      style={styles.imageContainer}>
      <View style={{height: hp2(18), overflow: 'hidden'}}>
      {loading?
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf:'center'
          }}>
        <SkypeIndicator
        color={'black'}
      /> 
      </View>
      :
      undefined
          }
        <Image
         progressiveRenderingEnabled={true}
         onLoadStart={()=>{onloading(true,"onLoadStart")}}
         onLoad={()=>onloading(false,"onLoad")}
         onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={{
            uri: props?.data?.item?.product_images[0]?.image[0]?.original_url,
          }}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={{color: 'black', textAlign: 'center', fontSize: rfv(11)}}>
        {props?.data?.item?.name}
      </Text>
      <Text style={{color: 'black', textAlign: 'center', fontSize: rfv(11)}}>
        {props?.data?.item?.price}
      </Text>
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
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: wp2(2),
  },
});
