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

export default function PrivacyScreen(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Privacy & Security</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: wp2(8),
          paddingBottom: hp2(2),
        }}>
        <Text style={{color: 'black', textAlign: 'justify'}}>
          At La Maison, we take the privacy and security of our users seriously.
          We understand that sharing personal information and financial details
          online can be a concern, and we strive to provide a safe and secure
          environment for our community.{'\n\n'} Here are some of the measures
          we take to protect your privacy and security:{'\n\n'}* Encryption: We
          use industry-standard encryption to protect your personal and
          financial information when it is transmitted to our servers.{'\n\n'}*
          Secure servers: Our servers are located in secure facilities with
          multiple layers of security to prevent unauthorized access.{'\n\n'}*
          Verified users: We verify the identity of all brands before they can
          access our marketplace. This helps to prevent fraud and protect your
          personal information.{'\n\n'}* Secure payments: We use trusted payment
          processors to handle all transactions, ensuring that your financial
          details are kept safe.{'\n\n'}* Privacy policy: We have a
          comprehensive privacy policy that outlines how we collect, use, and
          share your personal information. You can view our privacy policy at
          any time by visiting our website.{'\n\n'}We are committed to
          protecting your privacy and security, and we will continue to invest
          in the latest technology and security measures to ensure the safety of
          our community. If you have any questions or concerns, please don't
          hesitate to contact us.
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
    marginBottom: hp2(2),
    marginLeft: wp2(8),
  },
});
