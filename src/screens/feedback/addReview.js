import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Platform,
  SafeAreaView
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
import BottomComp from '../../components/bottomComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function AddReview(props) {
    const [selected,setSelected]=useState('');
    const options = (text) => {
        return(
            <View style={styles.optionWrap}>
                <Text style={{color:'black'}}>{text}</Text>
                <TouchableOpacity onPress={()=>setSelected(text)} style={[styles.circle,{backgroundColor:selected==text?'black':'#D9D9D9'}]}></TouchableOpacity>
            </View>
        )
    }
  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center',paddingBottom:hp2(12),}}>
      

      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.customerText}>Add Review</Text>
      </View>

      <View style={styles.textBox}>
        <TextInput
          placeholder={'ADD REVIEW'}
          placeholderTextColor={'grey'}
          multiline={true}
          style={{
            flex: 1,
            color: 'black',
            fontWeight: '700',
            fontSize: rfv(14),
            textAlignVertical: 'top',
          }}
        />
      </View>
      <View style={{width:wp2(88)}}>
      <Text style={{color:'black',fontWeight:'700',marginBottom:hp2(2)}}>How do you feel?</Text>
      </View>
      {options('ANGRY')}
      {options('WORRIED')}
      {options('UPSET')}
      {options('EXCITED')}
      {options('CONFUSED')}
      {options('PANICKED')}
      <TouchableOpacity style={styles.button}>
        <Text style={{color:'white'}}>SEND</Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
      <BottomComp />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
    //justifyContent:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  customerText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(20),
  },
  textBox: {
    width: wp2(88),
    height: hp2(30),
    backgroundColor: 'white',
    borderRadius: wp2(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: hp2(4),
    marginBottom:hp2(2),
    paddingHorizontal: wp2(2),
    paddingVertical: wp2(2),
  },
  optionWrap:{
    width:wp2(90),
    height:hp2(4),
    //backgroundColor:'red',
    borderBottomWidth:1,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:wp2(1),
    marginTop:hp2(2),
  },
  circle:{
    width:wp2(5),
    height:wp2(5),
    //backgroundColor:'#D9D9D9',
    borderRadius:100,
  },
  button:{
    width:wp2(32),
    height:wp2(8),
    backgroundColor:'black',
    borderRadius:wp2(4),
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop:hp2(6),
  },
});
