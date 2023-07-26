import React, {useState, useEffect} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { GetPhone, UpdateProfile } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

import LoaderComp from '../../components/loaderComp';

export default function EditProfile(props) {
  const [images, setImages] = useState([]);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const [newnumber,setNewNumber] = useState('')
  useEffect(()=>{
    GetPhoneNumber()
  },[])
  const GetPhoneNumber = ()=>{
    axios
    .get(GetPhone, {
      headers: {Authorization: `Bearer ${user?.token}`},
    })
    .then(async function (res) {
      setNewNumber(res.data.data)
    })
    .catch(function (error) {
      console.log("error",error.response.data)
    });
  }
  const selectImage = async () => {
    const result = await launchImageLibrary({mediaType:'photo'});
    if (!result.didCancel) {

      console.log(result?.assets[0].fileSize/1024)
      if(result?.assets[0].type !== 'image/gif'){
        if(result?.assets[0].fileSize < 1572864){
          const uri = Platform.OS === "android" ? result?.assets[0]?.uri : result?.assets[0]?.uri.replace("file://", "");
          const filename = result?.assets[0]?.uri.split("/").pop();
          const match = /\.(\w+)$/.exec(filename);
          const ext = match?.[1];
          const type = match ? `image/${match[1]}` : `image`;
        
          setImages([{uri, name: filename, type}])
    
            //setImages(result.assets)
            //console.log(result.assets); 
        }else{
          errorMessage('The maximum file size allowed is 1.5mb.')
        }
      }else{
        errorMessage('Please select jpg or png image type.')
      }

      }
  }
  const onRemove = (id) => {
    var array = [...images];
    if (id !== -1) {
      array.splice(id, 1);
      //setImages(array);
    }
    setImages([]);
  };

  const uploadImage = () => {
    setLoading(true);

    var formdata = new FormData();
    formdata.append("image", images[0]);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: UpdateProfile,
  headers: { 
    'Authorization': `Bearer ${user?.token}`, 
    'Accept': 'application/json',
    "Content-Type": "multipart/form-data"
  },
  data : formdata
};

axios.request(config)
.then(async function (res) {
  console.log(res.data);
  dispatch({
    type: types.UpdateProfilePicture,
    payload: res.data.data.profile_image.original_url,
  });
  setImages([]);
  setLoading(false);
  successMessage('Profile Update Successfully');
}) 
.catch(function (error) {
  console.log(error.response.data)
  setLoading(false);
  //errorMessage('Upload Failed');
  errorMessage(errorHandler(error))
});

  }

  const settingOptions = (name, navScreen) => {
    return (
      <>
      {name == 'DISPLAY PHOTO' ? (
         <TouchableOpacity disabled={images.length>=1?true:false} onPress={selectImage} style={styles.filters}>
         <Text style={{color: 'black'}}>{name}</Text>
             <View style={styles.imageWrap}>
                {images.length >= 1 ? (
                      <>
                        <Image
                          source={{ uri: images[0].uri }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.removeImg}
                          onPress={() => onRemove(0)}
                        >
                          <ICONS.FontAwesome
                            name="times"
                            size={wp("3.5%")}
                            color="white"
                          />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Image
                          //source={IMAGES.randomProfile}
                          //source={{uri:user?.userData?.profile_image}}
                          source={user?.userData?.profile_image!==''?{uri:user?.userData?.profile_image}:IMAGES.profileIcon3}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="cover"
                      />
                    )}
             </View>
       </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled={name == 'USERNAME' || name == 'EMAIL' || name == 'BRAND NAME' ? true : false} onPress={()=>props.navigation.navigate(navScreen)} style={styles.filters}>
        <Text style={{color: 'black'}}>{name}</Text>
      
          {name == 'ABOUT' ? (
            <ICONS.MaterialIcons name="edit" size={24} color="black" />
          ) : name == 'PASSWORD' ? (
            <Text style={{color: 'black'}}>************</Text>
          ) : (
            <Text style={{color: 'black'}}>{name == 'USERNAME' ? user?.userData?.username : name == 'EMAIL' ? user?.userData?.email : name == 'BRAND NAME' ? user?.userData?.name :name == 'DOB'?user?.userData?.dob : name == 'PHONE'? newnumber!=''?newnumber:'XXXXXXXXXX' : 'XXXXXXXXXX'}</Text>
          )}
      
      </TouchableOpacity>
      )}
      </>
    );
  };
  return (
    <>
        <View style={{position:'absolute',zIndex:999}}>
{loading && (
      <LoaderComp/>
    )}
</View>
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>EDIT PROFILE</Text>
      </View>

      {settingOptions('DISPLAY PHOTO', 'brandProfileScreen')}
      {user?.userData?.role?.[0]?.id === 3 && (
        <>
        {settingOptions('ABOUT', 'about')}
        </>
      )}
       {user?.userData?.role?.[0]?.id === 3 && (
        <>
        {settingOptions('BRAND NAME', 'name')}
        {settingOptions('DOB', 'dobScreen')}
        </>
      )}
      {settingOptions('USERNAME', 'username')}
      {settingOptions('EMAIL', 'email')}
      {settingOptions('PHONE', 'phone')}
      {settingOptions('PASSWORD', 'passwordChange')}

      {images.length >= 1 && (
            <TouchableOpacity onPress={uploadImage} style={styles.button}>
              <Text style={{color:'white'}}>DONE</Text>
            </TouchableOpacity>
      )}

    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    width:wp2(100),
  },
  heading: {
    color: 'black',
    fontSize: rfv(24),
    fontWeight: '700',
  },
  filters: {
    flexDirection: 'row',
    width: wp2(90),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp2(2),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    overflow: 'hidden',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeImg: {
    position: "absolute",
    width: wp("5%"),
    height: wp("5%"),
    backgroundColor: "red",
    zIndex: 999999,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: "white",
  },
  button:{
    width:wp2(28),
    height:wp2(10),
    backgroundColor:'black',
    borderRadius:wp2(6),
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
    alignSelf:'center',
    //marginRight:wp2(6),
  },
});
