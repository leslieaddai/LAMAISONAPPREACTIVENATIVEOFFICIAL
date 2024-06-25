import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
} from 'react-native';

import Arrow from '../../../assets/icons/next-arrow.svg';
import Settings from '../../../assets/icons/settings.svg';

const NewHeaderComp = ({
  title,
  moveNextArrow,
  movePreviousArrow,
  arrowNavigation,
  settings,
  onlySettings,
  settingNavigation,
}) => {
  return (
    <>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.sideContainer}>
            {movePreviousArrow && (
              <TouchableOpacity onPress={arrowNavigation}>
                <Arrow color={'#000'} width={13} height={13} />
              </TouchableOpacity>
            )}
            {settings && !movePreviousArrow && (
              <TouchableOpacity onPress={arrowNavigation}>
                <Arrow color={'#000'} width={13} height={13} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.sideContainer}>
            {settings && (
              <TouchableOpacity
                style={{position: 'absolute', right: 0}}
                onPress={settingNavigation}>
                <Settings color={'#000'} width={20} height={20} />
              </TouchableOpacity>
            )}
            {onlySettings && (
              <TouchableOpacity
                style={{position: 'absolute', right: 0}}
                onPress={settingNavigation}>
                <Settings color={'#000'} width={20} height={20} />
              </TouchableOpacity>
            )}
            {moveNextArrow && (
              <TouchableOpacity
                onPress={arrowNavigation}
                style={{
                  transform: [{rotate: '180deg'}],
                  position: 'absolute',
                  right: 0,
                }}>
                <Arrow color={'#000'} width={13} height={13} />
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 2,
    marginTop: 10,
    position: 'relative',
    paddingBottom: 10,
    borderColor: '#00000010',
  },
  safeAreaView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideContainer: {
   
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default NewHeaderComp;
