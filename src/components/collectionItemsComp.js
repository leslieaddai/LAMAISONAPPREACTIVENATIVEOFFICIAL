import React, {useState} from 'react';
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
 
  wp2,
  hp2,
  
} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import { useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function CollectionItemsComp(props) {
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
          data: props?.data,
        }):navigation.navigate('imageViewScreen',{item:props?.data?.product?.product_images})
      }
      style={styles.imageContainer}>
      <View style={{height: hp2(18), overflow: 'hidden'}}>
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
          source={props.uri}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <Text style={{color: 'black', textAlign: 'center', fontSize: rfv(11)}}>
        {props?.name}
        {'\n'}
        <Text>{props.price}</Text>
      </Text>
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
  skeletonView:{
    width: wp2(45),
    height:hp2(18)
  }
});
