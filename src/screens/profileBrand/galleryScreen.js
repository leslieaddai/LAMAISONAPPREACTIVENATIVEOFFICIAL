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
import GalleryComp from '../../components/galleryComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GalleriesUrl } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function GalleryScreen(props) {
  const [loading, setLoading] = useState(false);
  //const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const [data,setData]=useState(props?.route?.params?.data?.galleries);

  //console.log(props.route.params.data)

  // useEffect(()=>{
  //   setLoading(true);

  //   axios
  //   .get(GalleriesUrl, {
  //       headers:{'Authorization':`Bearer ${user.token}`},
  //   })
  //   .then(async function (res) {
  //      console.log(res.data.data);
  //      setData(res.data.data);
  //      setLoading(false);
       
  //   }) 
  //   .catch(function (error) {
  //     console.log(error.response.data)
  //     setLoading(false);
  //     errorMessage('Something went wrong!')
  //     //errorMessage(errorHandler(error))
  //     //errorMessage('Login Failed');
  //   });

  // },[])

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.galleryText}>Gallery</Text>
      </View>

      {loading ? 
    <View style={{  alignItems: 'center', justifyContent: 'center',marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    : data ?
    // <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignSelf:'center',width:wp2(97),flexDirection:'row',flexWrap:'wrap',paddingTop:hp2(1),paddingBottom:hp2(12),}}>
    // {data?.map((item)=>{
    //     //console.log("item=======>",item);
    // return(
    //     <GalleryComp item={{item}} />
    // )})}  
    // </ScrollView>
    <FlatList 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingTop: hp2(1),paddingBottom:hp2(12),alignSelf:'center',}}
    numColumns={3}
     data={data}
      renderItem={({item,i})=>{
        return(
          <GalleryComp key={i} item={{item}} />
        )
      }}

     />:null
    }

      {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{width:wp2(97),flexDirection:'row',flexWrap:'wrap',paddingTop:hp2(1),paddingBottom:hp2(12),}}>
        <GalleryComp/>
        <GalleryComp/>
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
    //alignItems:'center',
  },
  headWrap: {
    flexDirection: 'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  galleryText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(26),
  },
});
