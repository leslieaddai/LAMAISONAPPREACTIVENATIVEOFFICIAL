import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {wp2, hp2} from '../../theme';
import fonts from '../../theme/fonts';

export default function About(props) {
  return (
    <>
      {props?.data?.about ? (
        <View>
          <Text style={styles.aboutText}>About</Text>
          <Text style={styles.aboutDesc}>{props?.data?.about}</Text>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  aboutText: {
    fontWeight: '700',
    fontSize: rfv(20),
    color: 'black',
    marginTop: 55,
    marginBottom: 16,
  },
  aboutDesc: {
    color: 'black',
    fontSize: rfv(14),
  },
});
