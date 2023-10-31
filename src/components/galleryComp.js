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
import { useNavigation } from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function GalleryComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity onPress={() =>
      navigation.navigate('imageViewScreen',{item:[{image:[{original_url:props?.item?.item?.items?.original_url}]}]})
    } style={styles.imageContainer}>
       {loading?
        <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.skeletonView} />
        </View>
        </SkeletonPlaceholder>
    :
    undefined
        }
        {props?.item?.item?.items?.original_url&&(
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
          progressiveRenderingEnabled={true}
          onLoadStart={()=>{onloading(true,"onLoadStart")}}
          onLoad={()=>onloading(false,"onLoad")}
          onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={{uri: props?.item?.item?.items?.original_url}}
        />
        )}
     
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(30),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
  skeletonView:{
    width: wp2(30),
    height: hp2(18),
    overflow: 'hidden',
  }
});
