import React from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,

  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,
 
  wp2,
  hp2,

} from '../../theme';

export default function TermsScreen(props) {
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Terms and Conditions</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp2(8),
          paddingBottom: hp2(2),
        }}>
        <Text style={{color: 'black', textAlign: 'justify'}}>
          Thank you for choosing to use our social fashion marketplace! By using
          our platform, you agree to the following terms and conditions:{'\n\n'}
          1. You must be at least 13 years old to use our platform.{'\n\n'}
          2. You are solely responsible for any activity that occurs on your
          account, and you must keep your account password secure.{'\n\n'}
          3. You must not post illegal or offensive content on our platform,
          including but not limited to content that is defamatory,
          discriminatory, or otherwise inappropriate.{'\n\n'}
          4. We reserve the right to remove any content that we deem to be in
          violation of these terms and conditions. {'\n\n'}
          5. We are not responsible for the accuracy, completeness, or legality
          of any content posted by users on our platform. {'\n\n'}
          6. We reserve the right to modify or discontinue our platform at any
          time, without notice.{'\n\n'}
          7. You are solely responsible for any transactions that you make on
          our platform, including the purchase or sale of clothing or
          accessories. {'\n\n'}
          8. We are not responsible for any disputes that may arise between
          users of our platform. {'\n\n'}
          9. By using our platform, you agree to release us from any and all
          claims, demands, and damages arising out of or in connection with your
          use of our platform. {'\n\n'}
          10. These terms and conditions are subject to change at any time, and
          it is your responsibility to check for updates. {'\n\n'}
          By using our platform, you agree to these terms and conditions. If you
          do not agree to these terms and conditions, you may not use our
          platform. Thank you for choosing our social fashion marketplace!
        </Text>
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',
 
    width: wp2(100),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    marginBottom: hp2(2),
  },
  heading: {
    color: 'black',
    fontSize: rfv(18),
    fontWeight: '700',
    marginLeft: wp2(14),
   
  },
});
