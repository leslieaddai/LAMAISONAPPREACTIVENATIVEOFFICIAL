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

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';

import {errorMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {OneSignalMessage, errorHandler} from '../../config/helperFunction';
import {Popular, Newsfeed, getCount} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import OneSignal from 'react-native-onesignal';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SkeletonViewMainComp from '../../components/SkeletonViewComponents/SkeletonViewMainComp';
import LoaderComp from '../../components/loaderComp';
import ImageCompWithError from './ImageCompWithError';
import ImageCompWithErrorProfile from '../../components/FTS100Comps/ImageCompWithErrorProfile';
import fonts from '../../theme/fonts';
import HeaderComponent from '../auth/componnets/HeaderComponnet';
import LogoComponent from '../auth/componnets/LogoComponent';
import SmallLogoComponnet from '../welcome/smallLogoComp';
import {Divider} from 'react-native-paper';
import LamaisonBar from './lamaisonHomebarComponnet';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';
import Logo from '../../assets/icons/logo.svg';

export default function HomeScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [popularData, setPopularData] = useState([]);
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);
  const [loadingImage, setLoadingImage] = useState(false);
  const [postcomloading, setPostcomploading] = useState(false);
  const [productcomploading, setProductcomploading] = useState(false);
  const [prod2comploading, setProd2comploading] = useState(false);
  let data = [{}, {}, {}, {}];
  OneSignal.setExternalUserId(String(user.userData.id));

  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );

      let notification = notificationReceivedEvent.getNotification();
      if (Platform.OS === 'android') {
        OneSignalMessage('La Maison', notification.body);
      }
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      notificationReceivedEvent.complete(notification);
    },
  );

  OneSignal.setNotificationOpenedHandler(notification => {
    console.log('OneSignal: notification opened:', notification);
    if (notification) {
      const {additionalData = null} = notification.notification;
      console.log('additionalData', additionalData);
      if (additionalData != null) {
        if (additionalData.order === 'less_than_20') {
          props.navigation.navigate('inventory');
        } else {
          props.navigation.navigate('orderTrackingScreen');
        }
      } else {
        props.navigation.navigate('notificationScreen');
      }
    }
  });

  useEffect(() => {
    user?.token !== null &&
      user?.userData?.role?.[0]?.id === 3 &&
      getbrandOrderCount();
  }, []);

  const getbrandOrderCount = () => {
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
        errorMessage(errorHandler(error));
      });
  };

  useEffect(() => {
    setLoading(true);

    axios
      .get(Popular, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        setPopularData(res?.data?.data);
        user?.token !== '' ? getNewsfeed('1') : setLoading(false);
      })
      .catch(function (error) {
        console.log('res home', error.response.data);
        setLoading(false);

        errorMessage(errorHandler(error));
      });
  }, []);

  const getNewsfeed = page_no => {
    !loading && setLoading(true);
    axios
      .get(Newsfeed + page_no, {
        headers: {Authorization: `Bearer ${user?.token}`},
      })
      .then(async function (res) {
        dispatch({
          type: types.Warning,
          payload: res?.data?.data,
        });
        if (res?.data?.data?.shared_products.length !== 0) {
          setFeedData(prev => [...prev, ...res?.data?.data?.shared_products]);
        }
        if (res.data.data?.ownNewsfeed.length !== 0) {
          setFeedData(prev => [...prev, ...res.data.data?.ownNewsfeed]);
        }
        setFeedData(prev => [...prev, ...res?.data?.data?.newsfeed?.data]);
        setPage(res?.data?.data?.newsfeed?.next_page_url);
        setPageNo(res?.data?.data?.newsfeed?.current_page);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        if (error.response.data.message === 'Unauthenticated.') {
          dispatch({
            type: types.Clearcart,
          });
          dispatch({
            type: types.Logout,
          });
          OneSignal.removeExternalUserId();
        }
        errorMessage(errorHandler(error));
      });
  };

  const BrandComponent = data => {
    return (
      <View style={{height: 118, width: 118}}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('brandProfileScreen', {
              userData: {
                userData: {
                  id: data?.brand?.id,
                  profile_image: data?.brand?.profile_image?.original_url,
                  name: data?.brand?.name,
                  role: [{id: 3}],
                },
              },
            })
          }>
          <ImageCompWithErrorProfile
            uri={data?.brand?.profile_image?.original_url}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const brandComp = data => {
    return (
      <View
        style={{
          marginVertical: hp2(2),
          paddingHorizontal: 20,
          height: 118,
          width: 118,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('brandProfileScreen', {
              userData: {
                userData: {
                  id: data?.brand?.id,
                  profile_image: data?.brand?.profile_image?.original_url,
                  name: data?.brand?.name,
                  role: [{id: 3}],
                },
              },
            })
          }
          style={styles.brandImage}>
          <ImageCompWithErrorProfile
            uri={data?.brand?.profile_image?.original_url}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const colorComp = data => {
    return (
      <TouchableOpacity
        onPress={() =>
          user?.userData?.role?.[0]?.id !== 3
            ? props?.navigation.navigate('dressingRoomScreen', {
                data: {
                  product: {id: data?.product?.product_images[0]?.product_id},
                },
              })
            : props.navigation.navigate('imageViewScreen', {
                item: data?.product?.product_images,
              })
        }>
        <View style={styles.brandImage}>
          <ImageCompWithError
            uri={data.product.product_images[0]?.image[0]?.original_url || null}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const pieceComp = data => {
    return (
      <TouchableOpacity
        onPress={() =>
          user?.userData?.role?.[0]?.id !== 3
            ? props?.navigation.navigate('dressingRoomScreen', {
                data: {
                  product: {id: data?.product?.product_images[0]?.product_id},
                },
              })
            : props.navigation.navigate('imageViewScreen', {
                item: data?.product?.product_images,
              })
        }>
        <View style={styles.brandImage}>
          <ImageCompWithErrorProfile
            uri={
              data.product?.product_images[0]?.image[0]?.original_url ?? null
            }
          />
        </View>
      </TouchableOpacity>
    );
  };

  const postComp = data => {
    const onloading = (value, label) => {
      setPostcomploading(value);
    };
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => {
              console.log('post comp', data.user.roles[0].id);
              {
                data.user.roles[0].id == 3
                  ? props.navigation.navigate('brandProfileScreen', {
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
                  : props.navigation.navigate('editorProfileScreen', {
                      userData: {
                        userData: {
                          id: data.user.id,
                          profile_image:
                            data?.user?.profile_image?.original_url,
                          name: data?.user?.name,
                          role: [{id: 2}],
                        },
                      },
                    });
              }
            }}
            style={styles.imageWrap}>
            <Image
              source={
                data?.user?.profile_image == null
                  ? IMAGES.profileIcon3
                  : {uri: data.user?.profile_image?.original_url}
              }
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {data.is_shared && (
            <>
              <ICONS.FontAwesome
                name="retweet"
                size={24}
                color={'black'}
                style={{marginHorizontal: wp2(4)}}
              />
              <Text style={{color: 'black'}}>{data?.user?.name}</Text>
            </>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('imageViewScreen', {
              item: [
                {
                  image: [
                    {
                      original_url:
                        data?.product_images?.[0]?.image?.[0]?.original_url,
                    },
                  ],
                },
              ],
            })
          }
          style={styles.imageContainer}>
          {postcomloading ? (
            <SkeletonPlaceholder
              borderRadius={4}
              alignItems="center"
              backgroundColor="#dddddd">
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.skeletonView} />
              </View>
            </SkeletonPlaceholder>
          ) : undefined}
          <Image
            progressiveRenderingEnabled={true}
            onLoadStart={() => {
              onloading(true, 'onLoadStart');
            }}
            onLoad={() => onloading(false, 'onLoad')}
            onLoadEnd={() => {
              onloading(false, 'onLoadEnd');
            }}
            source={{uri: data?.product_images?.[0]?.image?.[0]?.original_url}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const productComp = data => {
    const onloading = (value, label) => {
      setProductcomploading(value);
    };

    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => {
              console.log('====================================');
              console.log('second here', data.user.roles[0].id);
              console.log('====================================');
              {
                data.user.roles[0].id == 3
                  ? props.navigation.navigate('brandProfileScreen', {
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
                  : props.navigation.navigate('editorProfileScreen', {
                      userData: {
                        userData: {
                          id: data.user.id,
                          profile_image:
                            data?.user?.profile_image?.original_url,
                          name: data?.user?.name,
                          role: [{id: 2}],
                        },
                      },
                    });
              }
            }}
            style={[styles.imageWrap]}>
            <Image
              source={
                data?.user?.profile_image == null
                  ? IMAGES.profileIcon3
                  : {uri: data.user?.profile_image?.original_url}
              }
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {data.is_shared && (
            <>
              <ICONS.FontAwesome
                name="retweet"
                size={24}
                color={'black'}
                style={{marginHorizontal: wp2(4)}}
              />
              <Text style={{color: 'black'}}>{data?.user?.name}</Text>
            </>
          )}
        </View>

        <View style={styles.productContainer}>
          {data?.product_images?.[0]?.image?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate('imageViewScreen', {
                    item: [{image: [{original_url: item?.original_url}]}],
                  })
                }
                style={styles.productImageContainer}>
                {productcomploading ? (
                  <SkeletonPlaceholder
                    borderRadius={4}
                    alignItems="center"
                    backgroundColor="#dddddd">
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.productskeletonView} />
                    </View>
                  </SkeletonPlaceholder>
                ) : undefined}
                <Image
                  progressiveRenderingEnabled={true}
                  onLoadStart={() => {
                    onloading(true, 'onLoadStart');
                  }}
                  onLoad={() => onloading(false, 'onLoad')}
                  onLoadEnd={() => {
                    onloading(false, 'onLoadEnd');
                  }}
                  source={{uri: item?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const productComp2 = data => {
    const onloading = (value, label) => {
      setProd2comploading(value);
    };
    return (
      <View style={{marginVertical: hp2(2)}}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => {
              console.log('====================================');
              console.log('third here', data.user.roles[0].id);
              console.log('====================================');
              {
                data.user.roles[0].id == 3
                  ? props.navigation.navigate('brandProfileScreen', {
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
                  : props.navigation.navigate('editorProfileScreen', {
                      userData: {
                        userData: {
                          id: data.user.id,
                          profile_image:
                            data?.user?.profile_image?.original_url,
                          name: data?.user?.name,
                          role: [{id: 2}],
                        },
                      },
                    });
              }
            }}
            style={[styles.imageWrap]}>
            <Image
              source={
                data?.user?.profile_image == null
                  ? IMAGES.profileIcon3
                  : {uri: data.user?.profile_image?.original_url}
              }
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {data.is_shared && (
            <>
              <ICONS.FontAwesome
                name="retweet"
                size={24}
                color={'black'}
                style={{marginHorizontal: wp2(4)}}
              />
              <Text style={{color: 'black'}}>{data?.user?.name}</Text>
            </>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: wp2(100),
            justifyContent: 'space-between',
          }}>
          {data?.product_images?.[0]?.image?.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.navigation.navigate('imageViewScreen', {
                    item: [{image: [{original_url: item?.original_url}]}],
                  })
                }
                style={styles.productImageContainer2}>
                {prod2comploading ? (
                  <SkeletonPlaceholder
                    borderRadius={4}
                    alignItems="center"
                    backgroundColor="#dddddd">
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.productskeletonView2} />
                    </View>
                  </SkeletonPlaceholder>
                ) : undefined}
                <Image
                  progressiveRenderingEnabled={true}
                  onLoadStart={() => {
                    onloading(true, 'onLoadStart');
                  }}
                  onLoad={() => onloading(false, 'onLoad')}
                  onLoadEnd={() => {
                    onloading(false, 'onLoadEnd');
                  }}
                  source={{uri: item?.original_url}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NewHeaderComp
        settingNavigation={() =>
          props.navigation.navigate('settingsScreen', {
            user: user,
          })
        }
        onlySettings={true}
        title={'Home'}
      />

      {/* <HeaderComponent
        mystyle={{marginTop: 10}}
        title={'Home'}
        disableback={true}
        customComponent={
          <TouchableOpacity
            disabled={user?.token !== '' ? false : true}
            onPress={() => props.navigation.navigate('settingsScreen')}
            style={styles.custom}>
            <Image
              source={IMAGES.setting}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        }
      /> */}
      <View style={{marginTop: 15}}>
        <LamaisonBar navigation={props.navigation} user={user} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 50,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Logo width={117} height={85} />
          <View
            style={{
              flexDirection: 'column',
              gap: 5,
              marginTop: 40,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                fontFamily: 'Poppins-SemiBold',
              }}>
              Welcome to La Maison App
            </Text>
            <Text
              style={{
                color: '#A1A1AA',
                fontSize: 16,
                fontWeight: 400,
                fontFamily: 'Poppins-Regular',
              }}>
              Start exploring your favourite items!
            </Text>
          </View>
        </View>
        {user?.token !== '' ? (
          <>
            {loading && feedData?.length === 0 && (
              <FlatList
                data={data}
                renderItem={() => {
                  return <SkeletonViewMainComp nametag={true} />;
                }}
              />
            )}

            {!loading && feedData?.length === 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: hp2(2)}}>
                <View
                  style={{
                    alignItems: 'center', // Align items vertically in the center
                    justifyContent: 'center', // Align items horizontally to the start
                  }}>
                  <SmallLogoComponnet
                    mysyles={{
                      marginTop: 50,
                    }}
                    height={100}
                    width={140}></SmallLogoComponnet>
                  <Text style={styles.textBig}>Welcome to La Maison App</Text>
                  <Text style={styles.textsmall}>Welcome to La Maison App</Text>
                </View>
                <Divider style={{marginTop: 40, marginBottom: 10}}></Divider>
                <Text style={styles.textpop}>Popular Brands</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {popularData?.brands?.map((item, index) => {
                    return <>{brandComp(item)}</>;
                  })}
                </ScrollView>

                <Text style={styles.textpop}>Popular Pieces</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {popularData?.pieces?.map((item, index) => {
                    return <>{pieceComp(item)}</>;
                  })}
                </ScrollView>

                <Text style={styles.textpop}>Popular Colour</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {popularData?.colors?.map((item, index) => {
                    return <>{colorComp(item)}</>;
                  })}
                </ScrollView>
              </ScrollView>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={feedData}
                onEndReached={() =>
                  !loading && page !== null && getNewsfeed(String(pageNo + 1))
                }
                onEndReachedThreshold={0.1}
                renderItem={({item, index}) => {
                  if (feedData?.length === 1) {
                    return (
                      <>
                        {item?.product_images?.[0]?.image?.length === 1
                          ? postComp(item)
                          : item?.product_images?.[0]?.image?.length === 2
                          ? productComp2(item)
                          : productComp(item)}

                        <Text style={styles.text}>Popular Brands</Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {popularData?.brands?.map((item, index) => {
                            return <>{brandComp(item)}</>;
                          })}
                        </ScrollView>

                        <Text style={styles.text}>Popular Pieces</Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {popularData?.pieces?.map((item, index) => {
                            return <>{pieceComp(item)}</>;
                          })}
                        </ScrollView>

                        <Text style={styles.text}>Popular Colour</Text>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          {popularData?.colors?.map((item, index) => {
                            return <>{colorComp(item)}</>;
                          })}
                        </ScrollView>
                      </>
                    );
                  } else if (feedData?.length === 2) {
                    return (
                      <>
                        {item?.product_images?.[0]?.image?.length === 1
                          ? postComp(item)
                          : item?.product_images?.[0]?.image?.length === 2
                          ? productComp2(item)
                          : productComp(item)}
                        {index === 0 && (
                          <>
                            <Text style={styles.text}>Popular Brands</Text>
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}>
                              {popularData?.brands?.map((item, index) => {
                                return <>{brandComp(item)}</>;
                              })}
                            </ScrollView>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <Text style={styles.text}>Popular Pieces</Text>
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}>
                              {popularData?.pieces?.map((item, index) => {
                                return <>{pieceComp(item)}</>;
                              })}
                            </ScrollView>

                            <Text style={styles.text}>Popular Colour</Text>
                            <ScrollView
                              horizontal
                              showsHorizontalScrollIndicator={false}>
                              {popularData?.colors?.map((item, index) => {
                                return <>{colorComp(item)}</>;
                              })}
                            </ScrollView>
                          </>
                        )}
                      </>
                    );
                  } else if (feedData?.length >= 3) {
                    return (
                      <>
                        {/* {item?.product_images?.[0]?.image?.length === 1
                        ? postComp(item)
                        : item?.product_images?.[0]?.image?.length === 2
                        ? productComp2(item)
                        : productComp(item)} */}
                        {index === 0 && (
                          <View
                            style={{
                              marginTop: 40,
                              marginBottom: 20,
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderTopWidth: 1,
                              borderColor: '#00000010',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                paddingVertical: 30,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Popular Brands
                            </Text>
                            <View
                              style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: 10,
                              }}>
                              {popularData?.brands?.map((item, index) => {
                                return <>{BrandComponent(item)}</>;
                              })}
                            </View>
                          </View>
                        )}
                        {index === 1 && (
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderTopWidth: 1,
                              borderColor: '#00000010',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                paddingVertical: 30,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Popular Pieces
                            </Text>
                            <View
                              style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: 10,
                                marginBottom: 20,
                              }}>
                              {popularData?.pieces?.map((item, index) => {
                                return <>{pieceComp(item)}</>;
                              })}
                            </View>
                          </View>
                        )}
                        {index === 2 && (
                          <View
                            style={{
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderTopWidth: 1,
                              borderColor: '#00000010',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                paddingVertical: 30,
                                fontFamily: 'Poppins-Regular',
                              }}>
                              Popular Colour
                            </Text>
                            <View
                              style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                gap: 10,
                                marginBottom: 20,
                              }}>
                              {popularData?.colors?.map((item, index) => {
                                return <>{colorComp(item)}</>;
                              })}
                            </View>
                          </View>
                        )}
                      </>
                    );
                  }
                }}
              />
            )}

            {loading && feedData?.length !== 0 && (
              <View
                style={{
                  width: wp2(2),
                  height: hp2(2),
                  marginVertical: hp2(2),
                }}>
                <LoaderComp bg={true} />
              </View>
            )}
          </>
        ) : (
          <>
            {loading ? (
              <FlatList
                data={data}
                renderItem={() => {
                  return <SkeletonViewMainComp nametag={true} />;
                }}
              />
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: hp2(2)}}>
                <View
                  style={{
                    borderColor: '#00000010',
                    borderWidth: 1,
                    marginBottom: 20,
                    marginTop: 40,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <Text style={styles.text}>Popular Brands</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularData?.brands?.map((item, index) => {
                      return <View key={index}>{BrandComponent(item)}</View>;
                    })}
                  </ScrollView>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <Text style={styles.text}>Popular Pieces</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularData?.pieces?.map((item, index) => {
                      return <View key={index}>{pieceComp(item)}</View>;
                    })}
                  </ScrollView>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 40,
                  }}>
                  <Text style={styles.text}>Popular Colour</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {popularData?.colors?.map((item, index) => {
                      return <View key={index}>{colorComp(item)}</View>;
                    })}
                  </ScrollView>
                </View>
              </ScrollView>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textBig: {
    textAlign: 'center', // Center text within the container
    fontFamily: 'Poppins-SemiBold',
    marginVertical: 10,
    fontSize: rfv(20),
    color: 'black',
  },
  textpop: {
    textAlign: 'center', // Center text within the container
    fontFamily: fonts.PoppinsMedium,
    marginVertical: 10,
    fontSize: rfv(15),
    color: 'black',
  },
  textsmall: {
    textAlign: 'center', // Center text within the container
    fontFamily: 'Poppins-Regular',
    // marginVertical:10,
    fontSize: rfv(16),
    color: '#A1A1AA',
  },
  containerla: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Grey background color
    borderRadius: 10, // Adjust the borderRadius value as needed
    // padding: 10, // Add padding for better spacing
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
    paddingVertical: 25,
    paddingHorizontal: 50,
    // marginHorizontal:20,
    marginRight: 20,
  },
  textla: {
    textAlign: 'center', // Center text within the container
    fontFamily: fonts.PoppinsRegular,
    fontSize: rfv(13),
  },
  lamasionCont: {
    paddingVertical: 10,
    marginHorizontal: 0,
    // top: 90,
    // left: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'center', // Align items horizontally to the start
  },
  mycontainer: {
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'center', // Align items horizontally to the start

    paddingVertical: 10,
    marginHorizontal: 20,
    // paddingBottom:30,
    // marginTop:100,
    // marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)', // Set border color to black with 50% opacity
  },
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
  custom: {
    width: wp2(5),
    height: hp2(2),
    // marginRight: 5,
    overflow: 'hidden',
    // justifyContent: 'flex-end', // Align items to the end of the header
    left: 90,
  },
  iconWrap: {
    width: wp2(12),
    height: hp2(8),
    marginRight: 5,
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
    backgroundColor: Platform.OS == 'android' && 'white',
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

    marginTop: hp2(1),
  },
  skeletonView: {
    width: wp2(100),
    height: hp2(30),
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: rfv(16),
    color: '#000000',
    marginTop: hp2(2),
    marginBottom: hp2(5),
  },
  brandImage: {
    width: 118,
    height: 118,
    overflow: 'hidden',
    backgroundColor: Platform.OS == 'android' && 'white',
    marginHorizontal: wp2(1),
    borderRadius: 15,
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
  productskeletonView: {
    width: wp2(47),
    height: hp2(18),
  },
  productImageContainer2: {
    width: wp2(48),
    height: hp2(32),
    overflow: 'hidden',

    marginTop: hp2(1),
  },
  productskeletonView2: {
    width: wp2(48),
    height: hp2(32),
  },
});
