import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { AddShipping } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function ShippingComp(props) {

    const [show,setShow]=useState(false);
    const [price,setPrice]=useState(props?.data?.shipping_brand!==null?props?.data?.shipping_brand?.price:'');

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.userData)

    useEffect(()=>{
        setPrice(props?.data?.shipping_brand!==null?props?.data?.shipping_brand?.price:'')
    },[props?.data?.shipping_brand])
  
    const onSubmit = () => {
       if(price!==''){
        setLoading(true);

        let config = {
            method: 'post',
            url: AddShipping,
            headers: { 
              'Authorization': `Bearer ${user.token}`, 
              'Accept': 'application/json',
            },
            data : {price:Number(price),region_id:props?.data?.id},
          };
        
        axios.request(config)
        .then(async function (res) {
           console.log(res?.data);
           setShow(false);
           props?.state?.getAllRegions();
           setLoading(false);
        }) 
        .catch(function (error) {
          setLoading(false);
          errorMessage('Something went wrong!')
        });
       }else{
        errorMessage('Please input price!')
       }
    }

  return (
    <>
    {show?
    <View style={{
      width:wp2(100),
      height:hp2(100),
      backgroundColor:'rgba(0, 0, 0, 0.5)',
      position:'absolute',
      alignItems:'center',
      zIndex:999}}>
  <View style={styles.disclaimerBox}>
     <TouchableOpacity 
     onPress={()=>{setPrice(props?.data?.shipping_brand!==null?props?.data?.shipping_brand?.price:'');setShow(false);}} 
     style={{alignSelf:'flex-end'}}>
     <ICONS.Entypo name="circle-with-cross" size={24} color="#7B788A" />
     </TouchableOpacity>
     <Text style={{color:'black', fontSize:hp('2')}}>Price</Text>
          <View style ={{flexDirection:'row',alignItems:'center',marginVertical:hp2(1)}}>
          <TextInput
          placeholder={'Enter Shipping Price For '+props?.data?.name}
          placeholderTextColor={'grey'}    
          value={price}
          onChangeText={e => setPrice(e)}
          style={{flex:1,color:'black',}}
          keyboardType={'number-pad'}
          />
      </View> 
          <Text style={{color:'red', fontSize:hp('1'),fontWeight:'bold',alignSelf:'center'}}>If you want to give free shipping then just enter 0 in price.</Text>
      <TouchableOpacity disabled={loading} style={styles.savebtn} onPress={()=>{onSubmit()}}>
        {loading?(
            <SkypeIndicator size={24} color={'white'} />
        ):(
            <Text style={{color:'white'}}>Submit</Text>
        )}
      </TouchableOpacity>
  </View>
</View>
:null  
}
      <View style={styles.optionWrap}>
          <Text style={{color:'black'}}>{props?.data?.name}</Text>
          <TouchableOpacity disabled={props?.disable} onPress={()=>setShow(true)} style={[styles.circle,{backgroundColor:props?.data?.shipping_brand!==null?'black':'#D9D9D9'}]}></TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    disclaimerBox:{
      width:wp2(80),
      height:hp2(20),
      backgroundColor:COLORS.appBackground,
      borderRadius:wp2(3),
      borderWidth:1,
      marginTop:hp2(20),
      //borderColor:'#039C8A',
      paddingVertical:hp2(2),
      paddingHorizontal:wp2(4),
    },
    savebtn:{
        width:wp2(22),
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
        alignSelf:'center',
        marginTop:hp2(2),
    },
  });
