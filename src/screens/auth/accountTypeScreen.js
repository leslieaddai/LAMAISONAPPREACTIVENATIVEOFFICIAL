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

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,
 
  COLORS,
  
  wp2,
  hp2,
  
} from '../../theme';

export default function AccountTypeScreen(props) {
  
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.accTypeText}>Account Type</Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('createAccountScreen', {
            user: 'editor',
            data: props.route.params.data,
          })
        }
        style={[styles.box, {marginTop: hp2(20), marginBottom: hp2(6)}]}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.editoricon}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={{color: 'black'}}>Editor</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('createAccountScreen', {
            user: 'brand',
            data: props.route.params.data,
          })
        }
        style={styles.box}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.brandicon}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        <Text style={{color: 'black'}}>Brand</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
  },
  accTypeText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: wp2(38),
    height: hp2(18),
    backgroundColor: 'white',
    borderRadius: wp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  iconWrap: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
  },
});
