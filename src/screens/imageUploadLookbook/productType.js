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
import axios from 'react-native-axios';
import BottomComp from '../../components/bottomComp';
import { getCategories } from '../../config/Urls';
import { useSelector } from 'react-redux';

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

  useEffect(() => {
    getApiData(getCategories,
      'GetcategoryState',
      'GetcategoryLoading');
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
        updateState({[state]: response.data.data});
      })
      .catch(function (error) {
        console.log("ProductType error", error.response.data);
      });
  };
  return (
    <SafeAreaView style={{flex:1}}>
     
  <View style={styles.container}>
      <Text style={styles.heading}>Product Type</Text>
      <FlatList
      data={GetcategoryState}
      contentContainerStyle={{marginTop:hp2(20),padding:wp2(2)}}
      renderItem={({item})=>{
        return(
          <TouchableOpacity onPress={()=>props.navigation.navigate('imageUploadLookbook',{item})} style={[styles.box,{marginBottom:hp2(6),
          backgroundColor:item.category_name == "Footwear"?"black":"white"}]}>
          <View style={styles.iconWrap}>
          <Image
              source={item.icon == null ?item.category_name == "Footwear"?IMAGES.foot:IMAGES.shirt:{uri:item.icon}}
              style={{width: '100%', height: '100%',tintColor:item.category_name == "Footwear"?"white":"black"}}
              resizeMode="contain"
            />
          </View>
          <Text style={{color:item.category_name == "Footwear"?"white":"black"}}>{item.category_name}</Text>
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
