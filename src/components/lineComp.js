import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {wp2, hp2} from '../theme';

export default function LineComp(props) {
  return (
    <View style={styles.lineWrap}>
      <View style={styles.line}></View>
      <Text style={{color: 'black'}}>{props?.date}</Text>
      <View
        style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  lineWrap: {
    flexDirection: 'row',

    height: hp2(2),
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  line: {
    width: '36%',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: '#D9D9D9',
  },
});
