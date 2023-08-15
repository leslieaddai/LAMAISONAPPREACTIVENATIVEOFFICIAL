import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,

} from 'react-native';



import {

  wp2,
  hp2,

} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import { useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';


export default function Popular(props) {
 
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
          data: {product: {id: props?.data?.product_id}},
        }):navigation.navigate('imageViewScreen',{item:props?.data?.product?.product_images})
      }
    
      style={styles.container}>
      <Text style={{color: 'black', marginLeft: wp2(3)}}>{props?.no + 1}</Text>
      <View style={styles.productImage}>
      {loading?
       <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
       <View style={styles.skeletonView} />
       </View>
       </SkeletonPlaceholder>
    :
    undefined
        }
        <Image
        
        progressiveRenderingEnabled={true}
        onLoadStart={()=>{onloading(true,"onLoadStart")}}
        onLoad={()=>onloading(false,"onLoad")}
        onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
          source={{
            uri: props?.data?.product?.product_images?.[0]?.image?.[0]
              ?.original_url,
          }}
        />
      </View>
      <Text style={{color: 'black'}}>{props?.data?.product?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(100),
    flexDirection: 'row',
    marginVertical: hp2(1),
    alignItems: 'center',
  },
  productImage: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
    borderRadius: wp2(4),
    marginHorizontal: wp2(2),
  },
  skeletonView:{
    width: wp2(18),
    height: wp2(18)
  }
});
