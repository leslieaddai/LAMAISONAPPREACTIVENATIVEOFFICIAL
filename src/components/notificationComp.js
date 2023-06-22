import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../theme/fonts';
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
} from '../theme';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {errorMessage, successMessage} from '../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../config/helperFunction';
import {FollowUrl, UnfollowUrl} from '../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function NotificationComp(props) {
  const navigation = useNavigation();
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [follow, setFollow] = useState(
    props?.allData?.following_id !== null &&
      props?.allData?.follower_id !== null
      ? true
      : false,
  );
  const user = useSelector(state => state.userData);
  //console.log(props);
  //const [followButton,setFollowButton]=useState(false);
  //console.log(props?.user)

  const onFollow = () => {
    setLoadingFollow(true);

    let config = {
      method: 'post',
      url: FollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: {follower_id: user?.userData?.id, following_id: props?.user?.id},
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setFollow(true);
        setLoadingFollow(false);
        successMessage('Done');
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
      data: {follower_id: user?.userData?.id, following_id: props?.user?.id},
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setFollow(false);
        setLoadingFollow(false);
        successMessage('Done');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoadingFollow(false);
        //errorMessage('Something went wrong!');
        errorMessage(errorHandler(error))
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          props?.user?.roles?.[0]?.id === 2
            ? navigation.navigate('editorProfileScreen', {
                userData: {
                  userData: {
                    id: props?.user?.id,
                    profile_image: props?.user?.profile_image?.original_url,
                    username: props?.user?.username,
                  },
                },
              })
            : navigation.navigate('brandProfileScreen', {
                userData: {
                  userData: {
                    id: props?.user?.id,
                    profile_image: props?.user?.profile_image?.original_url,
                    name: props?.user?.name,
                    role: [{id: 3}],
                  },
                },
              })
        }
        style={styles.imgWrap}>
        <Image
          //source={IMAGES.randomProfile}
          //source={{uri: props?.user?.profile_image?.original_url}}
          source={props?.user?.profile_image!==null?{uri: props?.user?.profile_image?.original_url}:IMAGES.profileIcon3}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          width: wp2(props?.type === 'follow' ? 50 : 60),
          paddingHorizontal: wp2(3),
        }}>
        <Text style={{color: 'black', marginBottom: 4}}>
          {props?.type === 'follow'
            ? `${props?.user?.username} started following you`
            : `${props?.user?.username} ${props?.type} your ${props?.product?.name}`}
        </Text>
        <Text style={{color: 'black'}}>{moment(props?.date).fromNow()}</Text>
      </View>
      {props?.type === 'follow' ? (
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
            styles.followBTN,
            {backgroundColor: follow ? 'white' : 'black'},
          ]}>
          {loadingFollow ? (
            <SkypeIndicator color={follow ? 'black' : 'white'} />
          ) : (
            <Text
              style={[styles.followText, {color: follow ? 'black' : 'white'}]}>
              {follow ? 'FOLLOWING' : 'FOLLOW'}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => user?.userData?.role?.[0]?.id!==3?
            navigation.navigate('dressingRoomScreen', {
              data: {product: {id: props?.product?.id}},
            }):navigation.navigate('imageViewScreen')
          }
          style={styles.imgWrap}>
          <Image
            //source={IMAGES.randomProfile}
            source={{
              uri: props?.product?.product_images?.[0]?.image?.[0]
                ?.original_url,
            }}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(92),
    height: hp2(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: hp2(1),
  },
  imgWrap: {
    width: wp2(16),
    height: wp2(18),
    overflow: 'hidden',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  followBTN: {
    width: wp2(28),
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
  followText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(11),
  },
});
