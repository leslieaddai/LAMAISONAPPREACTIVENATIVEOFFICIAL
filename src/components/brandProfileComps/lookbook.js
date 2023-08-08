import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../../theme/fonts';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  screenHeight,
  screenWidth,
  wp2,
  hp2,
  getFont,
  FONTS,
} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';

export function ImgComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('imageViewScreen',{item:[{image:[{original_url:props?.path?.item?.media?.[0]?.original_url}]}]})} style={styles.imageContainer}>
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
        {props?.path?.item?.media?.[0]?.original_url&&(
      <Image
     
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
        progressiveRenderingEnabled={true}
        onLoadStart={()=>{onloading(true,"onLoadStart")}}
        onLoad={()=>onloading(false,"onLoad")}
        onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
        source={{uri: props?.path?.item?.media?.[0]?.original_url}}
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
        {props?.data?.galleries?.length!==0? props?.data?.galleries?.reverse().map((item, index) => {
          if (index < 6) return <ImgComp key={index} path={{item}} />;
        }):<View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Gallery Not Available</Text></View>}
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
});
