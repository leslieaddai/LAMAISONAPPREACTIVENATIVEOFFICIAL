import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';

import {ICONS, COLORS, wp2, hp2} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import axios from 'react-native-axios';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import {
  AddWishListUrl,
  ProductDislike,
  ProductLike,
  ProductShare,
  RemoveFromWishlist,
  getproductdetail,
} from '../../config/Urls';
import {errorMessage} from '../../config/NotificationMessage';
import {errorHandler} from '../../config/helperFunction';
import Like from '../../assets/icons/like.svg';
import Hanger from '../../assets/icons/hanger.svg';
import Share from '../../assets/icons/share.svg';

export default function ImageView(props) {
  const user = useSelector(state => state.userData);
  itemdata = props?.route?.params?.item;
  const navigation = useNavigation();
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const [hanger, setHanger] = useState(false);
  const [likecount, setlikecount] = useState(0);
  const [wishlistcount, setwishlistcount] = useState(0);
  const [sharecount, setsharecount] = useState(0);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const getdetail = page_no => {
    setLoading(true);

    axios
      .get(getproductdetail + itemdata, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setData(res?.data?.data);
        setHeart(res.data.data?.is_liked ? true : false);
        setHanger(res.data.data?.is_wishlisted ? true : false);
        setShare(res.data.data?.is_shared ? true : false);
        setlikecount(res?.data?.data?.product_likes_count);
        setwishlistcount(res?.data?.data?.product_wishlist_count);
        setsharecount(res?.data?.data?.product_shares_count);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };
  useEffect(() => {
    getdetail();
  }, []);

  const AddWishlist = productId => {
    console.log('productId', productId);
    Alert.alert(
      'Confirmation',
      'Do you want to add this product into your wishlist?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
            let obj = {
              user_id: user?.userData?.id,
              product_id: productId,
            };
            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: AddWishListUrl,
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: 'application/json',
              },
              data: obj,
            };
            axios
              .request(config)
              .then(async function (res) {
                setHanger(true);
                setwishlistcount(Number(wishlistcount) + 1);
                setLoading(false);
              })
              .catch(function (error) {
                console.log(error);
                setLoading(false);
                errorMessage(errorHandler(error));
              });
          },
        },
      ],
    );
  };

  const RemoveWishlist = productId => {
    Alert.alert(
      'Confirmation',
      'Do you want to remove this product from your wishlist?',
      [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
            let config = {
              method: 'delete',
              maxBodyLength: Infinity,
              url: RemoveFromWishlist + productId,
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: 'application/json',
              },
            };

            axios
              .request(config)
              .then(async function (res) {
                setwishlistcount(Number(wishlistcount) - 1);
                setHanger(false);
                setLoading(false);
              })
              .catch(function (error) {
                setLoading(false);
                errorMessage(errorHandler(error));
              });
          },
        },
      ],
    );
  };

  const productLikeDislike = ProductId => {
    setLoading(true);
    let obj = {
      user_id: user?.userData?.id,
      product_id: ProductId,
    };
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: heart ? ProductDislike : ProductLike,
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
        heart
          ? setlikecount(Number(likecount) - 1)
          : setlikecount(Number(likecount) + 1);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        errorMessage(errorHandler(error));
      });
  };

  const productShare = ProductId => {
    setLoading(true);
    let obj = {
      user_id: user?.userData?.id,
      product_id: ProductId,
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
        // sharecount+1
        share
          ? setsharecount(Number(sharecount) - 1)
          : setsharecount(Number(sharecount) + 1);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        errorMessage(errorHandler(error));
      });
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.white}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <View style={styles.container}>
          {loading && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
                alignSelf: 'center',
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          )}
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{
              marginLeft: wp2(3),
              marginTop: hp2(4),
              position: 'absolute',
              zIndex: 999,
            }}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={data?.product_images?.[0]?.image}
            getItemLayout={(data, index) => ({
              length: wp2(100),
              offset: wp2(100) * index,
              index,
            })}
            renderItem={({item, index}) => {
              return (
                <View key={index} style={{width: wp2(100), height: hp2(100)}}>
                  <Image
                    source={{uri: item?.original_url}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
              );
            }}
          />
          <View style={styles.toolBar}>
            {/* <TouchableOpacity
              disabled={loading ? true : false}
              onPress={() =>
                navigation.navigate('commentScreen', {
                  product_id: data?.id,
                  comments: data?.product_comments,
                })
              }>
              <ICONS.MaterialIcons
                name="mode-comment"
                size={34}
                color="white"
              />
            </TouchableOpacity>
            <Text style={styles.toolBarText}>
              {data?.product_comments?.length}
            </Text> */}
            <View style={styles.toolWraper}>
              <TouchableOpacity
                disabled={loading ? true : false}
                onPress={() => {
                  productLikeDislike(data?.id);
                }}>
                {/* <ICONS.Ionicons
                name="heart"
                size={34}
                color={heart ? '#FC0004' : 'white'}
              /> */}
                <Like width={30} height={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.toolBarText}>{likecount}</Text>
            </View>
            <View style={styles.toolWraper}>
              <TouchableOpacity
                disabled={loading ? true : false}
                onPress={() => {
                  user?.userData?.role?.[0]?.id !== 3 && user?.token !== ''
                    ? hanger
                      ? RemoveWishlist(data?.id)
                      : AddWishlist(data?.id)
                    : errorMessage('You cant add to wishlist!');
                }}>
                {/* <ICONS.MaterialCommunityIcons
                name="hanger"
                size={34}
                color={hanger ? '#162FAC' : 'white'}
              /> */}
                <Hanger width={30} height={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.toolBarText}>{wishlistcount}</Text>
            </View>
            <View style={styles.toolWraper}>
              <TouchableOpacity
                disabled={loading ? true : false}
                onPress={() => {
                  productShare(data.id);
                }}>
                {/* <ICONS.FontAwesome5
                name="retweet"
                size={34}
                color={share ? '#13D755' : 'white'}
              /> */}
                <Share width={30} height={30} color="white" />
              </TouchableOpacity>
              <Text style={styles.toolBarText}>{sharecount}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolBar: {
    width: '100%',
    height: hp2(7),
    backgroundColor: 'grey',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.5,
    justifyContent: 'center',
    gap: 20,
  },
  toolBarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  toolWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  }
});
