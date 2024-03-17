import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,

  ScrollView,
  Platform,
  SafeAreaView,
  ImageBackground,
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

import Popular from '../../components/brandProfileComps/popular';
import Lookbook from '../../components/brandProfileComps/lookbook';
import About from '../../components/brandProfileComps/about';

import { errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import {
  GetBrandInfo,

  FollowUrl,
  UnfollowUrl,
  BlockUser,
  UnblockUser,

} from '../../config/Urls';
import { useDispatch, useSelector } from 'react-redux';

import { SkypeIndicator } from 'react-native-indicators';
import SkeletonBrandProfileViewComp from '../../components/SkeletonViewComponents/SkeletonBrandProfileViewComp';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
export default function BrandProfileScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const { count } = useSelector(state => state.ordercount)
  const [galleriesImage, setGalleryImage] = useState([])
  const [blockData,setBlockData] = useState(null)
  const [isBlocked,setIsBlocked] = useState(false)
  const [follow, setFollow] = useState(false);


  useEffect(() => {
    setLoading(true);
    axios
      .get(
        GetBrandInfo +
        `${props?.route?.params?.userData?.userData?.id}/viewer/${user?.token !== '' && user?.userData?.id
        }`,
      )
      .then(async function (res) {
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        if(res?.data?.data?.is_blocked !== null){
          setBlockData(res?.data?.data?.is_blocked)
          setIsBlocked(true)
        }
        setLoading(false);
        res?.data?.data.galleries.map((item)=>{
          item.media.map((items,idex)=>{
            setGalleryImage((prev)=>[...prev,{items}])
          })
        })
      })
      .catch(function (error) {

        setLoading(false);

        errorMessage(errorHandler(error))
      });
  }, []);

  const getBrandData = () => {

    axios
      .get(
        GetBrandInfo +
        `${props?.route?.params?.userData?.userData?.id}/viewer/${user?.token !== '' && user?.userData?.id
        }`,
      )
      .then(async function (res) {

        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        if(res?.data?.data?.is_blocked !== null){
          setBlockData(res?.data?.data?.is_blocked)
          setIsBlocked(true)
        }else{
          setIsBlocked(false)
        }
      })
      .catch(function (error) {

        setLoading(false);

        errorMessage(errorHandler(error))
      });
  };

  const onFollow = () => {
    console.log(props?.route?.params?.userData?.userData?.id)
    setLoadingFollow(true);
    let obj = {
      follower_id: user?.userData?.id,
      following_id: props?.route?.params?.userData?.userData?.id
      }
    let config = {
      method: 'post',
      url: FollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj
    };

    axios.request(config)
      .then(async function (res) {

        getBrandData();
        setFollow(true);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data)

        setLoadingFollow(false);

        errorMessage(errorHandler(error))
      });
  };

  const onUnFollow = () => {
    setLoadingFollow(true);
    let obj = {
      follower_id: user?.userData?.id,
      following_id: props?.route?.params?.userData?.userData?.id
    }
    let config = {
      method: 'post',
      url: UnfollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj
    };

    axios
      .request(config)
      .then(async function (res) {

        getBrandData();
        setFollow(false);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data)
        setLoadingFollow(false);

        errorMessage(errorHandler(error))
      });
  };

  const blockUser = () =>{
    // setLoadingFollow(true);
    let config = {
      method: 'post',
      url: BlockUser + props?.route?.params?.userData?.userData?.id,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        getBrandData();
        setIsBlocked(true)
        // setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data)

        errorMessage(errorHandler(error))
      });
  }

  const unBlockUser = () =>{
    let config = {
      method: 'post',
      url: UnblockUser + props?.route?.params?.userData?.userData?.id,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(async function (res) {

        getBrandData();
        // setFollow(false);
        // setLoadingFollow(false);
      })
      .catch(function (error) {

        errorMessage(errorHandler(error))
      });
  }

console.log(data?.profile_image?.original_url);
  return (
    <ScrollView>
      {loading ? (
        <View style={{ flex: 1 }}>
          <SkeletonBrandProfileViewComp />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={{ flex: 0, backgroundColor: COLORS.appBackground }}></SafeAreaView>

          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View style={styles.brandLogo}>
                <ImageBackground

                  source={data?.profile_image !== null ? { uri: data?.profile_image?.original_url } : IMAGES.profileIcon3}
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                  resizeMode="contain">
                  <View style={styles.iconWrap}>
                    {data?.is_fts && (
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate('FTS100')}
                        style={styles.badge}>
                        <Image
                          source={IMAGES.badge}
                          style={{ width: '100%', height: '100%' }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    )}
                    {props?.route?.params?.userData?.userData?.id ===
                      user?.userData?.id ? (
                      <TouchableOpacity
                        style={{ position: 'absolute', right: wp2(4) }}
                        onPress={() =>
                          props.navigation.navigate('settingsScreen', {
                            user: user,
                          })
                        }>
                        <ICONS.Ionicons
                          name="menu-outline"
                          size={44}
                          color="black"
                        />{
                          count > 0 &&
                          <View style={styles.notificationBadge}>
                            <Text style={{ color: 'white', fontSize: rfv(10) }}>{count}</Text>
                          </View>
                        }
                      </TouchableOpacity>
                    ) :
                        blockData?.blocked_user_id !== user?.userData?.id &&
                          (
                          <TouchableOpacity style={[
                          styles.followButton,
                          { backgroundColor: isBlocked ? 'white' : 'white',
                          position: 'absolute', 
                          right: wp2(4) },
                        ]}
                        onPress={() => {
                          if (isBlocked) {
                            unBlockUser();
                          } else {
                            blockUser();
                          }
                        }}
                        >
                          <Text style={{
                            fontWeight: '500',
                            color: isBlocked? 'black' : 'black',
                            fontSize: rfv(13),
                          }}>{isBlocked ? 'Unblock User' : 'Block User'}</Text>

                        </TouchableOpacity>
                        )
                    }
                  </View>

                  <View style={styles.usernameContainer}>

                    <Text style={styles.usernameTxt}>{data?.name}</Text>
                    {props?.route?.params?.userData?.userData?.id !==
                      user?.userData?.id && (
                        <>
                          {user?.token !== '' &&  !isBlocked &&(
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
                                  { backgroundColor: follow ? 'white' : 'black' },
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
              {
                isBlocked? 
                <Text style ={styles.blockedtext}>
                  {blockData?.blocked_user_id === user?.userData?.id ? 'This user blocked you' : 'You blocked this user'}
                </Text>
                :
              
              <>
              <View style={styles.followersContainer}>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    props.navigation.navigate('followerList', {
                      list: 'following',
                      id: props?.route?.params?.userData?.userData?.id,
                    })
                  }>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>
                    {data?.followers_count}
                  </Text>
                  <Text style={{ color: 'black' }}> FOLLOWING </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    props.navigation.navigate('followerList', {
                      list: 'follower',
                      id: props?.route?.params?.userData?.userData?.id,
                    })
                  }>
                  <Text style={{ fontWeight: 'bold', color: 'black' }}>
                    {data?.followings_count}
                  </Text>
                  <Text style={{ color: 'black' }}> FOLLOWERS</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: hp2(2) }}>
                <Text style={styles.popularTxt}>POPULAR</Text>
                {data?.popular_products?.length !== 0 ? data?.popular_products?.map((item, index) => {

                  return <Popular key={index} data={item} no={index} />;
                }) : <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, }}><Text>Popular Products Not Added Yet</Text></View>}



                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('lookbookScreen', {
                      userData: props?.route?.params?.userData,
                    })
                  }
                  style={styles.lookbook}>
                  <Text style={styles.lookbookTxt}>LOOKBOOK</Text>
                </TouchableOpacity>

                <>
                  <Lookbook data={galleriesImage} />
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('galleryScreen', { data: galleriesImage })
                    }
                    style={styles.gallery}>
                    <Text style={styles.galleryTxt}>GALLERY</Text>
                  </TouchableOpacity>
                </>

                <About data={data} />
              </ScrollView>
              </>
}
            </View>
          </SafeAreaView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  iconWrap: {
    flexDirection: 'row',
    paddingHorizontal: wp2(4),

    marginTop: hp2(1),
  },
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
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
  brandLogo: {
    width: wp2(100),
    height: hp2(32),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    overflow: 'hidden',
  },
  followButton: {
    width: wp2(30),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
  lookbook: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
  usernameContainer: {
    marginBottom: hp2(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp2(4),
    alignItems: 'center',
  },
  usernameTxt: {
    fontWeight: '700',
    fontSize: rfv(22),
    color: 'black',
  },
  followersContainer: {
    flexDirection: 'row',
    marginLeft: wp2(4),
    marginBottom: hp2(2),
  },
  popularTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(18),
    marginLeft: wp2(3),
  },
  lookbookTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  galleryTxt: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  blockedtext:{
    color: 'black',
    fontWeight: '700',
    alignSelf:'center',
    marginTop:hp2(20),
    fontSize: rfv(15),
  }
});
