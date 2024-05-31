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
  ImageBackground,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';

import Popular from '../../components/brandProfileComps/popular';
import Lookbook from '../../components/brandProfileComps/lookbook';
import About from '../../components/brandProfileComps/about';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetBrandInfo,
  FollowUrl,
  UnfollowUrl,
  BlockUser,
  UnblockUser,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import SkeletonBrandProfileViewComp from '../../components/SkeletonViewComponents/SkeletonBrandProfileViewComp';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import fonts from '../../theme/fonts';
import {Divider} from 'react-native-paper';
import NothingListedComponnet from './nothingListedComponnet';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
export default function BrandProfileScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const {count} = useSelector(state => state.ordercount);
  const [galleriesImage, setGalleryImage] = useState([]);
  const [blockData, setBlockData] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [follow, setFollow] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        GetBrandInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        if (res?.data?.data?.is_blocked !== null) {
          setBlockData(res?.data?.data?.is_blocked);
          setIsBlocked(true);
        }
        setLoading(false);
        res?.data?.data.galleries.map(item => {
          item.media.map((items, idex) => {
            setGalleryImage(prev => [...prev, {items}]);
          });
        });
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const getBrandData = () => {
    axios
      .get(
        GetBrandInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        if (res?.data?.data?.is_blocked !== null) {
          setBlockData(res?.data?.data?.is_blocked);
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  };

  const onFollow = () => {
    console.log(props?.route?.params?.userData?.userData?.id);
    setLoadingFollow(true);
    let obj = {
      follower_id: user?.userData?.id,
      following_id: props?.route?.params?.userData?.userData?.id,
    };
    let config = {
      method: 'post',
      url: FollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
        getBrandData();
        setFollow(true);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFollow(false);
        errorMessage(errorHandler(error));
      });
  };

  const onUnFollow = () => {
    setLoadingFollow(true);
    let obj = {
      follower_id: user?.userData?.id,
      following_id: props?.route?.params?.userData?.userData?.id,
    };
    let config = {
      method: 'post',
      url: UnfollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
        getBrandData();
        setFollow(false);
        setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFollow(false);

        errorMessage(errorHandler(error));
      });
  };

  const blockUser = () => {
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
        setIsBlocked(true);
        // setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data);

        errorMessage(errorHandler(error));
      });
  };

  const unBlockUser = () => {
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
        errorMessage(errorHandler(error));
      });
  };

  console.log(data?.profile_image?.original_url);
  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.appBackground}}>
      {loading ? (
        <View style={{flex: 1}}>
          <SkeletonBrandProfileViewComp />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: COLORS.appBackground,
            }}></SafeAreaView>

          <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
              <NewHeaderComp
                title={data?.name}
                onlySettings={true}
                width="52%"
                settingNavigation={() =>
                  props.navigation.navigate('settingsScreen', {
                    user: user,
                  })
                }
              />
              {/* <HeaderComponent
                title={data?.name}
                disableback={true}
                customComponent={
                  <TouchableOpacity
                    disabled={user?.token !== '' ? false : true}
                    onPress={() =>
                      props.navigation.navigate('settingsScreen', {
                        user: user,
                      })
                    }
                    style={styles.custom}>
                    <Image
                      source={IMAGES.setting}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                }
              /> */}
              <View
                style={{
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderBottomColor: COLORS.gray300,
                  paddingVertical: 32,
                }}>
                <Image
                  source={
                    imageError ||
                    !data?.profile_image ||
                    data?.profile_image?.original_url == undefined
                      ? IMAGES.profileIcon3
                      : {uri: data?.profile_image?.original_url}
                  }
                  style={{
                    width: 132,
                    height: 132,
                    borderRadius: 999,
                  }}
                />
                <View>
                  <Text style={[styles.usernameTxt]}>{data?.name}</Text>
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
                      <Text style={{color: 'black'}}>Following</Text>
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
                      <Text style={{color: 'black'}}> Followers</Text>
                    </TouchableOpacity>
                  </View>
                  {props?.route?.params?.userData?.userData?.id !==
                  user?.userData?.id ? (
                    <>
                      {user?.token !== '' && !isBlocked && (
                        <TouchableOpacity
                          disabled={loadingFollow}
                          onPress={() => {
                            if (!follow) {
                              onFollow();
                            } else {
                              onUnFollow();
                            }
                          }}
                          style={{
                            backgroundColor: follow
                              ? COLORS.white
                              : COLORS.main,
                            marginTop: 24,
                            width: 201,
                            height: 44,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: COLORS.main,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {loadingFollow ? (
                            <SkypeIndicator
                              color={follow ? 'black' : 'white'}
                            />
                          ) : (
                            <Text
                              style={{
                                fontWeight: follow ? '400' : '700',
                                color: follow ? COLORS.main : COLORS.white,
                                fontSize: rfv(15),
                              }}>
                              {follow ? 'Following' : 'Follow'}
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('editProfile', {
                            user: user,
                          })
                        }
                        style={styles.editButton}>
                        <Text>Edit Profile</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.titleTxt, {paddingLeft: 20}]}>
                  Popular
                </Text>

                {data?.popular_products?.length !== 0 ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{paddingLeft: 20}}>
                    {data?.popular_products?.map((item, index) => {
                      return (
                        <>
                          <Popular key={index} data={item} no={index} />
                        </>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View style={{paddingHorizontal: 20}}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        width: '100%',
                        height: 113,
                        backgroundColor: COLORS.gray100,
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Regular',
                          fontSize: rfv(15),
                          color: COLORS.gray400,
                        }}>
                        Nothing Here Yet
                      </Text>
                    </View>
                  </View>
                )}
                <View style={{paddingHorizontal: 20}}>
                  <Lookbook
                    data={galleriesImage}
                    navigation={props.navigation}
                  />

                  <About data={data} />
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.appBackground,
    paddingBottom: 32,
  },
  usernameTxt: {
    fontWeight: '700',
    fontSize: rfv(22),
    color: 'black',
  },
  followersContainer: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 6,
  },
  editButton: {
    marginTop: 24,
    width: 201,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTxt: {
    fontWeight: '400',
    fontSize: rfv(20),
    color: 'black',
    marginTop: 25,
    marginBottom: 16,
  },
  custom: {
    width: wp2(5),
    height: hp2(2),
    // marginRight: 5,
    overflow: 'hidden',
    // justifyContent: 'flex-end', // Align items to the end of the header
    left: 90,
  },
});
