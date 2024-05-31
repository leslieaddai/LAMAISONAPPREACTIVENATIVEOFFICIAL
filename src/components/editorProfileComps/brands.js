import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,

} from 'react-native';



import {
  IMAGES,
 
  wp2,
  hp2,
  
} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function BrandComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('brandProfileScreen',{
        userData: {
          userData: {
            id: props?.data?.id,
          },
        },
      })}
      style={styles.brandImage}>
        {loading?
        <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={6} />
        <SkeletonPlaceholder.Item marginLeft={20}>
        <SkeletonPlaceholder.Item width={120} height={20} />
        <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} />
        </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
    :
    undefined
        }
      <Image
   
        progressiveRenderingEnabled={true}
        onLoadStart={()=>{onloading(true,"onLoadStart")}}
        onLoad={()=>onloading(false,"onLoad")}
        onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
        source={props?.data?.profile_image!==null?{uri:props?.data?.profile_image?.original_url}:IMAGES.profileIcon3}
        style={{width: '100%', height: '100%'}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  brandImage: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 999,
    marginHorizontal: wp2(1),
    marginVertical: hp2(0.5),
    backgroundColor:'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
