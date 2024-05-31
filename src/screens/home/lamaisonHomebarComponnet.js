import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {RFValue as rfv} from 'react-native-responsive-fontsize';
import {IMAGES, hp2, wp2} from '../../theme';
import fonts from '../../theme/fonts';
import SmallLogoComponnet from '../welcome/smallLogoComp';

const LamaisonBar = ({navigation, user}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
        borderRadius: 10,
        borderWidth: 1,
        marginHorizontal: 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#00000010',
      }}>
      <Image
        source={IMAGES.logoMaison}
        style={{width: 216, height: 78}}
        resizeMode="cover"
      />
      <View style={{flexDirection: 'row', gap: 5}}>
        <TouchableOpacity
          disabled={user?.token !== '' ? false : true}
          onPress={() => navigation.navigate('listViewScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.book}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('homeScreen')}
          style={styles.iconWrap}>
          <Image
            source={IMAGES.list}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textla: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: rfv(13),
  },
  containerla: {
    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Grey background color
    borderRadius: 10, // Adjust the borderRadius value as needed
    // padding: 10, // Add padding for better spacing

    paddingVertical: 25,
    paddingHorizontal: 30,
    // marginHorizontal:20,
    marginRight: 10,
    flexDirection: 'row',
    //  le:10,

    alignItems: 'flex-start', // Align items to the start of the page
    // justifyContent: 'space-between',
  },
  mycontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 20,
  },
  iconWrap: {
    width: wp2(12),
    height: hp2(8),
    marginRight: 5,
    overflow: 'hidden',
  },
});

export default LamaisonBar;
