import React from 'react';
import {
  StyleSheet,
  View,
  Image,
 
} from 'react-native';


import {
  IMAGES,
 
  wp2,
 
} from '../../theme';

export default function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Image
          source={IMAGES.logoblack}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: wp2(80),
    height: wp2(80),
    overflow: 'hidden',
  },
});
