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
  FlatList,
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
import FollowComp from './followComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GetBrandFollowerList,GetBrandFollowingList,GetEditorFollowerList,GetEditorFollowingList } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function FollowerList(props) {
  const [selected, setSelected]=useState('brands');
  const [dataBrand,setDataBrand]=useState([]);
  const [dataEditor,setDataEditor]=useState([]);

  const [loadingFollowList,setLoadingFollowList]=useState(false);
  // const [followingDataBrand,setFollowingDataBrand]=useState([]);
  // const [followerDataBrand,setFollowerDataBrand]=useState([]);
  // const [followingDataEditor,setFollowingDataEditor]=useState([]);
  // const [followerDataEditor,setFollowerDataEditor]=useState([]);

  const user = useSelector(state => state.userData)

  useEffect(()=>{
    if(props?.route?.params?.list==='following'){
      //setDataBrand(props?.route?.params?.followingDataBrand)
      //setDataEditor(props?.route?.params?.followingDataEditor)

        setLoadingFollowList(true);

        axios
        .get(GetBrandFollowingList+`/${props?.route?.params?.id}`)
        .then(async function (res){
           console.log(res.data);
           setDataBrand(res?.data?.data);

           axios
          .get(GetEditorFollowingList+`/${props?.route?.params?.id}`)
          .then(async function (res){
            console.log(res.data);
            setDataEditor(res?.data?.data);
            setLoadingFollowList(false);
          })
          .catch(function (error){
            console.log(error.response.data)
            setLoadingFollowList(false);
            errorMessage('Something went wrong!')
          })

          })
          .catch(function (error){
           console.log(error.response.data)
           setLoadingFollowList(false);
           errorMessage('Something went wrong!')
          })
    }else{
      //setDataBrand(props?.route?.params?.followerDataBrand)
      //setDataEditor(props?.route?.params?.followerDataEditor)

      setLoadingFollowList(true);

      axios
      .get(GetBrandFollowerList+`/${props?.route?.params?.id}`)
      .then(async function (res) {
         console.log(res.data);
         setDataBrand(res?.data?.data);
         
         axios
         .get(GetEditorFollowerList+`/${props?.route?.params?.id}`)
         .then(async function (res){
           console.log(res.data);
           setDataEditor(res.data.data);
           setLoadingFollowList(false);
         })
         .catch(function (error){
           console.log(error.response.data)
           setLoadingFollowList(false);
           errorMessage('Something went wrong!')
         })
         
        }) 
        .catch(function (error) {
          console.log(error.response.data)
          setLoadingFollowList(false);
          errorMessage('Something went wrong!')
        });
    }
  },[props?.route?.params?.list])

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>

<View style={styles.headWrap}>
    <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
      <ICONS.AntDesign name="left" size={24} color="black" />
    </TouchableOpacity>
    <Text style={styles.heading}>{props.route.params.list=='following'?"FOLLOWING":"FOLLOWERS"}</Text>
  </View>

  <View style={styles.iconContainer}>
  <TouchableOpacity onPress={()=>setSelected('brands')}>
        <Text style={[styles.text,{color:selected=='brands'?'black':'gray'}]}>BRANDS</Text>
        </TouchableOpacity>
    <View style={styles.line}></View>
    <TouchableOpacity onPress={()=>setSelected('editors')}>
        <Text style={[styles.text,{color:selected=='editors'?'black':'gray'}]}>EDITORS</Text>
        </TouchableOpacity>
  </View>

  {loadingFollowList ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:hp2(12),width:wp2(96),alignSelf:'center'}}
      data={selected==='brands'?dataBrand:dataEditor}
      numColumns={3}
      renderItem={({item})=>{
        return(
          <FollowComp list={props?.route?.params?.list} data={{item}} />
        )
      }}
      />
    }
    
  {/* <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{
      paddingBottom: hp2(12),
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: wp2(96),
      alignSelf: 'center',
    }}>
    <FollowComp/>
    <FollowComp/>
  </ScrollView> */}

  {/* <BottomComp /> */}
</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  inputBox: {
    width: wp2(78),
    height: hp2(5),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    //marginVertical: hp2(1),
    //alignSelf:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(22),
  },
  iconContainer: {
    width: wp2(48),
    height: hp2(8),
    flexDirection: 'row',
    //backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp2(1),
  },
  line: {
    width: wp2(1),
    height: hp2(6),
    backgroundColor: 'black',
  },
  text: {
    fontWeight: '700',
    fontSize: rfv(14),
    //color: 'black',
  },
});
