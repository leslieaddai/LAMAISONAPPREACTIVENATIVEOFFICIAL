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
  SafeAreaView,
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
import { useNavigation } from '@react-navigation/native';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';

export default function PriceList(props) {
  const {Price} = useSelector(state=>state.Price)
  const dispatch = useDispatch()
  const [selected,setSelected]=useState(Price);
  const navigation = useNavigation();
    const options = (text) => {
        return(
            <TouchableOpacity onPress={()=>{
              setSelected(text)
              dispatch({
                type:types.Priceadd,
                payload: text
              })
              navigation.goBack()
            }}  style={styles.optionWrap}>
                <Text style={{color:'black'}}>{text==='301'?text+'+':'€'+text}</Text>
                <View style={[styles.circle,{backgroundColor:selected==text?'black':'#D9D9D9'}]}></View>
            </TouchableOpacity>
        )
    }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>{
        navigation.goBack()
        // dispatch({
        //   type:types.Priceadd,
        //   payload: selected
        // })
        }} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>PRICE</Text>
      </View>

      {options('0-50')}
      {options('51-100')}
      {options('101-200')}
      {options('201-300')}
      {options('301')}
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
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
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
    alignSelf:'center',
  },
  circle:{
    width:wp2(5),
    height:wp2(5),
    //backgroundColor:'#D9D9D9',
    borderRadius:100,
  },
});
