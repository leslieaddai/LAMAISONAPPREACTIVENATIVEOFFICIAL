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
} from '../theme';
import {useNavigation} from '@react-navigation/native';

import {errorMessage, successMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {
  AddToBasketUrl,
  AddWishListUrl,
  GetProductInfoById,
  ProductLike,
  ProductShare,
  ProductDislike,
  GetAppNotice,
} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function WardrobeComp(props) {
  const navigation = useNavigation();
  //console.log(props);
  const [heart, setHeart] = useState(props?.data?.is_liked);
  const [share, setShare] = useState(props?.data?.is_share);

  const dispatch = useDispatch();
  const user = useSelector(state => state.userData);

  const productLikeDislike = () => {
    props?.state?.setLoadingComp(true);

    let obj = {
      user_id: user?.userData?.id,
      product_id: props?.data?.product_id,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: heart !== false ? ProductDislike : ProductLike,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        heart ? setHeart(false) : setHeart(true);
        props?.state?.setLoadingComp(false);
        successMessage('Success');
      })
      .catch(function (error) {
        console.log(error.response.data);
        props?.state?.setLoadingComp(false);
        //errorMessage('Something went wrong to like product!');
        errorMessage(errorHandler(error))
      });
  };

  const productShare = () => {
    props?.state?.setLoadingComp(true);

    let obj = {
      user_id: user?.userData?.id,
      product_id: props?.data?.product_id,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ProductShare,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        //!share && setShare(true);
        share ? setShare(false) : setShare(true);
        props?.state?.setLoadingComp(false);
        successMessage('Success');
      })
      .catch(function (error) {
        console.log(error.response.data);
        props?.state?.setLoadingComp(false);
        //errorMessage('Something went wrong to share product!');
        errorMessage(errorHandler(error))
      });
  };

  return (
    <TouchableOpacity
      onPress={() => user?.userData?.role?.[0]?.id!==3?
        navigation.navigate('dressingRoomScreen', {
          data: {product: {id: props?.data?.product_id}},
        }):navigation.navigate('imageViewScreen',{item:[{image:[{original_url:props?.data?.product_image}]}]})
      }
      style={styles.imageContainer}>
      <Image
        //source={IMAGES.lookbook}
        source={{uri: props?.data?.product_image}}
        style={{width: '100%', height: '80%'}}
        resizeMode="cover"
      />
      <View style={styles.iconWrap}>
        <TouchableOpacity
          //onPress={()=>{heart?setHeart(false):setHeart(true)}}
          disabled={props?.state?.loadingComp}
          onPress={() => {
            user?.token !== ''
              ? productLikeDislike()
              : errorMessage('You cant like!');
          }}>
          <ICONS.AntDesign
            name="heart"
            size={24}
            color={heart ? '#FC0004' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity
        disabled={props?.state?.loadingComp}
          //onPress={()=>{share?setShare(false):setShare(true)}}
          onPress={() => {
            user?.token !== ''
              ? productShare()
              : errorMessage('You cant share!');
          }}>
          <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={share ? '#13D755' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(45),
    height: hp2(22),
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
  iconWrap: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
