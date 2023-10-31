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
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export function ImgComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('imageViewScreen',{item:[{image:[{original_url:props?.path?.item?.items?.original_url}]}]})} style={styles.imageContainer}>
      {loading?
        <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={styles.skeletonView} />
        </View>
        </SkeletonPlaceholder>
    :
    undefined
        }
        {props?.path?.item?.items?.original_url&&(
      <Image
     
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        progressiveRenderingEnabled={true}
        onLoadStart={()=>{onloading(true,"onLoadStart")}}
        onLoad={()=>onloading(false,"onLoad")}
        onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
        source={{uri: props?.path?.item?.items?.original_url}}
      />
        )}
    </TouchableOpacity>
  );
}

export default function Lookbook(props) {
  
  const navigation = useNavigation();
  return (
    <>
      
      <View style={styles.galaryContainer}>
        {props?.data?.length!==0? props?.data?.reverse().map((item, index) => {
          if (index < 6) return <ImgComp key={index} path={{item}} />;
        }):<View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>No images added yet</Text></View>}
      </View>

     
    </>
  );
}

const styles = StyleSheet.create({
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
  skeletonView:{
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
  }
});
