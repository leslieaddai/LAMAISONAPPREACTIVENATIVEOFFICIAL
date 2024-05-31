import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, wp2, hp2, COLORS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function FollowComp(props) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const onloading = (value, label) => {
    setLoading(value);
  };

  const [loadingFollow, setLoadingFollow] = useState(false);
  const [follow, setFollow] = useState(true);

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

  const navigateScreen = () => {
    if (props?.list === 'follower') {
      if (props?.data?.item?.followers?.roles[0]?.id === 3) {
        navigation.navigate('brandProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.item?.followers?.id,
              profile_image:
                props?.data?.item?.followers?.profile_image?.original_url,
              name: props?.data?.item?.followers?.name,
              role: [{id: 3}],
            },
          },
        });
      } else {
        navigation.navigate('editorProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.item?.followers?.id,
              profile_image:
                props?.data?.item?.followers?.profile_image?.original_url,
              username: props?.data?.item?.followers?.username,
            },
          },
        });
      }
    } else {
      if (props?.data?.item?.followings?.roles[0]?.id === 3) {
        navigation.navigate('brandProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.item?.followings?.id,
              profile_image:
                props?.data?.item?.followings?.profile_image?.original_url,
              name: props?.data?.item?.followings?.name,
              role: [{id: 3}],
            },
          },
        });
      } else {
        navigation.navigate('editorProfileScreen', {
          userData: {
            userData: {
              id: props?.data?.item?.followings?.id,
              profile_image:
                props?.data?.item?.followings?.profile_image?.original_url,
              username: props?.data?.item?.followings?.username,
            },
          },
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={navigateScreen} style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <View style={styles.imageContainer}>
          {loading ? (
            <SkeletonPlaceholder borderRadius={4} alignItems="center">
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
            source={
              props?.data?.item?.followers?.profile_image !== null &&
              props?.data?.item?.followings?.profile_image !== null
                ? {
                    uri:
                      props?.list === 'follower'
                        ? props?.data?.item?.followers?.profile_image
                            ?.original_url
                        : props?.data?.item?.followings?.profile_image
                            ?.original_url,
                  }
                : IMAGES.profileIcon3
            }
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text}>
          {props?.list === 'follower'
            ? props?.data?.item?.followers?.roles[0]?.id === 3
              ? props?.data?.item?.followers?.name
              : props?.data?.item?.followers?.username
            : props?.data?.item?.followings?.roles[0]?.id === 3
            ? props?.data?.item?.followings?.name
            : props?.data?.item?.followings?.username}
        </Text>
      </View>
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
          width: follow ? 120 : 100,
          height: 42,
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gray50,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    padding: 5,
    paddingRight: 14,
  },
  imageContainer: {
    width: 62,
    height: 62,
  },
  text: {
    color: 'black',
    fontSize: rfv(14),
    fontWeight: '400',
  },
  skeletonView: {
    width: wp2(28),
    height: hp2(18),
  },
});
