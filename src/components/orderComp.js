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


import {useDispatch, useSelector} from 'react-redux';

import moment from 'moment';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function OrderComp(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const DateFormater = (date) =>{
    
    const dateTime = String(date);
    
    const formattedDateTime = moment(dateTime).format('MMM/DD/YYYY');


    return formattedDateTime 
      }
      const onloading = (value,label)=>{
        setLoading(value)
      }

  return (
    <TouchableOpacity 
    onPress={props.onpress}
    style={styles.container}>
      <View style={styles.imgWrap}>
      {loading?
           <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
           <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <View style={styles.skeletonView} />
           </View>
           </SkeletonPlaceholder>
      :
      undefined
          }
          {props?.data?.order_details?.[0]?.product?.product_images[0]?.image?.[0]?.original_url=== undefined?
          <Image
          progressiveRenderingEnabled={true}
          onLoadStart={()=>{onloading(true,"onLoadStart")}}
          onLoad={()=>onloading(false,"onLoad")}
          onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
           source={require('../assets/placeholder.jpg')}
           style={{width: '100%', height: '90%',marginTop:hp2(0.5)}}
           resizeMode="cover"
         />
          :
          <Image
         progressiveRenderingEnabled={true}
         onLoadStart={()=>{onloading(true,"onLoadStart")}}
         onLoad={()=>onloading(false,"onLoad")}
         onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={{uri:props?.data?.order_details?.[0]?.product?.product_images[0]?.image?.[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />}
        <Image
         progressiveRenderingEnabled={true}
         onLoadStart={()=>{onloading(true,"onLoadStart")}}
         onLoad={()=>onloading(false,"onLoad")}
         onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={props?.data?.order_details?.[0]?.product?.product_images[0]?.image?.[0]?.original_url=== undefined?
          require('../assets/placeholder.jpg')
          :{uri:props?.data?.order_details?.[0]?.product?.product_images[0]?.image?.[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={{marginLeft: wp2(3)}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',width:wp2(70)}}>
        <Text>{props?.data?.order_number}</Text>
        <TouchableOpacity onPress={props.onpress}>
        <Text style={{color: '#065521', fontWeight: '600', fontSize: rfv(14)}}>
          {`Details->`}
        </Text>
        </TouchableOpacity>
        </View>
        <Text>{DateFormater(props?.data?.created_at)}</Text>

        <Text style={{color: 'black'}}>{`Total: ${props.data.order_amount}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(92),
    height: hp2(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp2(0.5),
  },
  imgWrap: {
    width: wp2(16),
    height: wp2(18),
    overflow: 'hidden',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skeletonView:{
    width: wp2(16),
    height: wp2(18),
    borderRadius: wp2(4),
  }
});
