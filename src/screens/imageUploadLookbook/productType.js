import React, {useState,useEffect} from 'react';
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
  FlatList
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

import axios from 'react-native-axios';
import { getCategories,GetBrandShippingInfo } from '../../config/Urls';
import { errorMessage,successMessage } from '../../config/NotificationMessage';
import { errorHandler } from '../../config/helperFunction';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function ProductType(props) {
  const {token} = useSelector(state => state.userData);
  const [allStates, setAllStates] = useState({
    Getcategorytate: [],
  });
  const [allLoading, setAllLoading] = useState({
    GetcategoryLoading: false,
  });
  const {GetcategoryLoading} = allLoading;
    
  const {GetcategoryState} = allStates;

  const updateState = data => {
        setAllStates(prev => ({...prev, ...data}));
  };

  const updateLoadingState = data => {
        setAllLoading(prev => ({...prev, ...data}));
  };

  const [haveShippingInfo, setHaveShippingInfo] = useState(false);
  const [shippingData, setShippingData] = useState('');

  useEffect(() => {
    getApiData(getCategories,
      'GetcategoryState',
      'GetcategoryLoading');
    getShippingInfo();
  },[])

  const getApiData = (url, state, loading) => {
    updateLoadingState({[loading]: true});
    axios
      .get(url,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(function (response) {
        updateLoadingState({[loading]: false});
        updateState({[state]: response?.data?.data});
      })
      .catch(function (error) {
        console.log("ProductType error", error.response.data);
      });
  };

  const getShippingInfo = () => {
    axios
    .get(GetBrandShippingInfo,{
      headers:{'Authorization':`Bearer ${token}`},
    })
    .then(async function (res) {
       //console.log(res?.data);
       if(res?.data?.data.length > 0){
        setHaveShippingInfo(true)
        setShippingData(res?.data?.data);
        //console.log('this is true')
       }else{
        setHaveShippingInfo(false)
        setShippingData('');
        //console.log('this is false')
       }
    }) 
    .catch(function (error) {
      errorMessage('Something went wrong!')
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
     
  <View style={styles.container}>
      <Text style={styles.heading}>Product Type</Text>
      <FlatList
      data={GetcategoryState}
      contentContainerStyle={{marginTop:hp2(20),padding:wp2(2)}}
      renderItem={({item})=>{
        return(
          <TouchableOpacity onPress={()=>haveShippingInfo?props.navigation.navigate('imageUploadLookbook',{item,shippingData}):errorMessage('Please set shipping price before uploading products!')} style={[styles.box,{marginBottom:hp2(6),
          backgroundColor:item?.category_name == "Footwear"?"black":"white"}]}>
          <View style={styles.iconWrap}>
          <Image
              source={item?.icon == null ?item?.category_name == "Footwear"?IMAGES.foot:IMAGES.shirt:{uri:item?.icon?.original_url}}
              style={{width: '100%', height: '100%',tintColor:item?.category_name == "Footwear"?"white":"black"}}
              resizeMode="contain"
            />
          </View>
          <Text style={{color:item?.category_name == "Footwear"?"white":"black"}}>{item?.category_name}</Text>
        </TouchableOpacity>
        )
      }}      
      />
      
      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
  },
  box:{
    width: wp2(38),
    height: hp2(18),
    backgroundColor: 'white',
    borderRadius: wp2(6),
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
  },
  iconWrap:{
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
  },
});
