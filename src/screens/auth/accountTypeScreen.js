import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {IMAGES, COLORS, wp2, hp2} from '../../theme';
import ContinueButton from './componnets/ContinueBtn';
import {ScrollView} from 'react-native-gesture-handler';
import Arrow from '../../assets/icons/next-arrow.svg';

export default function AccountTypeScreen(props) {
  const [selectedAccount, setSelectedAccount] = useState('editor');

  const handleAccountSelection = accountType => {
    setSelectedAccount(accountType);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={[{backgroundColor: '#FFFFFF'}]}>
        <SafeAreaView style={[{marginHorizontal: 20, marginVertical: 40}]}>
          <View>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Arrow color={'#000'} width={13} height={13} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>Account Type</Text>
          <TouchableOpacity
            onPress={() => {
              handleAccountSelection('editor');
              // props.navigation.navigate('createAccountScreen', {
              //   user: 'editor',
              //   data: props.route.params.data,
              // });
            }}
            style={[
              styles.box,
              {
                borderColor:
                  selectedAccount === 'editor' ? '#4D50E0' : 'transparent',
                backgroundColor:
                  selectedAccount === 'editor' ? 'transparent' : '#F6F6F6',
              },
            ]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.iconWrap}>
                <Image
                  source={IMAGES.editor2icon}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor:
                      selectedAccount === 'editor' ? '#4D50E0' : 'black',
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.text]}>Editor</Text>
            </View>
            <RadioButton selected={selectedAccount === 'editor'} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleAccountSelection('brand');
              // props.navigation.navigate('createAccountScreen', {
              //   user: 'brand',
              //   data: props.route.params.data,
              // });
            }}
            style={[
              styles.box,
              {
                borderColor:
                  selectedAccount === 'brand' ? '#4D50E0' : 'transparent',
                backgroundColor:
                  selectedAccount === 'brand' ? 'transparent' : '#F6F6F6',
              },
            ]}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.iconWrap}>
                <Image
                  source={IMAGES.brand2icon}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor:
                      selectedAccount !== 'brand' ? 'black' : '#4D50E0',
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.text]}>Brand</Text>
            </View>
            <RadioButton selected={selectedAccount === 'brand'}></RadioButton>
          </TouchableOpacity>

          <ContinueButton
            text={'Continue'}
            onPress={() => {
              if (selectedAccount == 'brand') {
                props.navigation.navigate('createAccountScreen', {
                  user: 'brand',
                  data: props.route.params.data,
                });
              } else if (selectedAccount == 'editor') {
                handleAccountSelection('editor');
                props.navigation.navigate('createAccountScreen', {
                  user: 'editor',
                  data: props.route.params.data,
                });
              }
            }}
            style={{
              width: '100%',
              marginTop: 10,
              fontFamily: 'Poppins-SemiBold',
            }}
          />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function RadioButton(props) {
  return (
    <View
      style={[
        {
          height: 25,
          width: 25,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#89939E',
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute', // Added position:absolute
          top: 0, // Added top:0
          left: 0, // Added left:0
          marginTop: 10, // Added marginTop:10 to adjust the position
          marginLeft: 10, // Added marginLeft:10 to adjust the position
        },
        props.style,
      ]}>
      {props.selected ? (
        <View
          style={{
            height: 12,
            width: 12,
            borderRadius: 10,
            backgroundColor: '#4D50E0',
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    // color:'white'
  },
  accTypeText: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
  },
  box: {
    width: '100%',
    height: hp2(45),
    marginVertical: 20,
    borderRadius: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 2,
  },

  iconWrap: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
  },

  header: {
    marginTop: 30,
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
    fontSize: 26,
    lineHeight: 44,
    color: '#000000',
    textAlign: 'center',
  },

  text: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 20,
    lineHeight: 44,
    color: '#000000',
    textAlign: 'center',
  },
});
