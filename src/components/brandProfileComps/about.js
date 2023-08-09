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

} from '../../theme';

export default function About(props) {
  return (
    <>
      <Text style={styles.aboutText}>ABOUT</Text>
      

      
      <Text style={styles.aboutDesc}>{props?.data?.about}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  aboutText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(18),
    marginLeft: wp2(3),
    marginBottom: hp2(2),
  },
  aboutDesc: {
    color: 'black',
    marginHorizontal: wp2(3),
    textTransform: 'uppercase',
    textAlign: 'justify',
  },
});
