import React from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,

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
import FeedbackMessageComp from '../../components/feedbackMessageComp';

import LineComp from '../../components/lineComp';

export default function FeedbackScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.headWrap}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', left: wp2(4)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.supportText}>Customer Support</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('customerSupportScreen')}
            style={{position: 'absolute', right: wp2(4)}}>
            <ICONS.AntDesign name="pluscircle" size={30} color="#162FAC" />
          </TouchableOpacity>
        </View>
        <LineComp />
        <FeedbackMessageComp />
     
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
    
    width: wp2(100),
  },
  supportText: {
    color: 'black',
    fontSize: rfv(20),
    fontWeight: '700',
    marginLeft: wp2(12),
  },
});
