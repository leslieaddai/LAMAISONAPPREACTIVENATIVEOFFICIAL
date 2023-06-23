import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';

export default function FollowComp(props) {
  const navigation = useNavigation();
  //console.log(props?.data)
  //console.log(props?.list)

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
      <View style={styles.imageContainer}>
        <Image
          //source={IMAGES.lookbook}
          source={props?.data?.item?.followers?.profile_image!==null && props?.data?.item?.followings?.profile_image!==null ?{
            uri:
              props?.list === 'follower'
                ? props?.data?.item?.followers?.profile_image?.original_url
                : props?.data?.item?.followings?.profile_image?.original_url,
          }:IMAGES.profileIcon3}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.text}>
        {props?.list === 'follower'
          ? props?.data?.item?.followers?.username
          : props?.data?.item?.followings?.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: wp2(2),
    width: wp2(28),
    marginHorizontal: wp2(2),
    marginVertical: hp2(2),

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
    width: wp2(28),
    height: hp2(18),
    overflow: 'hidden',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: rfv(11),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
