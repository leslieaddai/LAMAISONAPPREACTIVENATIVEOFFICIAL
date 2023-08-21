import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,

  ScrollView,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,
  ICONS,
  COLORS,
 
  wp2,
  hp2,
 
} from '../../theme';

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {OneSignalMessage, errorHandler} from '../../config/helperFunction';
import {Popular,Newsfeed, getCount} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import OneSignal from 'react-native-onesignal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonViewMainComp from '../../components/SkeletonViewComponents/SkeletonViewMainComp';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [popularData, setPopularData] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);
  const [loadingImage, setLoadingImage] = useState(false)
  const [postcomloading,setPostcomploading] = useState(false)
  const[productcomploading,setProductcomploading] =useState(false)
  const [prod2comploading,setProd2comploading] = useState(false)
  let data =[{},{},{},{}]
  OneSignal.setExternalUserId(String(user.userData.id))

OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  
  let notification = notificationReceivedEvent.getNotification();
  OneSignalMessage("La Maison",notification.body)
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  notificationReceivedEvent.complete(notification);
});

OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
  if (notification) {
    const { additionalData = null } = notification.notification;
    if(additionalData !=null){
      props.navigation.navigate('orderTrackingScreen')
    }
    else{
      props.navigation.navigate('notificationScreen')
    }
  }
});

  useEffect(()=>{
    user?.token !== null && 
    user?.userData?.role?.[0]?.id === 3&&
    getbrandOrderCount()
  },[])

  const getbrandOrderCount = ()=>{
    axios
      .get(getCount, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        dispatch({
          type: types.OrderCount,
          payload: res?.data?.order_count,
        });
      })
      .catch(function (error) {
       
        errorMessage(errorHandler(error))
      });
  }

  useEffect(() => {
    setLoading(true);

    axios
      .get(Popular, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        
        setPopularData(res?.data?.data);
        user?.token!==''?getNewsfeed('1'):setLoading(false)
       
      })
      .catch(function (error) {
        console.log("res home",error.response.data)
        setLoading(false);
       
        errorMessage(errorHandler(error))
      });
  }, []);
  const getNewsfeed = page_no => {
    !loading && setLoading(true);

    axios
      .get(Newsfeed+page_no,{
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        // console.log("saasd",res?.data?.data?.newsfeed?.data[0]?.user)
        setFeedData(prev => [...prev, ...res?.data?.data?.newsfeed?.data]);
        setPage(res?.data?.data?.newsfeed?.next_page_url);
        setPageNo(res?.data?.data?.newsfeed?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        
        setLoading(false);
      
        errorMessage(errorHandler(error))
      });
  };

  const brandComp = data => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <TouchableOpacity
          onPress={() => 
            props.navigation.navigate('brandProfileScreen',{
            userData: {
              userData: {
                id: data?.brand?.id,
                profile_image:
                data?.brand?.profile_image?.original_url,
                name: data?.brand?.name,
                role: [{id: 3}],
              },
            },
          })
         
        }
          style={styles.brandImage}>
          <Image
         
            source={data?.brand?.profile_image!==null?{uri:data?.brand?.profile_image?.original_url}:IMAGES.profileIcon3}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const colorComp = data => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View
          style={styles.brandImage}>
            <Image
            source={{uri:data.product.product_images[0].image[0].original_url}}
            style={{width:'100%',height:'100%'}}
            />
        </View>
      </View>
    );
  };

  const pieceComp = data => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View
          style={styles.brandImage}>
            <Image
            source={{uri:data.product.product_images[0].image[0].original_url}}
            style={{width:'100%',height:'100%'}}
            />
        </View>
      </View>
    );
  };

  const postComp = (data) => {
    const onloading = (value,label)=>{
      setPostcomploading(value)
    }
    // console.log("post comp",data.user)
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('brandProfileScreen',{
                userData: {
                  userData: {
                    id: data?.user?.id,
                    profile_image:
                    data?.user?.profile_image?.original_url,
                    name: data?.user?.name,
                    role: [{id: 3}],
                  },
                },
              })
            }
            style={styles.imageWrap}>
            <Image
              source={data?.user?.profile_image==null?IMAGES.profileIcon3:{uri:data.user?.profile_image?.original_url}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={'black'}
            style={{marginHorizontal: wp2(4)}}
          />
          <Text style={{color: 'black'}}>{data?.user?.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('imageViewScreen',{item:[{image:[{original_url:data?.product_images?.[0]?.image?.[0]?.original_url}]}]})}
          style={styles.imageContainer}>
            {postcomloading?
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
            source={{uri:data?.product_images?.[0]?.image?.[0]?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const productComp = (data) => {
    const onloading = (value,label)=>{
      setProductcomploading(value)
    }
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => 
            props.navigation.navigate('brandProfileScreen',{
            userData: {
              userData: {
                id: data.user.id,
                profile_image:
                  data?.user?.profile_image?.original_url,
                name: data?.user?.name,
                role: [{id: 3}],
              },
            },
          })
        }
          style={[
            styles.imageWrap,
           
          ]}>
          <Image
            source={data?.user?.profile_image==null?IMAGES.profileIcon3:{uri:data.user?.profile_image?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={'black'}
            style={{marginHorizontal: wp2(4)}}
          />
          <Text style={{color: 'black'}}>{data?.user?.name}</Text>
        </View>

        <View style={styles.productContainer}>
          {data?.product_images?.[0]?.image?.map((item,index)=>{
            return(
              <TouchableOpacity
              key={index}
            onPress={() => props.navigation.navigate('imageViewScreen',{item:[{image:[{original_url:item?.original_url}]}]})}
            style={styles.productImageContainer}>
               {productcomploading?
        <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.productskeletonView} />
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
              resizeMode="cover"
            />
          </TouchableOpacity>
            )
          })}
        </View>
      </View>
    );
  };

  const productComp2 = (data) => {
    const onloading = (value,label)=>{
      setProd2comploading(value)
    }
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => 
            props.navigation.navigate('brandProfileScreen',{
            userData: {
              userData: {
                id: data.user.id,
                profile_image:
                  data?.user?.profile_image?.original_url,
                name: data?.user?.name,
                role: [{id: 3}],
              },
            },
          })
        }
          style={[
            styles.imageWrap,
           
          ]}>
          <Image
            source={data?.user?.profile_image==null?IMAGES.profileIcon3:{uri:data.user?.profile_image?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <ICONS.FontAwesome
            name="retweet"
            size={24}
            color={'black'}
            style={{marginHorizontal: wp2(4)}}
          />
          <Text style={{color: 'black'}}>{data?.user?.name}</Text>
          </View>

        <View
          style={{
            flexDirection: 'row',
            width: wp2(100),
            justifyContent: 'space-between',
          }}>

            {data?.product_images?.[0]?.image?.map((item,index)=>{
            return(
              <TouchableOpacity
              key={index}
            onPress={() => props.navigation.navigate('imageViewScreen',{item:[{image:[{original_url:item?.original_url}]}]})}
            style={styles.productImageContainer2}>
              {prod2comploading?
       <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
       <View style={styles.productskeletonView2} />
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
              resizeMode="cover"
            />
          </TouchableOpacity>
            )
          })}

        </View>
      </View>
    );
  };



  return (
    <View style={styles.container}>
      <SafeAreaView></SafeAreaView>
      <View style={styles.logoWrap}>
        <Text style={{fontSize: rfv(18), color: 'gray'}}>LA MAISON APP</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('homeScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.gridView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.line}></View>
        <TouchableOpacity
        disabled={user?.token!==''?false:true}
          onPress={() => props.navigation.navigate('listViewScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.listView}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {user?.token!==''?(
        <>
        {loading && feedData?.length === 0 && 
        (
        <FlatList
        data={data}
        renderItem={()=>{
          return(
            <SkeletonViewMainComp
            nametag={true}
            />
          )
        }}
        />
       
      )}

      {!loading && feedData?.length === 0 ? (
           <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{paddingBottom: hp2(2)}}>

           <Text style={styles.text}>Popular Brands</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {popularData?.brands?.map((item,index)=>{
               return(
                 <>
                 {brandComp(item)}
                 </>
               )
             })}
           </ScrollView>
         
           <Text style={styles.text}>Popular Pieces</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {popularData?.pieces?.map((item,index)=>{
               return(
                 <>
                 {pieceComp(item)}
                 </>
               )
             })}
           </ScrollView>
         
           <Text style={styles.text}>Popular Colour</Text>
           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
             {popularData?.colors?.map((item,index)=>{
               return(
                 <>
                 {colorComp(item)}
                 </>
               )
             })}
           </ScrollView>
          
         </ScrollView>   
      ):(
        <FlatList
            showsVerticalScrollIndicator={false}
            data={feedData}
            onEndReached={() =>
              !loading && page !== null && getNewsfeed(String(pageNo + 1))
            }
            onEndReachedThreshold={0.1}
            renderItem={({item,index}) => {
              if(feedData?.length===1){
                return(
                  <>
                {item?.product_images?.[0]?.image?.length===1?postComp(item):item?.product_images?.[0]?.image?.length===2?productComp2(item):productComp(item)}

                <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.brands?.map((item,index)=>{
            return(
              <>
              {brandComp(item)}
              </>
            )
          })}
        </ScrollView>

        <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.pieces?.map((item,index)=>{
            return(
              <>
              {pieceComp(item)}
              </>
            )
          })}
        </ScrollView>

        <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
          {popularData?.colors?.map((item,index)=>{
            return(
              <>
              {colorComp(item)}
              </>
            )
          })}
        </ScrollView>
                </>
                )
              }

             else if(feedData?.length===2){
                return(
                  <>
                    {item?.product_images?.[0]?.image?.length===1?postComp(item):item?.product_images?.[0]?.image?.length===2?productComp2(item):productComp(item)}
                    {index === 0 && (
                      <>
                              <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.brands?.map((item,index)=>{
            return(
              <>
              {brandComp(item)}
              </>
            )
          })}
        </ScrollView>
                      </>
                    )}
                     {index === 1 && (
                      <>
                       <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.pieces?.map((item,index)=>{
            return(
              <>
              {pieceComp(item)}
              </>
            )
          })}
        </ScrollView>

        <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
          {popularData?.colors?.map((item,index)=>{
            return(
              <>
              {colorComp(item)}
              </>
            )
          })}
        </ScrollView>
                      </>
                    )}        
                </>
                 
                )
              }

              else if(feedData?.length>=3){
                return(
                  <>
                    {item?.product_images?.[0]?.image?.length===1?postComp(item):item?.product_images?.[0]?.image?.length===2?productComp2(item):productComp(item)}
                    {index === 0 && (
                      <>
                              <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.brands?.map((item,index)=>{
            return(
              <>
              {brandComp(item)}
              </>
            )
          })}
        </ScrollView>
                      </>
                    )}
                     {index === 1 && (
                      <>
                       <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.pieces?.map((item,index)=>{
            return(
              <>
              {pieceComp(item)}
              </>
            )
          })}
        </ScrollView>
                      </>
                    )} 
          {index === 2 && (
                      <>
                       <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.colors?.map((item,index)=>{
            return(
              <>
              {colorComp(item)}
              </>
            )
          })}
        </ScrollView>
                      </>
                    )}                       
                </>
                 
                )
              }

             
            }}
          />
      )}

       {loading && feedData?.length !== 0 && (
            <FlatList
            data={data}
            renderItem={()=>{
              return(
                <SkeletonViewMainComp
                nametag={true}
                />
              )}}
              />
            
          )}
        </>
      ):(
        <>
        {loading ? (
           <FlatList
           data={data}
           renderItem={()=>{
             return(
               <SkeletonViewMainComp
               nametag={true}
               />
             )}}
             />
        ) : (
                  <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp2(2)}}>

        <Text style={styles.text}>Popular Brands</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.brands?.map((item,index)=>{
            return(
              <>
              {brandComp(item)}
              </>
            )
          })}
        </ScrollView>

        <Text style={styles.text}>Popular Pieces</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.pieces?.map((item,index)=>{
            return(
              <>
              {pieceComp(item)}
              </>
            )
          })}
        </ScrollView>
          
        <Text style={styles.text}>Popular Colour</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularData?.colors?.map((item,index)=>{
            return(
              <>
              {colorComp(item)}
              </>
            )
          })}
        </ScrollView>
        
      </ScrollView>
        )}
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  logoWrap: {
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp2(100),
    height: hp2(8),
    overflow: 'hidden',
  },
  iconContainer: {
    width: wp2(44),
    height: hp2(8),
    flexDirection: 'row',
   
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconWrap: {
    width: wp2(12),
    height: hp2(8),
    overflow: 'hidden',
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  headWrap: {
    width: wp2(94),
    height: hp2(7),
    
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    overflow: 'hidden',
    backgroundColor:Platform.OS =='android'&&'white'
,    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: wp2(100),
    height: hp2(30),
    overflow: 'hidden',
   
    marginTop: hp2(1),
  },
  skeletonView:{
    width: wp2(100),
    height: hp2(30)
  },
  text: {
    fontWeight: '600',
    fontSize: rfv(18),
    color: 'black',
    marginTop: hp2(2),
    marginLeft: wp2(4),
    marginBottom: hp2(1),
  },
  brandImage: {
    width: wp2(34),
    height: hp2(16),
    overflow: 'hidden',
    backgroundColor:Platform.OS =='android'&&'white',
    marginHorizontal: wp2(1),
  },
  productContainer: {
    width: wp2(100),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productImageContainer: {
    width: wp2(47),
    height: hp2(18),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(2),
  },
  productskeletonView:{
    width: wp2(47),
    height: hp2(18),
  },
  productImageContainer2: {
    width: wp2(48),
    height: hp2(32),
    overflow: 'hidden',
   
    marginTop: hp2(1),
  },
  productskeletonView2:{
    width: wp2(48),
    height: hp2(32),
  }
});
