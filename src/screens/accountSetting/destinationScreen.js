import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function DestinationScreen(props) {
  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <NewHeaderComp
          title={'Destination'}
          arrowNavigation={() => props.navigation.goBack()}
          movePreviousArrow={true}
        />
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('imageUploadScreen')}
            style={[styles.box, {marginTop: 80, marginBottom: 20}]}>
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.editoricon}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            <Text style={{color: 'black'}}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('productType')}
            style={styles.box}>
            <View style={styles.iconWrap}>
              <Image
                source={IMAGES.brandicon}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            <Text style={{color: 'black'}}>Collection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  destinationText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: '100%',
    height: 302,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  iconWrap: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
  },
});
