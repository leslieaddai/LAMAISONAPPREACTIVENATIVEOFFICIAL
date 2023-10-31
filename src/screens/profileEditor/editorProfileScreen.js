import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,

  ScrollView,
  ImageBackground,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {
  IMAGES,
  ICONS,
  COLORS,

  wp2,
  hp2,
 
} from '../../theme';

import BrandComp from '../../components/editorProfileComps/brands';
import Wardrobe from '../../components/editorProfileComps/wardrobe';
import NextPickup from '../../components/editorProfileComps/nextPickup';

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetEditorInfo,

  FollowUrl,
  UnfollowUrl,
  BlockUser,
  UnblockUser,

} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import SkeletonEditorProfileComp from '../../components/SkeletonViewComponents/SkeletonEditorProfileComp';

export default function EditorProfileScreen(props) {
 

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  

  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  const [follow, setFollow] = useState(false);
  const [blockData,setBlockData] = useState(null)
  const [isBlocked,setIsBlocked] = useState(false)
  const {count} = useSelector(state => state.ordercount)

  

  useEffect(() => {

    setLoading(true);

    axios
      .get(
        GetEditorInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
      
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }
        if(res?.data?.data?.is_blocked !== null){
          setBlockData(res?.data?.data?.is_blocked)
          setIsBlocked(true)
        }
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
    
        errorMessage(errorHandler(error))
      });
  }, []);

  const getEditorData = () => {
   

    axios
      .get(
        GetEditorInfo +
          `${props?.route?.params?.userData?.userData?.id}/viewer/${
            user?.token !== '' && user?.userData?.id
          }`,
      )
      .then(async function (res) {
      
        setData(res?.data?.data);
        if (res?.data?.data?.is_following === null) {
          setFollow(false);
        } else {
          setFollow(true);
        }    
        //setLoading(false);
        if(res?.data?.data?.is_blocked !== null){
          setBlockData(res?.data?.data?.is_blocked)
          setIsBlocked(true)
        }else{
          setIsBlocked(false)
        }
      })
      .catch(function (error) {
       
        setLoading(false);
        
        errorMessage(errorHandler(error))
      });
  };


  const onFollow = () => {
    setLoadingFollow(true);
    let obj ={
      follower_id:user?.userData?.id,
      following_id:props?.route?.params?.userData?.userData?.id
    }
    let config = {
      method: 'post',
      url: FollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
     
        getEditorData();
        setFollow(true);
        setLoadingFollow(false);
      })
      .catch(function (error) {
      
        setLoadingFollow(false);
       
        errorMessage(errorHandler(error))
      });
  };


  const onUnFollow = () => {
    setLoadingFollow(true);
    let obj ={
      follower_id:user?.userData?.id,
      following_id:props?.route?.params?.userData?.userData?.id
    }

    let config = {
      method: 'post',
      url: UnfollowUrl,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
      data: obj,
    };

    axios
      .request(config)
      .then(async function (res) {
      
        getEditorData();
        setFollow(false);
        setLoadingFollow(false);
      })
      .catch(function (error) {
       
        setLoadingFollow(false);
       
        errorMessage(errorHandler(error))
      });
  };


  const blockUser = () =>{
    // setLoadingFollow(true);
    let config = {
      method: 'post',
      url: BlockUser + props?.route?.params?.userData?.userData?.id,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        getEditorData();
        setIsBlocked(true)
        // setLoadingFollow(false);
      })
      .catch(function (error) {
        console.log(error.response.data)

        errorMessage(errorHandler(error))
      });
  }


  const unBlockUser = () =>{
    let config = {
      method: 'post',
      url: UnblockUser + props?.route?.params?.userData?.userData?.id,
      headers: {
        Authorization: `Bearer ${user?.token}`,
        Accept: 'application/json',
      },
    };

    axios
      .request(config)
      .then(async function (res) {
        getEditorData();
      })
      .catch(function (error) {
        console.log(error.response.data)

        errorMessage(errorHandler(error))
      });
  }

  return (
    <ScrollView>
      {loading ? (
        <View style={{flex: 1}}>
          {/* <SkypeIndicator color={'black'} /> */}
          <SkeletonEditorProfileComp/>
        </View>
      ) : (
        <>
        <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.editorProfile}>
              <ImageBackground
                
                source={data?.profile_image!==null?{uri: data?.profile_image?.original_url}:IMAGES.profileIcon3}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain">
                {props?.route?.params?.userData?.userData?.id ===
                  user?.userData?.id ? (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('settingsScreen', {user: user})
                    }
                    style={styles.iconWrap}>
                    <ICONS.Ionicons
                      name="menu-outline"
                      size={44}
                      color="black"
                    />
                  </TouchableOpacity>
                ):
                blockData?.blocked_user_id !== user?.userData?.id &&
                (
                <TouchableOpacity style={[
                styles.followButton,
                { backgroundColor: isBlocked ? 'white' : 'white',
                position: 'absolute', 
                right: wp2(4) },
              ]}
              onPress={() => {
                if (isBlocked) {
                  unBlockUser();
                } else {
                  blockUser();
                }
              }}
              >
                <Text style={{
                  fontWeight: '500',
                  color: isBlocked? 'black' : 'black',
                  fontSize: rfv(13),
                }}>{isBlocked ? 'Unblock User' : 'Block User'}</Text>

              </TouchableOpacity>)
                
                }
                <View style={styles.nameContainer}>
                
                  <Text style={styles.usernameTxt}>{data?.username}</Text>
                  {props?.route?.params?.userData?.userData?.id !==
                    user?.userData?.id && (
                    <>
                      {user?.token !== '' && !isBlocked && (
                        <TouchableOpacity
                          disabled={loadingFollow}
                          onPress={() => {
                            if (!follow) {
                              onFollow();
                            } else {
                              onUnFollow();
                            }
                          }}
                          style={[
                            styles.followButton,
                            {backgroundColor: follow ? 'white' : 'black'},
                          ]}>
                          {loadingFollow ? (
                            <SkypeIndicator
                              color={follow ? 'black' : 'white'}
                            />
                          ) : (
                            <Text
                              style={{
                                fontWeight: '700',
                                color: follow ? 'black' : 'white',
                                fontSize: rfv(13),
                              }}>
                              {follow ? 'FOLLOWING' : 'FOLLOW'}
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              </ImageBackground>
            </View>
            {
            isBlocked? 
            <Text style ={styles.blockedtext}>
            {blockData?.blocked_user_id === user?.userData?.id ? 'This user blocked you' : 'You blocked this user'}
            </Text>
            :
            <>
            <View style={styles.followersContainer}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  props.navigation.navigate('followerList', {
                    list: 'following',
                    id: props?.route?.params?.userData?.userData?.id,
                  })
                }>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {data?.followers_count}
                </Text>
                <Text style={{color: 'black'}}> FOLLOWING </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  props.navigation.navigate('followerList', {
                    list: 'follower',
                    id: props?.route?.params?.userData?.userData?.id,
                  })
                }>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {data?.followings_count}
                </Text>
                <Text style={{color: 'black'}}> FOLLOWERS</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: hp2(2)}}>
              <Text style={styles.favBrandsTxt}>FAVOURITE BRANDS</Text>
             
              {data?.fav_brands?.length!==0?(
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
               {data?.fav_brands?.map((item,index)=>{
                 return(
                   <BrandComp data={item} key={index} />
                 )
               })}
             </ScrollView>
            ):(
              <View style={{alignItems:'center',justifyContent:'center',flex:1,}}><Text>Favourite Brands Not Available</Text></View>
            )}

              <Wardrobe user={props?.route?.params?.userData} />

              {props?.route?.params?.userData?.userData?.id === user?.userData?.id && (
                  <NextPickup data={data} />
              )}
            </ScrollView>
            </>
          }
       
          </View>
        </SafeAreaView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,

  },
  editorProfile: {
    width: wp2(100),
    height: hp(32),
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    borderBottomLeftRadius: wp2(4),
    borderBottomRightRadius: wp2(4),
    overflow: 'hidden',
  },
  iconWrap: {
    alignSelf: 'flex-end',
   
    marginRight: wp2(2),
    marginTop: hp2(1),
  },
  notificationBadge: {
    width: wp2(5),
    height: wp2(5),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2ABA',
    position: 'absolute',
    right: wp2(1),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp2(2),
    position: 'absolute',
    bottom: hp2(1.5),
    width: wp2(100),
  },
  followButton: {
    width: wp2(34),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favBrandsTxt: {
    fontWeight: '600',
    fontSize: rfv(18),
    color: 'black',
    marginVertical: hp2(2),
    marginLeft: wp2(2),
  },
  usernameTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(22),
  },
  followersContainer: {
    flexDirection: 'row',
    marginLeft: wp2(4),
    marginVertical: hp2(1),
  },
  blockedtext:{
    color: 'black',
    fontWeight: '700',
    alignSelf:'center',
    marginTop:hp2(20),
    fontSize: rfv(15),
  }
});
