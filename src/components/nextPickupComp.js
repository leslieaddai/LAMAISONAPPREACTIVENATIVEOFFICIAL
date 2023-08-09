import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';



import {

  wp2,
  hp2,

} from '../theme';
import {useNavigation} from '@react-navigation/native';
import { useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';

export default function NextPickupComp(props) {
  const navigation = useNavigation();
  const user = useSelector(state => state.userData);
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity
      onPress={() => user?.userData?.role?.[0]?.id!==3?
        navigation.navigate('dressingRoomScreen', {
          data: {product: {id: props?.item?.item?.product_id}},
        }):navigation.navigate('imageViewScreen',{item:props?.item?.item?.product?.product_images})
      }
      style={styles.imageContainer}>
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
      {props?.item?.item?.product?.product_images?.[0]?.image?.[0]?.url && (
        <Image
          
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          progressiveRenderingEnabled={true}
          onLoadStart={()=>{onloading(true,"onLoadStart")}}
          onLoad={()=>onloading(false,"onLoad")}
          onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={{
            uri: props?.item?.item?.product?.product_images?.[0]?.image?.[0]
              ?.url,
          }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(47),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
