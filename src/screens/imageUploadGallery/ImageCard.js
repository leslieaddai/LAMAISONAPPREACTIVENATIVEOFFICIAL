import React, {useState,useEffect,useCallback,memo} from 'react';
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
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import FastImage from 'react-native-fast-image';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { LoginUrl } from '../../config/Urls';
import { useDispatch,useSelector,connect } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

const ImageCard = (props) => {
  const dispatch = useDispatch()
  console.log(props.item.node.image.uri);
  //const [myState,setMyState]=useState();
        return (
            <TouchableOpacity 
            onPress={()=>
              //props.state.setSelectedImage(props.item.node.image.uri)
              dispatch({
                type: 'setSelectedImage',
                payload: props.item.node.image.uri,
              })
            }
            //onPress={()=>setMyState(props.item.node.image.uri)} 
            key={props.key} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
            <Image
               key={props.key}
               source={{ uri: props.item.node.image.uri }}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
            {/* <FastImage
             key={props.key}
             source={{ uri: props.item.node.image.uri, priority: FastImage.priority.normal,}}
            style={{width: '100%', height: '100%'}}
            resizeMode={FastImage.resizeMode.cover}
            /> */}
           {/* {myState===props.item.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)} */}
           {props.ImageUpload.selectedImage===props.item.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
          </TouchableOpacity>
        );
    };
  
    const mapStateToProps = (state) => {
      const ImageUpload = state.ImageUpload
      return {
        ImageUpload,
      };
    };
 
 export default connect(mapStateToProps, null)(memo(ImageCard));
 //export default memo(ImageCard);