import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';

import {ICONS, wp2, hp2, COLORS} from '../theme';
import {useNavigation} from '@react-navigation/native';

import {errorMessage, successMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {ProductLike, ProductShare, ProductDislike} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Like from '../assets/icons/like.svg';
import Share from '../assets/icons/share.svg';

export default function WardrobeComp(props) {
  const navigation = useNavigation();
  const [heart, setHeart] = useState(props?.data?.is_liked);
  const [share, setShare] = useState(props?.data?.is_share);
  const [loadingImage, setLoadingImage] = useState(false);
  const onloading = (value, label) => {
    setLoadingImage(value);
  };

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
        heart ? setHeart(false) : setHeart(true);
        props?.state?.setLoadingComp(false);
        successMessage('Success');
      })
      .catch(function (error) {
        props?.state?.setLoadingComp(false);
        errorMessage(errorHandler(error));
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
        share ? setShare(false) : setShare(true);
        props?.state?.setLoadingComp(false);
        successMessage('Success');
      })
      .catch(function (error) {
        props?.state?.setLoadingComp(false);
        errorMessage(errorHandler(error));
      });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        user?.userData?.role?.[0]?.id !== 3
          ? navigation.navigate('dressingRoomScreen', {
              data: {product: {id: props?.data?.product_id}},
            })
          : navigation.navigate('imageViewScreen', {
              item: [{image: [{original_url: props?.data?.product_image}]}],
            })
      }
      style={styles.imageContainer}>
      {loadingImage ? (
        <SkeletonPlaceholder
          borderRadius={4}
          alignItems="center"
          backgroundColor="#dddddd">
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.skeletonView} />
          </View>
        </SkeletonPlaceholder>
      ) : undefined}
      <Image
        progressiveRenderingEnabled={true}
        onLoadStart={() => {
          onloading(true, 'onLoadStart');
        }}
        onLoad={() => onloading(false, 'onLoad')}
        onLoadEnd={() => {
          onloading(false, 'onLoadEnd');
        }}
        source={{uri: props?.data?.product_image}}
        style={{width: '100%', height: '80%'}}
        resizeMode="cover"
      />
      <View style={styles.iconWrap}>
        <TouchableOpacity
          disabled={props?.state?.loadingComp}
          onPress={() => {
            user?.token !== ''
              ? productLikeDislike()
              : errorMessage('You cant like!');
          }}>
          <Like width={24} height={24} color={heart ? COLORS.main : 'black'} />
        </TouchableOpacity>
        <View style={{borderWidth: 1, height: 40, borderColor: '#E2E2E2'}} />
        <TouchableOpacity
          disabled={props?.state?.loadingComp}
          onPress={() => {
            user?.token !== ''
              ? productShare()
              : errorMessage('You cant share!');
          }}>
          <Share width={24} height={24} color={share ? COLORS.main : 'black'} />
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
    backgroundColor: '#F6F6F6',
    borderRadius: wp2(4),
    margin: wp2(2),
  },
  iconWrap: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  skeletonView: {
    width: wp2(45),
    height: hp2(22),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: wp2(4),
  },
});
