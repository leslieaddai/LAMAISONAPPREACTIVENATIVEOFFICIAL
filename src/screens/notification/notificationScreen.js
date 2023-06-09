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
import LineComp from '../../components/lineComp';
import NotificationComp from '../../components/notificationComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GetNotifications } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';
import moment from "moment";

export default function NotificationScreen(props) {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const [uniqDates, setUniqDates] = useState();

 useEffect(()=>{
    setLoading(true);

    axios
    .get(GetNotifications, {
        headers:{'Authorization':`Bearer ${user?.token}`},
    })
    .then(async function (res) {
       //console.log(res.data);
       setData(res?.data?.data);
       setUniqDates(res?.data?.data.filter((v,i,a)=>a.findIndex(v2=>(moment(v2.created_at).format('MM/YY')===moment(v.created_at).format('MM/YY')))===i).map((item,index)=>(moment(item?.created_at).format('MM/YY'))));
       setLoading(false);
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      errorMessage('Something went wrong!')
    });

  },[])

  return (
    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
        <View style={styles.headWrap}>
            <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginLeft:wp2(3),marginRight:wp2(5)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.notificationText}>Notifications</Text>
        </View>

        {loading ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :
    // <FlatList
    //   showsVerticalScrollIndicator={false}
    //   contentContainerStyle={{paddingBottom:hp2(2)}}
    //   data={data}
    //   renderItem={({item,index})=>{
    //     //console.log(moment(item?.created_at).format('MM/YY'))
    //     //console.log(moment().format('MM/YY'))
    //     return(
    //       <>
    //       { moment(item?.created_at).format('MM/YY') && <LineComp/> }
    //       <NotificationComp key={index} date={item?.created_at} type={item?.noti_type} user={item?.user} product={item?.product} />
    //       </>
    //     )
    //   }}
    // />
    <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:hp2(2)}}
      data={uniqDates}
      renderItem={({item,index})=>{
        //console.log(moment(item?.created_at).format('MM/YY'))
        //console.log(moment().format('MM/YY'))
        return(
          <>
          <LineComp date={item} />
          {data?.map((item2,index2)=>{
            if(moment(item2?.created_at).format('MM/YY')===item) return (<NotificationComp key={index2} date={item2?.created_at} allData={item2} type={item2?.noti_type} user={item2?.user} product={item2?.product} />)
          })}
          </>
        )
      }}
    />
    }

        {/* <ScrollView contentContainerStyle={{paddingBottom:hp2(12),}}>
        <LineComp/>
        <NotificationComp follow={true}/>
        <LineComp/>
        <NotificationComp follow={false}/>
        </ScrollView> */}

      {/* <BottomComp/> */}
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap:{
    flexDirection:'row',
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems:'center',
  },
  notificationText:{
    color:'black',
    fontWeight:'700',
    fontSize:rfv(24),
  },

});
