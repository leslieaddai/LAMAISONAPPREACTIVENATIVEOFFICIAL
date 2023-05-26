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
  ImageBackground,
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
import Popular from '../../components/brandProfileComps/popular';
import Lookbook from '../../components/brandProfileComps/lookbook';
import About from '../../components/brandProfileComps/about';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GalleriesUrl,FollowUrl,UnfollowUrl,GetBrandFollowerList,GetBrandFollowingList,GetEditorFollowerList,GetEditorFollowingList } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function BrandProfileScreen(props) {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [loadingFollow,setLoadingFollow]=useState(false);

  const [loadingFollowList,setLoadingFollowList]=useState(false);
  const [followingDataBrand,setFollowingDataBrand]=useState([]);
  const [followerDataBrand,setFollowerDataBrand]=useState([]);
  const [followingDataEditor,setFollowingDataEditor]=useState([]);
  const [followerDataEditor,setFollowerDataEditor]=useState([]);

  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)

  const [follow,setFollow]=useState(false);

  //console.log(props.route.params.userData.token);

  useEffect(()=>{
    setLoading(true);

    axios
    //.post(GalleriesUrl, {user_id:user?.userData?.id})
    .post(GalleriesUrl, {user_id:props?.route?.params?.userData?.userData?.id})
    .then(async function (res) {
       console.log(res.data);
       setData(res?.data?.data.reverse());
       setLoading(false);
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoading(false);
      errorMessage('Something went wrong!')
    });

  },[])

  useEffect(()=>{
    setLoadingFollowList(true);

    axios
    .get(GetBrandFollowerList+`/${props?.route?.params?.userData?.userData?.id}`)
    .then(async function (res) {
       console.log(res.data);
       setFollowerDataBrand(res.data.data);
       if(user?.token !== ''){
        if(user?.userData?.id !== props?.route?.params?.userData?.userData?.id && user?.userData?.role[0]?.id===3){
          //console.log(res.data.data.some(e => e.follower_id === user?.userData?.id))
          setFollow(res.data.data.some(e => e.follower_id === user?.userData?.id))
        }
       }

       axios
       .get(GetBrandFollowingList+`/${props?.route?.params?.userData?.userData?.id}`)
       .then(async function (res){
          console.log(res.data);
          setFollowingDataBrand(res.data.data);
        
          axios
          .get(GetEditorFollowerList+`/${props?.route?.params?.userData?.userData?.id}`)
          .then(async function (res){
            console.log(res.data);
            setFollowerDataEditor(res.data.data);
            if(user?.token !== ''){
              if(user?.userData?.id !== props?.route?.params?.userData?.userData?.id && user?.userData?.role[0]?.id===2){
                //console.log(res.data.data.some(e => e.follower_id === user?.userData?.id))
                setFollow(res.data.data.some(e => e.follower_id === user?.userData?.id))
              }
            }

            axios
            .get(GetEditorFollowingList+`/${props?.route?.params?.userData?.userData?.id}`)
            .then(async function (res){
              console.log(res.data);
              setFollowingDataEditor(res.data.data);
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

  },[])

  const onFollow = () => {
    setLoadingFollow(true);

    let config = {
      method: 'post',
      url: FollowUrl,
      headers: { 
        'Authorization': `Bearer ${user?.token}`, 
        'Accept': 'application/json'
      },
      data:{follower_id:user?.userData?.id,following_id:props?.route?.params?.userData?.userData?.id}
    };

    axios.request(config)
    .then(async function (res) {
       console.log(res.data);
       setLoadingFollow(false);
       setFollow(true);
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoadingFollow(false);
      errorMessage('Something went wrong!')
    });
  }

  const onUnFollow = () => {
    setLoadingFollow(true);

    let config = {
      method: 'post',
      url: UnfollowUrl,
      headers: { 
        'Authorization': `Bearer ${user?.token}`, 
        'Accept': 'application/json'
      },
      data:{follower_id:user?.userData?.id,following_id:props?.route?.params?.userData?.userData?.id}
    };

    axios.request(config)
    .then(async function (res) {
       console.log(res.data);
       setLoadingFollow(false);
       setFollow(false);
    }) 
    .catch(function (error) {
      console.log(error.response.data)
      setLoadingFollow(false);
      errorMessage('Something went wrong!')
    });
  }

  return (
    <>
    
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
      <View style={styles.brandLogo}>
          <ImageBackground
            //source={IMAGES.temp}
            source={{uri:props?.route?.params?.userData?.userData?.profile_image}}
            style={{width: '100%', height: '100%',justifyContent:'space-between'}}
            resizeMode="cover"
          >
                  <View style={styles.iconWrap}>
      <TouchableOpacity onPress={()=>props.navigation.navigate('FTS100')} style={styles.badge}>
          <Image
            source={IMAGES.badge}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {props?.route?.params?.userData?.userData?.id===user?.userData?.id &&
        <TouchableOpacity onPress={()=>props.navigation.navigate('settingsScreen',{user:user})}>
        <ICONS.Ionicons name="menu-outline" size={44} color="black" />
        <View style={styles.notificationBadge}>
            <Text style={{color:'white',fontSize:rfv(10)}}>1</Text>
        </View>
        </TouchableOpacity>
        }
      </View>

      <View style={{marginBottom:hp2(1),flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp2(4),alignItems:'center'}}>
        <Text style={{fontWeight:'700',fontSize:rfv(22),color:'black'}}>{props?.route?.params?.userData?.userData?.name}</Text>
        {props?.route?.params?.userData?.userData?.id!==user?.userData?.id && 
        <>
        {!loadingFollowList && user?.token!=='' && <TouchableOpacity onPress={()=>{if(!follow){onFollow()}else{onUnFollow()}}} style={[styles.followButton,{backgroundColor:follow?'white':'black'}]}>
        {loadingFollow?(
          <SkypeIndicator color={follow?'black':'white'} />
        ):(
          <Text style={{fontWeight:'700',color:follow?'black':'white',fontSize:rfv(13)}}>{follow?'FOLLOWING':'FOLLOW'}</Text>
        )}
    </TouchableOpacity>}
    </>
        }
      </View>

          </ImageBackground>
      </View>
      
{!loadingFollowList ?
      <View style={{flexDirection:'row',marginLeft:wp2(4),marginBottom:hp2(2)}}>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'following',followingDataBrand,followingDataEditor})}>
      <Text style={{fontWeight:'bold',color:'black'}}>{followingDataBrand.length+followingDataEditor.length}</Text>
      <Text style={{color:'black'}}> FOLLOWING </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>props.navigation.navigate('followerList',{list:'follower',followerDataBrand,followerDataEditor})}>
      <Text style={{fontWeight:'bold',color:'black'}}>{followerDataBrand.length+followerDataEditor.length}</Text>
      <Text style={{color:'black'}}> FOLLOWERS</Text>
      </TouchableOpacity>
      </View>
      :
      <View>
        <SkypeIndicator color={'black'} />
      </View>
}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:hp2(12)}}>
        <Text style={{color:'black',fontWeight:'600',fontSize:rfv(18),marginLeft:wp2(3)}}>POPULAR</Text>
        <Popular no={'1.'} />
        <Popular no={'2.'} />
        <Popular no={'3.'} />
        <Popular no={'4.'} />
        <Popular no={'5.'} />

        <TouchableOpacity  onPress={() => props.navigation.navigate('lookbookScreen',{userData:props?.route?.params?.userData})} style={styles.lookbook}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          LOOKBOOK
        </Text>
      </TouchableOpacity>

        {loading ? 
            <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
            <SkypeIndicator color={'black'} />
          </View>
          :
          <>
        <Lookbook data={{data}} />
        <TouchableOpacity  onPress={() => props.navigation.navigate('galleryScreen',{data:data})} style={styles.gallery}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          GALLERY
        </Text>
        </TouchableOpacity>
        </>
          }


        <About />

      </ScrollView>

      {/* <BottomComp /> */}
    </View>
    </SafeAreaView>

  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  iconWrap:{
    flexDirection:'row',
    paddingHorizontal:wp2(4),
    justifyContent:'space-between',
    marginTop:hp2(1),
  },
  badge: {
    width: wp2(10),
    height: wp2(10),
    overflow: 'hidden',
  },
  notificationBadge:{
    width:wp2(5),
    height:wp2(5),
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F2ABA',
    position:'absolute',
    right:wp2(1),
  },
  brandLogo:{
    width:wp2(100),
    height:hp2(32),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    overflow:'hidden',
  },
  followButton:{
    width:wp2(30),
    height:hp2(5),
    borderRadius:wp2(8),
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
  },
  gallery: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
  lookbook: {
    width: wp2(80),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: hp2(2),
  },
});
