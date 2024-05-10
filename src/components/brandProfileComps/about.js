import React from 'react';
import {StyleSheet, Text} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {wp2, hp2} from '../../theme';
import fonts from '../../theme/fonts';

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
    fontFamily: fonts.PoppinsMedium,
    paddingHorizontal: 20,

    fontSize: rfv(15),

    color: 'black',
    // marginLeft: wp2(3),
  },
  aboutDesc: {
    color: 'black',
    marginHorizontal: wp2(3),
    textTransform: 'uppercase',
    textAlign: 'justify',
  },
});
