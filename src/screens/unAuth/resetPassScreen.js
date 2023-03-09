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
import fonts from '../../theme/fonts';
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
} from '../../theme';
import AlertComp from '../../components/alertComp';

export default function ResetPassScreen(props) {
  const [showReset, setShowReset] = useState(true);
  const [passMatch, setPassMatch] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: hp(4)}}>
        <Text style={styles.resetText}>Reset Password</Text>
        {showReset ? (
          <>
          <View style={styles.inputBox}>
              <TextInput
                style={{
                  flex: 1,
                  color: 'black',
                  paddingHorizontal: wp(2),
                  fontSize: rfv(13),
                  fontWeight: '700',
                }}
                placeholder="enter password"
              />
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={{
                  flex: 1,
                  color: 'black',
                  paddingHorizontal: wp(2),
                  fontSize: rfv(13),
                  fontWeight: '700',
                }}
                placeholder="re-enter password"
              />
            </View>
            <TouchableOpacity
              onPress={() => alert('reset btn clicked')}
              style={styles.button}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            {!passMatch && (
                <AlertComp text='Password Does not Match'/>
            )}
          </>
        ) : (
          <>
            <View style={styles.inputBox}>
              <TextInput
                style={{
                  flex: 1,
                  color: 'black',
                  paddingHorizontal: wp(2),
                  fontSize: rfv(13),
                  fontWeight: '700',
                }}
                placeholder="email address"
              />
            </View>
            <TouchableOpacity
              onPress={() => alert('send link btn clicked')}
              style={styles.button}>
              <Text style={styles.buttonText}>Send link to email address</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  resetText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginVertical: hp(5),
    marginLeft: wp(8),
  },
  inputBox: {
    width: wp(80),
    height: hp(6),
    backgroundColor: 'white',
    borderRadius: wp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  button: {
    width: wp(62),
    height: hp(7),
    backgroundColor: 'black',
    borderRadius: wp(10),
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
    //marginVertical:hp(2),
    marginTop: hp(2),
    alignSelf: 'center',
    marginBottom: hp(8),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
    textTransform: 'uppercase',
  },
});
