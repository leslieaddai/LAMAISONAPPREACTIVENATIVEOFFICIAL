import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ImageBackground,
  Platform,
  SafeAreaView,
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
import BrandComp from '../../components/editorProfileComps/brands';
import Wardrobe from '../../components/editorProfileComps/wardrobe';
import NextPickup from '../../components/editorProfileComps/nextPickup';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetEditorInfo,
  WishListsUrl,
  FollowUrl,
  UnfollowUrl,
  GetEditorFollowerList,
  GetEditorFollowingList,
  GetBrandFollowerList,
  GetBrandFollowingList,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function EditorProfileScreen(props) {
  //console.log(props.route.params.userData.userData)

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  // const [loadingFollowList,setLoadingFollowList]=useState(false);
  // const [followingDataBrand,setFollowingDataBrand]=useState([]);
  // const [followerDataBrand,setFollowerDataBrand]=useState([]);
  // const [followingDataEditor,setFollowingDataEditor]=useState([]);
  // const [followerDataEditor,setFollowerDataEditor]=useState([]);

  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [follow, setFollow] = useState(false);

  // useEffect(()=>{
  //   setLoading(true);

  //   axios
  //   //.post(WishListsUrl,{user_id:user?.userData?.id})
  //   .post(WishListsUrl, {user_id:props?.route?.params?.userData?.userData?.id})
  //   .then(async function (res) {
  //      console.log(res.data);
  //      setData(res?.data?.data.reverse());
  //      setLoading(false);
  //   })
  //   .catch(function (error) {
  //     console.log(error.response.data)
  //     setLoading(false);
  //     errorMessage('Something went wrong!')
  //   });

  // },[])

  useEffect(() => {
    //getBrandData()
    setLoading(true);

    axios
      .get(
        GetEditorInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
        console.log(res.data);
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  }, []);

  const getEditorData = () => {
    //setLoading(true);

    axios
      .get(
        GetEditorInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
        console.log(res.data);
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  // useEffect(()=>{
  //   setLoadingFollowList(true);

  //   axios
  //   .get(GetBrandFollowerList+`/${props?.route?.params?.userData?.userData?.id}`)
  //   .then(async function (res) {
  //      console.log(res.data);
  //      setFollowerDataBrand(res.data.data);
  //      if(user?.token !== ''){
  //       if(user?.userData?.id !== props?.route?.params?.userData?.userData?.id && user?.userData?.role[0]?.id===3){
  //         //console.log(res.data.data.some(e => e.follower_id === user?.userData?.id))
  //         setFollow(res.data.data.some(e => e.follower_id === user?.userData?.id))
  //       }
  //      }

  //      axios
  //      .get(GetBrandFollowingList+`/${props?.route?.params?.userData?.userData?.id}`)
  //      .then(async function (res){
  //         console.log(res.data);
  //         setFollowingDataBrand(res.data.data);

  //         axios
  //         .get(GetEditorFollowerList+`/${props?.route?.params?.userData?.userData?.id}`)
  //         .then(async function (res){
  //           console.log(res.data);
  //           setFollowerDataEditor(res.data.data);
  //           if(user?.token!==''){
  //             if(user?.userData?.id !== props?.route?.params?.userData?.userData?.id && user?.userData?.role[0]?.id===2){
  //               //console.log(res.data.data.some(e => e.follower_id === user?.userData?.id))
  //               setFollow(res.data.data.some(e => e.follower_id === user?.userData?.id))
  //             }
  //           }

  //           axios
  //           .get(GetEditorFollowingList+`/${props?.route?.params?.userData?.userData?.id}`)
  //           .then(async function (res){
  //             console.log(res.data);
  //             setFollowingDataEditor(res.data.data);
  //             setLoadingFollowList(false);
  //           })
  //           .catch(function (error){
  //             console.log(error.response.data)
  //             setLoadingFollowList(false);
  //             errorMessage('Something went wrong!')
  //           })

  //         })
  //         .catch(function (error){
  //           console.log(error.response.data)
  //           setLoadingFollowList(false);
  //           errorMessage('Something went wrong!')
  //         })

  //      })
  //      .catch(function (error){
  //       console.log(error.response.data)
  //       setLoadingFollowList(false);
  //       errorMessage('Something went wrong!')
  //      })

  //   })
  //   .catch(function (error) {
  //     console.log(error.response.data)
  //     setLoadingFollowList(false);
  //     errorMessage('Something went wrong!')
  //   });

  // },[])

  const onFollow = () => {
    setLoadingFollow(true);

    let config = {
      method: 'post',
      url: FollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: {
        follower_id: user?.userData?.id,
        following_id: props?.route?.params?.userData?.userData?.id,
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        getEditorData();
        setFollow(true);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFollow(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  const onUnFollow = () => {
    setLoadingFollow(true);

    let config = {
      method: 'post',
      url: UnfollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: {
        follower_id: user?.userData?.id,
        following_id: props?.route?.params?.userData?.userData?.id,
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        getEditorData();
        setFollow(false);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFollow(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <SkypeIndicator color={'black'} />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.editorProfile}>
              <ImageBackground
                //source={IMAGES.randomProfile}
                //source={{uri:props?.route?.params?.userData?.userData?.profile_image}}
                source={data?.profile_image!==null?{uri: data?.profile_image?.original_url}:IMAGES.profileIcon3}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain">
                {props?.route?.params?.userData?.userData?.id ===
                  user?.userData?.id && (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('settingsScreen', {user: user})
                    }
                    style={styles.iconWrap}>
                    <ICONS.Ionicons
                      name="menu-outline"
                      size={44}
                      color="black"
                    />
                    <View style={styles.notificationBadge}>
                      <Text style={{color: 'white', fontSize: rfv(10)}}>1</Text>
                    </View>
                  </TouchableOpacity>
                )}
                <View style={styles.nameContainer}>
                  {/* <Text style={{color:'black',fontWeight:'700',fontSize:rfv(22)}}>{props?.route?.params?.userData?.userData?.username}</Text> */}
                  <Text style={styles.usernameTxt}>{data?.username}</Text>
                  {props?.route?.params?.userData?.userData?.id !==
                    user?.userData?.id && (
                    <>
                      {user?.token !== '' && (
                        <TouchableOpacity
                          disabled={loadingFollow}
                          onPress={() => {
                            if (!follow) {
                              onFollow();
                            } else {
                              onUnFollow();
                            }
                          }}
                          style={[
                            styles.followButton,
                            {backgroundColor: follow ? 'white' : 'black'},
                          ]}>
                          {loadingFollow ? (
                            <SkypeIndicator
                              color={follow ? 'black' : 'white'}
                            />
                          ) : (
                            <Text
                              style={{
                                fontWeight: '700',
                                color: follow ? 'black' : 'white',
                                fontSize: rfv(13),
                              }}>
                              {follow ? 'FOLLOWING' : 'FOLLOW'}
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </ImageBackground>
            </View>

            {/* <View style={{flexDirection:'row',marginLeft:wp2(4),marginVertical:hp2(1)}}>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'following',followingDataBrand,followingDataEditor})}>
      <Text style={{fontWeight:'bold',color:'black'}}>{followingDataBrand.length+followingDataEditor.length}</Text>
      <Text style={{color:'black'}}> FOLLOWING </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'follower',followerDataBrand,followerDataEditor})}>
      <Text style={{fontWeight:'bold',color:'black'}}>{followerDataBrand.length+followerDataEditor.length}</Text>
      <Text style={{color:'black'}}> FOLLOWERS</Text>
      </TouchableOpacity>
      </View> */}

            <View style={styles.followersContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  props.navigation.navigate('followerList', {
                    list: 'following',
                    id: props?.route?.params?.userData?.userData?.id,
                  })
                }>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {data?.followers_count}
                </Text>
                <Text style={{color: 'black'}}> FOLLOWING </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  props.navigation.navigate('followerList', {
                    list: 'follower',
                    id: props?.route?.params?.userData?.userData?.id,
                  })
                }>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {data?.followings_count}
                </Text>
                <Text style={{color: 'black'}}> FOLLOWERS</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: hp2(12)}}>
              <Text style={styles.favBrandsTxt}>FAVOURITE BRANDS</Text>
             
              {data?.fav_brands?.length!==0?(
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {data?.fav_brands?.map((item,index)=>{
                 return(
                   <BrandComp data={item} key={index} />
                 )
               })}
             </ScrollView>
            ):(
              <View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Favourite Brands Not Available</Text></View>
            )}

              <Wardrobe user={props?.route?.params?.userData} />

              <NextPickup data={data} />
            </ScrollView>

            {/* <BottomComp /> */}
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: COLORS.appBackground,
    marginBottom:Platform.OS==="ios"?hp(-10):0
  },
  editorProfile: {
    width: wp2(100),
    height: hp(32),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    borderBottomLeftRadius: wp2(4),
    borderBottomRightRadius: wp2(4),
    overflow: 'hidden',
  },
  iconWrap: {
    alignSelf: 'flex-end',
    //backgroundColor:'white',
    marginRight: wp2(2),
    marginTop: hp2(1),
  },
  notificationBadge: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2ABA',
    position: 'absolute',
    right: wp2(1),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp2(2),
    position: 'absolute',
    bottom: hp2(1.5),
    width: wp2(100),
  },
  followButton: {
    width: wp2(34),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#162FAC',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favBrandsTxt: {
    fontWeight: '600',
    fontSize: rfv(18),
    color: 'black',
    marginVertical: hp2(2),
    marginLeft: wp2(2),
  },
  usernameTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(22),
  },
  followersContainer: {
    flexDirection: 'row',
    marginLeft: wp2(4),
    marginVertical: hp2(1),
  },
});
