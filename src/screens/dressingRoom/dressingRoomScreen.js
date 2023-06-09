import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  SafeAreaView,
  Alert,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import BottomComp from '../../components/bottomComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { RemoveFromWishlist,AddToBasketUrl,AddWishListUrl,GetProductInfoById,ProductLike,ProductShare,ProductDislike,GetAppNotice } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

import RenderHtml from 'react-native-render-html';

export default function DressingRoomScreen(props) {
  const [heart, setHeart] = useState(null);
  const [share, setShare] = useState(null);
  const [hanger, setHanger] = useState(null);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)

  const [colorId, setColorId]=useState();
  const [sizeId, setSizeId]=useState(null);

  const [appNotice, setAppNotice]=useState(null);

  //console.log(props?.route?.params)

  useEffect(()=>{
    axios
    .get(GetAppNotice)
    .then(async function (res) {
       //console.log(res.data);
       setAppNotice({
        html:`${res?.data?.data?.description}`
       });
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      errorMessage('Something went wrong!')
    });
  },[])

  useEffect(()=>{
    setLoading2(true);

    axios
    .get(GetProductInfoById+`${props?.route?.params?.data?.product?.id}`)
    .then(async function (res) {
       console.log("dressing room",res.data);
       setData(res.data.data);
       setColorId(res.data.data.product_variations[0].color)

       if(user?.token !== ''){

        axios
        .get(`https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.product?.id}/${user?.userData?.id}`)
        .then(async function (res){
          console.log(res.data.data)
          setHeart(res?.data?.data?.is_liked > 0 ? true : null)
          setHanger(res?.data?.data?.is_wishlist > 0 ? true : null)
          setShare(res?.data?.data?.is_shared > 0 ? true : null)
          setLoading2(false);
        })
        .catch(function (e){
          console.log(e.response.data)
          setLoading2(false);
          errorMessage('Something went wrong!')
        });

       }else{
         setLoading2(false);
       }

    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading2(false);
      errorMessage('Something went wrong!')
    });

  },[])

  const AddBasket = () => {
    if(sizeId!==null){
      Alert.alert('Confirmation', 'Do you want to add this product into your basket?', [
        {
          text: 'No',
          onPress: () => console.log('No Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => {
  
          setLoading(true);
  
          let obj = {
            user_id: user?.userData?.id,
            product_id:1,
            qty:1,
            size_id:1,
            color_id:1,
            style_id:1,
            category_id: 1,
            piece_id:1
        };
  
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: AddToBasketUrl,
            headers: { 
              'Authorization': `Bearer ${user.token}`, 
              'Accept': 'application/json'
            },
            data : obj
          };
  
          axios.request(config)
          .then(async function (res) {
             console.log(res.data);
  
             dispatch({
              type: types.AddToBasket
            });
            
             setLoading(false);
             successMessage('Success')
          }) 
          .catch(function (error) {
            console.log(error.response.data)
            setLoading(false);
            errorMessage('Failed')
          });
  
        }
        },
      ]);
    }else{
      errorMessage('Please select size before adding to basket')
    }
  }

  const AddWishlist = () => {
    Alert.alert('Confirmation', 'Do you want to add this product into your wishlist?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {
        //hanger!==null ? setHanger(false) : setHanger(true)
        setLoading(true);

        let obj = {
          user_id: user?.userData?.id,
          product_id:props?.route?.params?.data?.product?.id
      };

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: AddWishListUrl,
          headers: { 
            'Authorization': `Bearer ${user.token}`, 
            'Accept': 'application/json'
          },
          data : obj
        };

        axios.request(config)
        .then(async function (res) {
           console.log(res.data);
           //setHanger(true)

           axios
           .get(GetProductInfoById+`${props?.route?.params?.data?.product?.id}`)
           .then(async function (res) {
              setData(res?.data?.data);  

              if(user?.token !== ''){

                axios
                .get(`https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.product?.id}/${user?.userData?.id}`)
                .then(async function (res){
                  //setHeart(res?.data?.data?.is_liked > 0 ? true : null)
                  setHanger(res?.data?.data?.is_wishlist > 0 ? true : null)
                  //setShare(res?.data?.data?.is_shared > 0 ? true : null)
    
                  setLoading(false);
                  successMessage('Success') 
                })
                .catch(function (e){
                  console.log(e.response.data)
    
                  setLoading(false);
                  errorMessage('Something went wrong to update state of wishlists!')
                });
        
               }else{
                 setLoading(false);
                 successMessage('Success') 
               }

              //setLoading(false);
              //successMessage('Success')
           }) 
           .catch(function (error) {
             console.log(error?.response?.data)
             setLoading(false);
             errorMessage('Something went wrong to update wishlists!')
           });

          //  setLoading(false);
          //  successMessage('Success')
        }) 
        .catch(function (error) {
          console.log(error.response.data)
          setLoading(false);
          //errorMessage('Something went wrong to add product into wishlist!')
          errorMessage(error?.response?.data?.message)
        });

      }
      },
    ]);
  }

  const RemoveWishlist = () => {
    Alert.alert('Confirmation', 'Do you want to remove this product from your wishlist?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => {
        //hanger!==null ? setHanger(false) : setHanger(true)
        setLoading(true);

        let config = {
          method: 'delete',
          maxBodyLength: Infinity,
          url: RemoveFromWishlist+props?.route?.params?.data?.product?.id,
          headers: { 
            'Authorization': `Bearer ${user.token}`, 
            'Accept': 'application/json'
          },
        };

        axios.request(config)
        .then(async function (res) {
           console.log(res.data);
           //setHanger(true)

           axios
           .get(GetProductInfoById+`${props?.route?.params?.data?.product?.id}`)
           .then(async function (res) {
              setData(res?.data?.data);  

              if(user?.token !== ''){

                axios
                .get(`https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.product?.id}/${user?.userData?.id}`)
                .then(async function (res){
                  //setHeart(res?.data?.data?.is_liked > 0 ? true : null)
                  setHanger(res?.data?.data?.is_wishlist > 0 ? true : null)
                  //setShare(res?.data?.data?.is_shared > 0 ? true : null)
    
                  setLoading(false);
                  successMessage('Success') 
                })
                .catch(function (e){
                  console.log(e.response.data)
    
                  setLoading(false);
                  errorMessage('Something went wrong to update state of wishlists!')
                });
        
               }else{
                 setLoading(false);
                 successMessage('Success') 
               }

              //setLoading(false);
              //successMessage('Success')
           }) 
           .catch(function (error) {
             console.log(error?.response?.data)
             setLoading(false);
             errorMessage('Something went wrong to update wishlists!')
           });

          //  setLoading(false);
          //  successMessage('Success')
        }) 
        .catch(function (error) {
          console.log(error.response.data)
          setLoading(false);
          errorMessage('Something went wrong to remove product from wishlist!')
          //errorMessage(error?.response?.data?.message)
        });

      }
      },
    ]);
  }

  const productLikeDislike = () => {
    //heart ? setHeart(false) : setHeart(true)

    setLoading(true);

    let obj = {
      user_id: user?.userData?.id,
      product_id:props?.route?.params?.data?.product?.id
  };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: heart!==null?ProductDislike:ProductLike,
      headers: { 
        'Authorization': `Bearer ${user.token}`, 
        'Accept': 'application/json'
      },
      data : obj
    };

    axios.request(config)
    .then(async function (res) {
       console.log(res.data);
       //heart!==null?setHeart(null):setHeart(true)

       axios
       .get(GetProductInfoById+`${props?.route?.params?.data?.product?.id}`)
       .then(async function (res) {
          setData(res?.data?.data); 

          if(user?.token !== ''){

            axios
            .get(`https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.product?.id}/${user?.userData?.id}`)
            .then(async function (res){
              setHeart(res?.data?.data?.is_liked > 0 ? true : null)
              //setHanger(res?.data?.data?.is_wishlist > 0 ? true : null)
              //setShare(res?.data?.data?.is_shared > 0 ? true : null)

              setLoading(false);
              successMessage('Success') 
            })
            .catch(function (e){
              console.log(e.response.data)

              setLoading(false);
              errorMessage('Something went wrong to update state of likes!')
            });
    
           }else{
             setLoading(false);
             successMessage('Success') 
           }

          //setLoading(false);
          //successMessage('Success') 
       }) 
       .catch(function (error) {
         console.log(error?.response?.data)
         setLoading(false);
         errorMessage('Something went wrong to update likes!')
       });

      //  setLoading(false);
      //  successMessage('Success')
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      errorMessage('Something went wrong to like product!')
    });

  }

  const productShare = () => {
    //share!==null ? setShare(false) : setShare(true)
    
    setLoading(true);

    let obj = {
      user_id: user?.userData?.id,
      product_id:props?.route?.params?.data?.product?.id
  };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ProductShare,
      headers: { 
        'Authorization': `Bearer ${user.token}`, 
        'Accept': 'application/json'
      },
      data : obj
    };

    axios.request(config)
    .then(async function (res) {
       console.log(res.data);
       //setShare(true)

       axios
       .get(GetProductInfoById+`${props?.route?.params?.data?.product?.id}`)
       .then(async function (res) {
          setData(res?.data?.data);  

          if(user?.token !== ''){

            axios
            .get(`https://lamaison.clickysoft.net/api/v1/product/${props?.route?.params?.data?.product?.id}/${user?.userData?.id}`)
            .then(async function (res){
              //setHeart(res?.data?.data?.is_liked > 0 ? true : null)
              //setHanger(res?.data?.data?.is_wishlist > 0 ? true : null)
              setShare(res?.data?.data?.is_shared > 0 ? true : null)

              setLoading(false);
              successMessage('Success') 
            })
            .catch(function (e){
              console.log(e.response.data)

              setLoading(false);
              errorMessage('Something went wrong to update state of shares!')
            });
    
           }else{
             setLoading(false);
             successMessage('Success') 
           }

          //setLoading(false);
          //successMessage('Success')
       }) 
       .catch(function (error) {
         console.log(error?.response?.data)
         setLoading(false);
         errorMessage('Something went wrong to update shares!')
       });

      //  setLoading(false);
      //  successMessage('Success')
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      errorMessage('Something went wrong to share product!')
    });

  }

  const scrollX = new Animated.Value(0);
  return (
    <>
<View style={{position:'absolute',zIndex:999}}>
{loading && (
      <LoaderComp/>
    )}
</View>
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{marginLeft: wp2(3), marginRight: wp2(5)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.dressingText}>DRESSING ROOM</Text>
        </View>
        { loading2 ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :    
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: hp2(12), paddingTop: hp2(2)}}>
          <View style={styles.iconWraper}>
            <View style={styles.shadow}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('brandProfileScreen'
                ,{userData:{userData:{id:data?.user?.id,profile_image:data?.user?.profile_image?.original_url,name:data?.user?.name}}}
                )}
                style={styles.brandImage}>
                <Image
                   //source={IMAGES.randomPic}
                  source={{uri:data?.user?.profile_image?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={() => {
                user?.token !== '' ? productLikeDislike() : errorMessage('You cant like!')
              }}>
              <ICONS.AntDesign
                name="heart"
                size={24}
                color={heart!==null ? '#FC0004' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>{data?.product_likes_count}</Text>
            <TouchableOpacity
              onPress={() => {
                user?.userData?.role?.[0]?.id !==3 && user?.token !== '' ? hanger!==null?RemoveWishlist():AddWishlist() : errorMessage('You cant add to wishlist!')
              }}>
              <ICONS.MaterialCommunityIcons
                name="hanger"
                size={34}
                color={hanger!==null ? '#162FAC' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>{data?.product_wishlist_count}</Text>
            <TouchableOpacity
              onPress={() => {
                user?.token !== '' ? productShare() : errorMessage('You cant share!')
              }}>
              <ICONS.FontAwesome
                name="retweet"
                size={24}
                color={share!==null ? '#13D755' : 'black'}
              />
            </TouchableOpacity>
            <Text style={{color: 'black'}}>{data?.product_shares_count}</Text>

          </View>

          <View style={{flexDirection: 'row', marginVertical: hp2(1)}}>
            <View style={styles.imagesWrap}>
              <View style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('imageViewScreen')}
                  style={[
                    styles.brandImage,
                    {width: wp2(54), height: hp2(28), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    //source={IMAGES.randomPic}
                    source={{uri:data?.product_images?.[0]?.image?.[0]?.original_url}}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {
                      width: wp2(54),
                      height: hp2(28),
                      borderRadius: wp2(2),
                      backgroundColor: '#F0F0F0',
                    },
                  ]}>
                  <Animated.ScrollView
                    //style={{flexGrow:0,}}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                      [{nativeEvent: {contentOffset: {x: scrollX}}}],
                      {useNativeDriver: true},
                    )}>
                      <View style={styles.textBox}>
                      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                      <Text style={[styles.headingText,{alignSelf:'flex-start',marginLeft:wp2(1),fontSize:rfv(14),marginBottom:hp2(1)}]}>
                        {data?.name}
                      </Text>
                      <Text style={{color:'black',fontSize:rfv(12),marginLeft:wp2(1),marginBottom:hp2(1)}} >PRICE: £{data?.price}</Text>
                      <Text style={[styles.text,{paddingBottom:hp2(3)}]}>
                      Description: {data?.description}
                      </Text>
                      </ScrollView>
                    </View>

                    <View style={styles.textBox}>
                      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                      <Text style={styles.headingText}>
                        shipping information
                      </Text>
                      <Text style={[styles.text,{paddingBottom:hp2(3)}]}>
                        {data?.user?.shipping_information?.description}
                      </Text>
                      </ScrollView>
                    </View>

                    <View style={styles.textBox}>
                      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                      <Text style={styles.headingText}>
                        La maison App Notice
                      </Text>
                      {appNotice !== null ? (
                        <View style={{paddingHorizontal: wp2(1),paddingBottom:hp2(3)}}>
                          <RenderHtml source={appNotice} />
                        </View>
                      ):(
                        <SkypeIndicator color={'black'} />
                      )}
                      {/* <Text style={styles.text}>
                        the cost of shipping is <Text style={{color:'#0F2ABA',fontWeight:'700'}}>not</Text> decided by LA Maison App.
                        this is decided by the brands themselves. <Text style={{color:'#0F2ABA',fontWeight:'700'}}>the country
                        the product is delivered to may add additional taxes.</Text>
                      </Text> */}
                      </ScrollView>
                    </View>
                  </Animated.ScrollView>
                  <View
                    style={{
                      width: wp2(54),
                      height: hp2(2),
                    }}>
                    <RNAnimatedScrollIndicators
                      numberOfCards={3}
                      scrollWidth={wp2(54)}
                      activeColor={'#707070'}
                      inActiveColor={'#D9D9D9'}
                      scrollAnimatedValue={scrollX}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.imagesWrap, {width: wp2(40)}]}>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    //source={IMAGES.randomPic}
                    source={{
                      uri:data?.product_images?.[0]?.image.length===1?data?.product_images?.[0]?.image?.[0]?.original_url
                      :data?.product_images?.[0]?.image.length>=2?data?.product_images?.[0]?.image?.[1]?.original_url
                      :null
                    }}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    //source={IMAGES.vinDiesel}
                    source={{
                      uri:data?.product_images?.[0]?.image.length===1?data?.product_images?.[0]?.image?.[0]?.original_url
                      :data?.product_images?.[0]?.image.length===2?data?.product_images?.[0]?.image?.[0]?.original_url
                      :data?.product_images?.[0]?.image.length>=3?data?.product_images?.[0]?.image?.[2]?.original_url
                      :null
                    }}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <View
                  style={[
                    styles.brandImage,
                    {width: wp2(34), height: hp2(14), borderRadius: wp2(2)},
                  ]}>
                  <Image
                    //source={IMAGES.randomPic}
                    source={{
                      uri:data?.product_images?.[0]?.image.length===1?data?.product_images?.[0]?.image?.[0]?.original_url
                      :data?.product_images?.[0]?.image.length===2?data?.product_images?.[0]?.image?.[1]?.original_url
                      :data?.product_images?.[0]?.image.length===3?data?.product_images?.[0]?.image?.[0]?.original_url
                      :data?.product_images?.[0]?.image.length===4?data?.product_images?.[0]?.image?.[3]?.original_url
                      :null
                    }}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.shadow}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('selectColor',{data:data,state:{colorId,setColorId,sizeId,setSizeId}})}
                  style={[
                    styles.brandImage,
                    {
                      width: wp2(34),
                      height: hp2(14),
                      borderRadius: wp2(2),
                      //backgroundColor: '#168B16',
                      backgroundColor:colorId?.color_code
                    },
                  ]}></TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.filters}>
            <Text style={{color: 'black'}}>SIZE</Text>
            <Text
              style={{color: 'black', fontSize: rfv(22), position:'absolute' , right:wp2(14)}}>
              {sizeId?.size?.size}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('selectSizes',{data:data,color:colorId,state:{sizeId,setSizeId}})}>
              <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          </View>
          <View style={styles.filters}>
            <Text style={{color: 'black'}}>REVIEWS</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('review')}>
              <ICONS.AntDesign name="right" size={24} color="#A1A1A1" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => sizeId!==null?props.navigation.navigate('checkoutScreen'):errorMessage('Please select size before proceeding')}
            style={[
              styles.button,
              {alignSelf: 'center', marginVertical: hp2(4)},
            ]}>
            <Text style={styles.buttonText}>BUY NOW</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <TouchableOpacity
              onPress={AddBasket}
              style={[
                styles.button,
                {width: wp2(40), marginHorizontal: wp2(2)},
              ]}>
              <Text style={styles.buttonText}>ADD TO BASKET</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              user?.userData?.role?.[0]?.id !==3 && user?.token !== '' ? hanger!==null?RemoveWishlist():AddWishlist() : errorMessage('You cant add to wishlist!')
            }}
              style={[
                styles.button,
                {width: wp2(40), marginHorizontal: wp2(2)},
              ]}>
              <Text style={styles.buttonText}>{hanger!==null?'REMOVE FROM WISHLIST':'ADD TO WISHLIST'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        }
        {/* <BottomComp /> */}
      </View>
    </SafeAreaView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
  },
  dressingText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  iconWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: hp2(1),
  },

  brandImage: {
    width: wp2(16),
    height: hp2(8),
    overflow: 'hidden',
    borderRadius: wp2(6),
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //elevation: 5,
  },
  imagesWrap: {
    height: hp2(60),
    width: wp2(60),
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBox: {width: wp2(54), height: hp2(28)},
  headingText: {
    fontSize: rfv(12),
    fontWeight: '600',
    color: 'black',
    textTransform: 'uppercase',
    marginVertical: hp2(2),
    alignSelf: 'center',
  },
  text: {
    textTransform: 'uppercase',
    color: 'black',
    textAlign: 'auto',
    fontSize: rfv(10),
    paddingHorizontal: wp2(1),
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(1),
  },
  button: {
    width: wp2(36),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(8),
  },
});
