import React, { useEffect, useState } from 'react';
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


import {

  ICONS,
  COLORS,
 
  wp2,
  hp2,

} from '../../theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import { AddWishListUrl,
         ProductDislike, 
         ProductLike, 
         ProductShare, 
         RemoveFromWishlist } from '../../config/Urls';
import { errorMessage } from '../../config/NotificationMessage';
import { errorHandler } from '../../config/helperFunction';

export default function ImageView(props) {
  const user = useSelector(state => state.userData);
  itemdata = props?.route?.params?.item
  itemindex = props?.route?.params?.indexValue
  const navigation = useNavigation();
  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const [hanger, setHanger] = useState(true);
  const [likecount,setlikecount] =useState(itemdata?.product_likes_count)
  const [wishlistcount,setwishlistcount] =useState(itemdata?.product_wishlist_count)
  const [sharecount , setsharecount] = useState(itemdata?.product_shares_count)
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setHeart(itemdata?.is_liked? true : false);
    setHanger(itemdata?.is_wishlisted ? true : false);
    setShare(itemdata?.is_shared  ? true : false);       
    },[])
    
  const AddWishlist = (productId) => {
    console.log("productId",productId)
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
            setLoading(true)
            let obj = {
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
                setHanger(true)
                setwishlistcount(Number(wishlistcount)+1)
                setLoading(false)
              })
              .catch(function (error) {
                console.log(error)
                setLoading(false)
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
            setLoading(true)
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
                setwishlistcount(Number(wishlistcount)-1)
               setHanger(false)
               setLoading(false)
              })
              .catch(function (error) {
                setLoading(false)
                errorMessage(errorHandler(error))
              });
          },
        },
      ],
    );
  };

  const productLikeDislike = (ProductId) => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(function (error) {
        setLoading(false)
        errorMessage(errorHandler(error))
      });
  };

  const productShare = (ProductId) => {
    setLoading(true)
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
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error.response.data)
        setLoading(false)
        errorMessage(errorHandler(error))
      });
  };
  

  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      {loading&&(<View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
            alignSelf:'center'
          }}>
          <SkypeIndicator color={'black'} />
        </View>)}
      <TouchableOpacity onPress={()=>props.navigation.goBack()}
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
        data={itemdata?.product_images?.[0]?.image}
        getItemLayout={(data, index) => (
          {length: wp2(100), offset: wp2(100) * index, index}
        )}
        initialScrollIndex={itemindex}
        renderItem={({item,index})=>{
          return(
            <View key={index} style={{width: wp2(100), height: hp2(100)}}>
            <Image
              source={{uri:item?.original_url}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
            </View>
          )
        }}
        />
      <View
       style={styles.toolBar}>
       <TouchableOpacity 
       disabled={loading?true:false}
       onPress={() => navigation.navigate('commentScreen',{
        product_id:itemdata?.id,
        comments:itemdata?.product_comments})}>
       <ICONS.MaterialIcons name="mode-comment" size={34} color="white" />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{itemdata?.product_comments?.length}</Text>

       <TouchableOpacity 
       disabled={loading?true:false}
       onPress={()=>{
        productLikeDislike(itemdata?.id)
       }}>
       <ICONS.Ionicons name="heart" size={34}  color={heart ? '#FC0004' : 'white'} />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{likecount}</Text>

       <TouchableOpacity
       disabled={loading?true:false}
       onPress={() => {
        user?.userData?.role?.[0]?.id !== 3 && user?.token !== ''
                    ? hanger 
                      ? RemoveWishlist(itemdata?.id)
                      : AddWishlist(itemdata?.id)
                    : errorMessage('You cant add to wishlist!');
              }}>
       <ICONS.MaterialCommunityIcons name="hanger" size={34} color={hanger ? '#162FAC' : 'white'} />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{wishlistcount}</Text>

       <TouchableOpacity 
       disabled={loading?true:false}
       onPress={()=>{
         productShare(itemdata.id)
       }}>
       <ICONS.FontAwesome5 name="retweet" size={34} color={share ? '#13D755' : 'white'} />
       </TouchableOpacity>
       <Text style={styles.toolBarText}>{sharecount}</Text>
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
  toolBar:{
    width: wp2(95),
    height:hp2(7),
    backgroundColor:'grey',
    position: 'absolute',
    bottom: 0,
    alignSelf:'center',
    borderRadius:10,
    zIndex: 999,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  toolBarText:{
    color:'white',
    fontWeight:'bold',
  },
});
