import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../theme/fonts';
import {
  wp2,
  hp2
} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';

export default function InventoryComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('reuploadScreen', {data: props?.data})}
      style={styles.imageContainer}>
      <View style={{height: hp2(22), overflow: 'hidden'}}>
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
          //source={IMAGES.lookbook}
          progressiveRenderingEnabled={true}
          onLoadStart={()=>{onloading(true,"onLoadStart")}}
          onLoad={()=>onloading(false,"onLoad")}
          onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
          source={{uri: props?.data?.product_images[0]?.image[0]?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>

      <Text style={{color: 'black', textAlign: 'center', fontSize: rfv(9)}}>
        {props?.data?.name}
      </Text>
      <Text
        style={{
          color:
            props?.data?.product_variations_sum_quantity < 5
              ? '#EC3030'
              : 'black',
          textAlign: 'center',
          fontSize: rfv(9),
          fontWeight: 'bold',
        }}>
        {props?.data?.product_variations_sum_quantity < 1
          ? 'Out of Stock!!'
          : props?.data?.product_variations_sum_quantity + ' Remaining'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(47),
    //height: hp2(22),
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
    margin: wp2(1),
  },
});
