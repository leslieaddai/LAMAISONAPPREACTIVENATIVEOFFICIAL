import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  PermissionsAndroid, 
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
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export default function ImageUploadScreen(props) {

  const [photos, setPhotos]=useState();
  const [selectedImage, setSelectedImage]=useState();
  const [nextButton, setNextButton]=useState(false);
  const [confirmButton, setConfirmButton]=useState(false);
  const [uploadButton, setUploadButton]=useState(false);

  useEffect(()=>{
    async function runThis () {
      if (Platform.OS === "android" && (await hasAndroidPermission())) {
        showPhotos();
      }
    }
    runThis();
  },[])

  async function hasAndroidPermission() {
    const permission = Platform.Version >= 33 ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function showPhotos() {
    // if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    //   return;
    // }
    const result = await CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => {
      setPhotos(r.edges);
    })
    .catch((err) => {
       //Error Loading Images
       console.log(err)
    });
    //console.log(result);
  };

  if (uploadButton){
    return(
      <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" />
        <Text style={{marginTop:hp2(2),color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16)}}>Successfully Uploaded!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
     
      {selectedImage && !nextButton?(
        <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Gallery</Text>
        <TouchableOpacity onPress={()=>setNextButton(true)} style={styles.button}>
          <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>NEXT</Text>
        </TouchableOpacity>
      </View>
      ):nextButton?(
        <View style={[styles.headWrap,{justifyContent:'center'}]}>
         <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Gallery</Text>
      </View>
      ):(
        <View style={[styles.headWrap,{justifyContent:'center'}]}>
        <Text style={styles.heading}>Gallery</Text>
      </View>
      )}

      <View style={styles.imageContainer}>
      {selectedImage? (<Image
        source={{uri: selectedImage}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />):(<Text>Select Image</Text>)}
    </View>

     {nextButton?(
      <ScrollView contentContainerStyle={{paddingVertical:hp2(1)}}>
      <View style={styles.inputBox}>
          <TextInput
            style={{
              flex: 1,
              color: 'black',
              paddingHorizontal: wp2(2),
              fontSize: rfv(13),
              fontWeight: '700',
            }}
            placeholder="caption"
          />
        </View>
        <TouchableOpacity onPress={()=>confirmButton?setUploadButton(true):setConfirmButton(true)} style={[styles.button,{width:wp2(30),alignSelf:'flex-end',marginRight:wp2(10)}]}>
          <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>{confirmButton?'UPLOAD':'CONFIRM'}</Text>
        </TouchableOpacity>
      </ScrollView>
     ):(
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: hp2(2),flexDirection:'row',flexWrap:'wrap',paddingHorizontal:wp2(2),}}>
       {photos?.map((p, i) => {
       return (
         <TouchableOpacity onPress={()=>setSelectedImage(p.node.image.uri)} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
         <Image
            key={i}
            source={{ uri: p.node.image.uri }}
           style={{width: '100%', height: '100%'}}
           resizeMode="cover"
         />
        {selectedImage===p.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
       </TouchableOpacity>
       );
     })}
     </ScrollView>
     )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    width:wp2(92),
    flexDirection: 'row',
    marginVertical: hp2(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(26),
    fontWeight: '700',
  },
  button: {
    width: wp2(22),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    width: wp2(94),
    height: hp2(36),
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  inputBox: {
    width: wp2(80),
    height: hp2(6),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(2),
    alignSelf:'center',
  },
});
