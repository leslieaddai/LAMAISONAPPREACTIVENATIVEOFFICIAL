import React from 'react';
import {
  StyleSheet,
  View,
 
  Text,

} from 'react-native';



import {

  wp2,
  hp2,

} from '../theme';

export default function LineComp(props) {
  return (
    <View style={styles.lineWrap}>
      <View style={styles.line}></View>
      <Text style={{color: 'black'}}>{props?.date}</Text>
      <View
        style={[styles.line, {marginLeft: wp2(2), marginRight: wp2(0)}]}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  lineWrap: {
    flexDirection: 'row',
    width: wp2(100),
    height: hp2(4),
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  line: {
    width: wp2(34),
    borderBottomWidth: 1,
    marginRight: wp2(2),
    marginLeft: wp2(11),
    borderColor: '#D9D9D9',
  },
});
