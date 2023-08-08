import React from 'react';
import {View} from 'react-native';
import {wp2, hp2} from '../theme';
import {SkypeIndicator} from 'react-native-indicators';

export default function LoaderComp(props) {
  return (
    <SkypeIndicator
      style={{
        width: wp2(100),
        height: hp2(100),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      color={'black'}
    />
  );
}
