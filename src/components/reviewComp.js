import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, wp2, hp2} from '../theme';

export default function ReviewComp(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={
            props?.data?.user?.profile_image !== null
              ? {uri: props?.data?.user?.profile_image?.original_url}
              : IMAGES.profileIcon3
          }
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          backgroundColor: '#F6F6F6',
          padding: 15,
          maxWidth: 304,
          borderRadius: 10,
        }}>
        <Text style={styles.text}>Reaction: {props?.data?.feeling}</Text>
        <View
          style={{borderWidth: 1, marginVertical: 10, borderColor: '#D9D9D9'}}
        />
        <View>
          <Text style={[styles.text, {fontSize: rfv(13)}]}>
            {props?.data?.description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(90),
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrap: {
    width: wp2(18),
    height: wp2(18),
    borderRadius: wp2(4),
    overflow: 'hidden',
  },
  text: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
  },
  messageBox: {
    width: wp2(70),
    minHeight: hp2(8),
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
