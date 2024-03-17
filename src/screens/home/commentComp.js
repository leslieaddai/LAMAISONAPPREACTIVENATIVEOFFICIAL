import React from 'react';
import {
  StyleSheet,
  View,
  Image,

  Text,
  Platform,

} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,
  
  wp2,
  hp2,
 
} from '../../theme';

export default function CommentComp(props) {
  console.log('test prop');
  console.log(props?.data?.user?.profile_image);
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={props?.data?.user?.profile_image == null?IMAGES.profileIcon3:
          {uri:typeof(props?.data?.user?.profile_image)==='string'?
          props?.data?.user?.profile_image:
          props?.data?.user?.profile_image?.original_url
        }}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View>
        <View style={styles.messageBox}>
          <Text style={[styles.text, {fontSize: rfv(13)}]}>{props?.data?.comment}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(90),
 
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp2(1),
  },
  imageWrap: {
    width: wp2(18),
    height: wp2(18),
    borderRadius: wp2(4),
    overflow: 'hidden',
    backgroundColor:'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(12),
  },
  messageBox: {
    width: wp2(70),

    borderRadius: wp2(2),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: wp2(3),
    paddingVertical: wp2(3),
  },
});
