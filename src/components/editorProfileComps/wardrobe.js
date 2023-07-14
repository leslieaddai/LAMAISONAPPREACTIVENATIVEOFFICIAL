import React, {useState, useEffect} from 'react';
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

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {GetVirtualWardrobe} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function Wardrobe(props) {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
const [loadingImage, setLoadingImage] = useState(false)
  const onloading = (value,label)=>{
    setLoadingImage(value)
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(GetVirtualWardrobe + `${props?.user?.userData?.id}`)
      .then(async function (res) {
        console.log(res.data, '=======> wardrobe');
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //errorMessage('Something went wrong!');
        setLoading(false);
        errorMessage(errorHandler(error))
      });
  }, []);

  return (
    <View style={{marginVertical: hp2(5)}}>
      <View style={styles.galaryContainer}>
        {data?.length!==0? data?.map((item, index) => {
          if (index < 3)
            return (
              <TouchableOpacity 
              onPress={() => user?.userData?.role?.[0]?.id!==3?
                navigation.navigate('dressingRoomScreen', {
                  data: {product: {id: item?.product_id}},
                }):navigation.navigate('imageViewScreen',{item:[{image:[{original_url:item?.product_image}]}]})
              }
              key={index} style={styles.imageContainer}>
                {loadingImage?
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
                  //source={IMAGES.randomPic}
                  progressiveRenderingEnabled={true}
              onLoadStart={()=>{onloading(true,"onLoadStart")}}
              onLoad={()=>onloading(false,"onLoad")}
              onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
                  source={{uri: item?.product_image}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
        }):!loading?<View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Wardrobe Not Available</Text></View>:null}
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('wardrobeScreen', {user: props?.user})
        }
        style={styles.wardrobe}>
        <Text style={styles.wardrobeTxt}>WARDROBE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wardrobe: {
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
    width: wp2(91),
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
  wardrobeTxt: {color: 'white', fontWeight: '700', fontSize: rfv(24)},
});
