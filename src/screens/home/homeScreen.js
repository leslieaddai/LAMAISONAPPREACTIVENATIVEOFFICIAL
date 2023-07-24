import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView,
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

import BottomComp from '../../components/bottomComp';
import WelcomeScreen from '../welcome/welcomeScreen';
import SplashScreen from '../splash/splashScreen';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {Popular,Newsfeed} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';
import OneSignal from 'react-native-onesignal';
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

  useEffect(() => {
    setLoading(true);

    axios
      .get(Popular, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        console.log(res?.data);
        setPopularData(res?.data?.data);
        user?.token!==''?getNewsfeed('1'):setLoading(false)
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
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
        console.log(res?.data);
        setFeedData(prev => [...prev, ...res?.data?.data?.newsfeed?.data]);
        setPage(res?.data?.data?.newsfeed?.next_page_url);
        setPageNo(res?.data?.data?.newsfeed?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error?.response?.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  const brandComp = data => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('brandProfileScreen',{userData:{userData:{id:data?.user_id}}})}
          style={styles.brandImage}>
          <Image
            //source={IMAGES.randomPic}
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
          style={[styles.brandImage,{backgroundColor:data?.color?.color_code}]}>
        </View>
      </View>
    );
  };

  const pieceComp = data => {
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View
          style={[styles.brandImage,{backgroundColor:'lightgray',alignItems:'center',justifyContent:'center',}]}>
            <Text style={{fontSize:rfv(14),color:'black'}} >{data?.piece?.piece_name}</Text>
        </View>
      </View>
    );
  };

  const postComp = (data) => {
    const onloading = (value,label)=>{
      setPostcomploading(value)
    }
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('editorProfileScreen')}
            style={styles.imageWrap}>
            <Image
              source={IMAGES.randomProfile}
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
          <Text style={{color: 'black'}}>ICEY.B Shared</Text>
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('imageViewScreen',{item:[{image:[{original_url:data?.product_images?.[0]?.image?.[0]?.original_url}]}]})}
          style={styles.imageContainer}>
            {postcomloading?
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
          onPress={() => props.navigation.navigate('brandProfileScreen')}
          style={[
            styles.imageWrap,
            // {marginLeft: wp2(3), marginVertical: hp2(1)},
          ]}>
          <Image
            source={IMAGES.randomProfile}
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
          <Text style={{color: 'black'}}>ICEY.B Shared</Text>
        </View>

        <View style={styles.productContainer}>
          {data?.product_images?.[0]?.image?.map((item,index)=>{
            return(
              <TouchableOpacity
              key={index}
            onPress={() => props.navigation.navigate('imageViewScreen',{item:[{image:[{original_url:item?.original_url}]}]})}
            style={styles.productImageContainer}>
               {productcomploading?
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
            progressiveRenderingEnabled={true}
            onLoadStart={()=>{onloading(true,"onLoadStart")}}
            onLoad={()=>onloading(false,"onLoad")}
            onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
              //source={IMAGES.randomPic}
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
          onPress={() => props.navigation.navigate('brandProfileScreen')}
          style={[
            styles.imageWrap,
            // {marginLeft: wp2(3), marginVertical: hp2(1)},
          ]}>
          <Image
            source={IMAGES.randomProfile}
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
          <Text style={{color: 'black'}}>ICEY.B Shared</Text>
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

  useEffect(()=>{
    typeof OneSignal.setNotificationOpenedHandler == 'function'
    && OneSignal.setNotificationOpenedHandler((nitificationresponse)=>{
      const { notification } = nitificationresponse;
        if (notification) {
          console.log("notification",notification)
          const { additionalData = null } = notification;
          if (additionalData) {
            // const { signal_id } = additionalData;
            // dispatch({
            //   type: types.signalid,
            //   payload: signal_id,
            // });
            console.log("additionalData",additionalData)
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'NotificationSignal'}],
            // })
          }
          else{
            console.log("notifiction cheking")
            // navigation.reset({
            //   index: 0,
            //   routes: [{ name: 'Home'}],
            // })
          }
        }
      })

  },[])


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
        {loading && feedData?.length === 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
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

              // return (
              //   <>
              //   {item?.product_images?.[0]?.image?.length===1?postComp(item):item?.product_images?.[0]?.image?.length===2?productComp2(item):productComp(item)}
              //   </>

              // );
            }}
          />
      )}

       {loading && feedData?.length !== 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: hp2(3),
              }}>
              <SkypeIndicator size={26} color={'black'} />
            </View>
          )}
        </>
      ):(
        <>
        {loading ? (
           <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
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
    //backgroundColor:'red',
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
    //backgroundColor:'red',
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
    shadowColor: '#000',
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
    //backgroundColor:'yellow',
    marginTop: hp2(1),
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
  productImageContainer2: {
    width: wp2(48),
    height: hp2(32),
    overflow: 'hidden',
    //marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
