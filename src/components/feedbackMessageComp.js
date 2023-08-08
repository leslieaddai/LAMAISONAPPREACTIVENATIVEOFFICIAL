import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import fonts from '../theme/fonts';
import {
  IMAGES,
  ICONS,
  COLORS,
  SIZES,
  screenHeight,
  screenWidth,
  wp2,
  hp2,
  getFont,
  FONTS,
} from '../theme';

export default function FeedbackMessageComp(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.text}>Angry</Text>
        <View style={styles.messageBox}>
          <Text style={[styles.text, {fontSize: rfv(13)}]}>
            I ordered an item from represent and I still have not received my
            items I ordered an item from represent and I still have not received
            my items
          </Text>
        </View>
        <Text style={styles.text}>malikjames@yahoo.com</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(90),
    minHeight: hp2(16),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrap: {
    width: wp2(18),
    height: wp2(18),
    borderRadius: wp2(4),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(12),
  },
  messageBox: {
    width: wp2(70),
    minHeight: hp2(8),
    borderRadius: wp2(2),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: wp2(3),
    paddingVertical: wp2(3),
  },
});
