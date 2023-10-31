import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  
  FlatList,
  Alert,
  Platform,
} from 'react-native';


import {
  IMAGES,
  ICONS,
  
  wp2,
  hp2,

} from '../../theme';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'react-native-axios';
import {useDispatch, useSelector} from 'react-redux';
import { AddWishListUrl, ProductDislike, ProductLike, ProductShare, RemoveFromWishlist } from '../../config/Urls';
import { errorMessage } from '../../config/NotificationMessage';
import { errorHandler } from '../../config/helperFunction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function PostCompListView(props) {
  const dispatch = useDispatch();
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);
  const [profileloading,setprofileloading] = useState(false)
  const [loading, setLoading] = useState(false)
  const onloading = (value,label)=>{
    setLoading(value)
  }
  const onprofileloading = (value,label)=>{
    setprofileloading(value)
  }

  const [showDelete, setShowDelete] = useState(false);

  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const [hanger, setHanger] = useState(true);

  const navigation = useNavigation();
  const [likecount,setlikecount] =useState(props?.data?.product_likes_count)
  const [wishlistcount,setwishlistcount] =useState(props?.data?.product_wishlist_count)
  const [sharecount , setsharecount] = useState(props?.data?.product_shares_count)
  useEffect(()=>{
  setHeart(props?.data?.is_liked? true : false);
  setHanger(props?.data?.is_wishlisted ? true : false);
  setShare(props?.data?.is_shared ? props?.data?.user?.id=== user.userData?.id && true : false);  
  },[])

  const AddWishlist = (productId) => {
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
            let obj ={
              user_id:user?.userData?.id,
              product_id:productId
            }

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
                console.log(res)
                setHanger(true)
                setwishlistcount(Number(wishlistcount)+1)
              })
              .catch(function (error) {
                console.log(error)
               
                errorMessage(errorHandler(error))
              });
          },
        },
      ],
    );
  };

  const RemoveWishlist = (productId) => {  
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
                console.log(res)
                setwishlistcount(Number(wishlistcount)-1)
               setHanger(false)
              })
              .catch(function (error) {
                errorMessage(errorHandler(error))
              });
          },
        },
      ],
    );
  };

  const productLikeDislike = (ProductId) => {
    let obj ={
      user_id:user?.userData?.id,
      product_id:ProductId
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: heart? ProductDislike : ProductLike,
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
        heart? setlikecount(Number(likecount)-1) :setlikecount(Number(likecount)+1)
      })
      .catch(function (error) {
      
        errorMessage(errorHandler(error))
      });
  };

  const productShare = (ProductId) => {
    let obj ={
      user_id:user?.userData?.id,
      product_id:ProductId
    }

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
        share?setsharecount(Number(sharecount)-1):setsharecount(Number(sharecount)+1)
      })
      .catch(function (error) {
        console.log(error.response.data)
       
        errorMessage(errorHandler(error))
      });
  };
  return (
    <View style={{marginVertical: hp2(1)}}>
    <View style={styles.postWrap}>
      <TouchableOpacity
        onPress={() => 
          {props.data.user.roles[0].id == 3?
          navigation.navigate('brandProfileScreen',{
            userData: {
              userData: {
                id: props?.data.user.id,
                profile_image:
                props?.data?.user?.profile_image?.original_url,
                name: props?.data?.user?.name,
                role: [{id: 3}],
              },
            },
          })
          :
        navigation.navigate('editorProfileScreen',{
            userData: {
              userData: {
                id: props?.data.user.id,
                profile_image:
                props?.data?.user?.profile_image?.original_url,
                name: props?.data?.user?.name,
                role: [{id: 2}],
              },
            },
          })
        }
      }
        style={styles.imageWrap}>
           {profileloading?
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
           onLoadStart={()=>{onprofileloading(true,"onLoadStart")}}
           onLoad={()=>onprofileloading(false,"onLoad")}
           onLoadEnd={()=>{onprofileloading(false,"onLoadEnd")}}
          source={props?.data?.user?.profile_image==null?IMAGES.profileIcon3:{uri:props?.data?.user?.profile_image?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => {
          showDelete ? setShowDelete(false) : setShowDelete(true);
        }}>
        {showDelete ? (
          <View style={styles.deleteButton}>
            <Text style={{color: 'black'}}>Delete Post</Text>
            <ICONS.Ionicons name="ios-trash-bin" size={24} color="red" />
          </View>
        ) : (
          <ICONS.Ionicons
            name="menu-outline"
            size={44}
            color="black"
            style={{marginLeft: wp2(68)}}
          />
        )}
      </TouchableOpacity> */}
    </View>

    <FlatList data={props?.data?.product_images?.[0]?.image} horizontal pagingEnabled showsHorizontalScrollIndicator={false}
    renderItem={({item,index}) => {
      return (
        <TouchableOpacity key={index}
        
        onPress={() => navigation.navigate('imageView',{item:props?.data?.id})}
        style={styles.imageContainer}>
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
          source={{uri:item?.original_url}}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      );
    }}
    />

    <View style={styles.iconWrap}>
      <TouchableOpacity
        onPress={() => {
          // 
          productLikeDislike(props?.data?.id)
        }}>
        <ICONS.AntDesign
          name="heart"
          size={34}
          color={heart ? '#FC0004' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>{likecount}</Text>

      <TouchableOpacity
        onPress={() => {
          user?.userData?.role?.[0]?.id !== 3 && user?.token !== ''
                      ? hanger 
                        ? RemoveWishlist(props?.data?.id)
                        : AddWishlist(props?.data?.id)
                      : errorMessage('You cant add to wishlist!');
         
        }}>
        <ICONS.MaterialCommunityIcons
          name="hanger"
          size={34}
          color={hanger ? '#162FAC' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>{wishlistcount}</Text>

      <TouchableOpacity
        onPress={() => {
          productShare(props?.data?.id)
        }}>
        <ICONS.FontAwesome
          name="retweet"
          size={34}
          color={share ? '#13D755' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>{sharecount}</Text>
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate('commentScreen',{product_id:props?.data?.id,comments:props?.data?.product_comments})}>
      <View style={{flexDirection: 'row', marginLeft: wp2(2)}}>
        <Text
          style={{color: 'black', fontWeight: '700', marginRight: wp2(2)}}>
          {props?.data?.user?.name}
        </Text>
        <Text style={{color: 'black'}}>{props?.data?.name}</Text>
      </View>

      <Text style={{color: 'black', marginLeft: wp2(2)}}>{moment(props?.data?.created_at).fromNow()}</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  postWrap: {
    width: wp2(94),
    height: hp2(7),
   
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    backgroundColor:Platform.OS == 'android'&&'white',
    overflow: 'hidden',
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
    width: wp2(100),
    height: hp2(36),
  },
  imageContainer: {
    width: wp2(100),
    height: hp2(36),
    overflow: 'hidden',

  },
  iconWrap: {
    width: wp2(80),
    height: hp2(6),

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  deleteButton: {
    width: wp2(38),
    height: hp2(6),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: wp2(44),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
