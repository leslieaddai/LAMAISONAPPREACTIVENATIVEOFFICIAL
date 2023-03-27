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

export default function TermsScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Terms and Conditions</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal:wp2(8),paddingBottom:hp2(2)}}
        >
        <Text style={{color: 'black',textAlign:'justify'}}>
          Thank you for choosing to use our social fashion marketplace! By using
          our platform, you agree to the following terms and conditions:{'\n\n'}
          1. You must be at least 13 years old to use our platform.{'\n\n'}
          2. You are solely responsible for any activity that occurs on your account, and you must
          keep your account password secure.{'\n\n'}
          3. You must not post illegal or offensive content on our platform, including 
          but not limited to content that is defamatory, discriminatory, or otherwise
          inappropriate.{'\n\n'}
          4. We reserve the right to remove any content that we deem
          to be in violation of these terms and conditions. {'\n\n'}
          5. We are not responsible for the accuracy, completeness, or legality of any content
          posted by users on our platform. {'\n\n'}
          6. We reserve the right to modify or discontinue our platform at any time, without notice.{'\n\n'}
          7. You are solely responsible for any transactions that you make on our platform,
          including the purchase or sale of clothing or accessories. {'\n\n'}
          8. We are not responsible for any disputes that may arise between users of our
          platform. {'\n\n'}
          9. By using our platform, you agree to release us from any and
          all claims, demands, and damages arising out of or in connection with
          your use of our platform. {'\n\n'}
          10. These terms and conditions are subject to
          change at any time, and it is your responsibility to check for
          updates. {'\n\n'}
          
          By using our platform, you agree to these terms and
          conditions. If you do not agree to these terms and conditions, you may
          not use our platform. Thank you for choosing our social fashion
          marketplace!
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: hp2(4),
    marginBottom:hp2(2),
    marginLeft: wp2(8),
  },
});
