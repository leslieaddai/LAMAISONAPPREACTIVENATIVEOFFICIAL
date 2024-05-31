import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  Platform,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';

import BrandComp from '../../components/editorProfileComps/brands';
import Wardrobe from '../../components/editorProfileComps/wardrobe';
import NextPickup from '../../components/editorProfileComps/nextPickup';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetEditorInfo,
  FollowUrl,
  UnfollowUrl,
  BlockUser,
  UnblockUser,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import SkeletonEditorProfileComp from '../../components/SkeletonViewComponents/SkeletonEditorProfileComp';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function EditorProfileScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [follow, setFollow] = useState(false);
  const [blockData, setBlockData] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const {count} = useSelector(state => state.ordercount);

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        GetEditorInfo +
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
      })
      .catch(function (error) {
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const getEditorData = () => {
    axios
      .get(
        GetEditorInfo +
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
        //setLoading(false);
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
        getEditorData();
        setFollow(true);
        setLoadingFollow(false);
      })
      .catch(function (error) {
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
        getEditorData();
        setFollow(false);
        setLoadingFollow(false);
      })
      .catch(function (error) {
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
        getEditorData();
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
        getEditorData();
      })
      .catch(function (error) {
        console.log(error.response.data);

        errorMessage(errorHandler(error));
      });
  };

  return (
    <ScrollView style={{height: '100%', backgroundColor: COLORS.appBackground}}>
      {loading ? (
        <View style={{flex: 1}}>
          {/* <SkypeIndicator color={'black'} /> */}
          <SkeletonEditorProfileComp />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={{
              flex: 0,
              backgroundColor: COLORS.appBackground,
            }}></SafeAreaView>

          <View style={styles.container}>
            <NewHeaderComp
              title={data?.name}
              onlySettings={true}
              width="56%"
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
                    <Text style={{color: 'black'}}> Following </Text>
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
                          backgroundColor: follow ? COLORS.white : COLORS.main,
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
                          <SkypeIndicator color={follow ? 'black' : 'white'} />
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
              <Text style={[styles.favBrandsTxt, {paddingLeft: 20}]}>
                Favourite Brands
              </Text>
              {data?.fav_brands?.length !== 0 ? (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 20}}>
                  {data?.fav_brands?.map((item, index) => {
                    return (
                      <>
                        <BrandComp data={item} key={index} />
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
              <View
                style={{
                  paddingHorizontal: 20,
                }}>
                <Text style={styles.favBrandsTxt}>Warderobe</Text>
                <Wardrobe user={props?.route?.params?.userData} />

                {props?.route?.params?.userData?.userData?.id ===
                  user?.userData?.id && (
                  <>
                    <Text style={styles.favBrandsTxt}>Next Pick-Up</Text>
                    <NextPickup data={data} />
                  </>
                )}
              </View>
            </ScrollView>
          </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBrandsTxt: {
    fontWeight: '400',
    fontSize: rfv(20),
    color: 'black',
    marginTop: 25,
    marginBottom: 16,
  },
  usernameTxt: {
    color: COLORS.textMain,
    fontWeight: '700',
    fontSize: rfv(20),
    fontFamily: 'Poppins-Regular',
  },
  followersContainer: {
    marginTop: 6,
    flexDirection: 'row',
    gap: 6,
  },
  blockedtext: {
    color: 'black',
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hp2(20),
    fontSize: rfv(15),
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
  mytxtcont: {
    fontFamily: 'Poppins-Regular',
    fontSize: rfv(15),
    color: COLORS.gray400,
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
