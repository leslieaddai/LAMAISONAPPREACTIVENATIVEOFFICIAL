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

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../../theme';

const HeaderComponent = ({
  mystyle,
  title,
  onTap,
  disableback,
  customComponent,
}) => {
  return (
    <View
      style={[
        styles.headWrap,
        {
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(0, 0, 0, 0.1)',
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        },
        mystyle,
      ]}>
      {!disableback && (
        <TouchableOpacity onPress={onTap}>
          <ICONS.AntDesign
            name="left"
            size={24}
            color="black"
            style={{flex: 1, textAlign: 'center'}}
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.heading, {flex: 0.6, textAlign: 'center'}]}>
        {title}
      </Text>

      {customComponent && (
        <View style={styles.customComponent}>{customComponent}</View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',

    width: wp2(100),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(3),
    marginBottom: hp2(2),
  },
  heading: {
    color: 'black',
    fontSize: rfv(14),
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
    marginLeft: wp2(16),
  },
});

export default HeaderComponent;
