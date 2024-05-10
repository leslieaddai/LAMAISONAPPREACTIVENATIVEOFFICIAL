import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, ICONS, COLORS, wp2, hp2} from '../../theme';
import fonts from '../../theme/fonts';

const NothingListedComponnet = () => {
  return (
    <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    }}>
    <View style={styles.myCont}>
      <Text style={styles.mytxtcont}>
      Nothing Listed Yet
      </Text>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    myCont: {
      marginVertical:10,
      width: 374,
      height: 155,
      // top: 320,
      // left: 20,
      borderRadius: 10,
      justifyContent: 'center',
  
      backgroundColor: 'rgba(128, 128, 128, 0.1)', // Grey color with 0.1 opacity
      backgroundColor: 'rgba(128, 128, 128, 0.1)', // Grey color with 0.1 opacity
      // Additional styles as needed
    },
    mytxtcont: {
      fontFamily: fonts.PoppinsRegular,
      paddingHorizontal: 20,
      fontSize: rfv(15),
      textAlign: 'center',
      justifyContent: 'center',
      textAlignVertical: 'center', // Vertical centering
  
      color: 'rgba(128, 128, 128, .8)', // Grey color with 0.1 opacity
      // marginTop: hp2(1),
    },
    container: {
      flex: 1,
      backgroundColor: COLORS.appBackground,
    },
});

export default NothingListedComponnet;
