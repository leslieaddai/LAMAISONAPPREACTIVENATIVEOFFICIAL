import React from 'react';
import {
  StyleSheet,
 
  Text,
  
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  
  wp2,
  hp2,
 
} from '../theme';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';

export default function AlertComp(props) {

  return (
    <Animated.View
      entering={FadeInUp.duration(1000)}//
      exiting={FadeOutUp.duration(500)}
      style={styles.errorWrap}>
      <Text style={styles.errorText}>{props.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  errorWrap: {
    width: wp2(80),
    height: hp2(10),
    backgroundColor: '#B00002',
    borderRadius: wp2(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp2(4),
    marginBottom: hp2(2),
    alignSelf: 'center',
  },
  errorText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(13),
    textTransform: 'uppercase',
  },
});
