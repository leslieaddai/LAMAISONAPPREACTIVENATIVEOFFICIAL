import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

import {wp2, hp2, COLORS} from '../../theme';

export default function Category(props) {
  return (
    <View>
      <TouchableOpacity
        disabled={props?.state?.loadingFts}
        onPress={() => {
          props?.state?.onSelectStyle(
            props?.data?.item?.id,
            props?.data?.item?.name,
          );
        }}
        style={[
          styles.button,
          {
            backgroundColor: '#F6F6F6',
          },
          props?.state?.selected == props?.data?.item?.name && {
            borderWidth: 1,
            borderColor: COLORS.main,
          },
        ]}>
        <Text
          style={{
            color:
              props?.state?.selected == props?.data?.item?.name
                ? COLORS.main
                : 'black',
            fontWeight: '400',
            textTransform: 'capitalize',
            fontSize: 14,
          }}>
          {props?.data?.item?.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: wp2(30),
    height: hp2(5),
    paddingHorizontal: wp2(2),
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: wp2(1),
    marginVertical: hp2(1),
  },
});
