import React from 'react';
import {
  StyleSheet,
  View,
 
  TouchableOpacity,
  Text,
  TextInput,
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

export default function Username(props) {
    const textBox = (placeText) => {
        return(
            <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder={placeText}
              placeholderTextColor={'grey'}
            />
          </View>
        )
    }
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
  
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>USERNAME</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(4)}}>
     {textBox('CURRENT USERNAME')}
     {textBox('NEW USERNAME')}
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.buttonText}>CONFIRM</Text>
        </TouchableOpacity>
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
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
   
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(1),
    alignSelf:'center',
  },
  button: {
    width: wp2(28),
    height: hp2(6),
    backgroundColor: 'black',
    borderRadius: wp2(10),
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
    marginTop: hp2(16),
    alignSelf:'flex-end',
    marginRight:wp2(10),
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: rfv(14),
  },
});
