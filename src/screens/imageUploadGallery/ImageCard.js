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

const ImageCard = (props) => {
        return (
            <TouchableOpacity onPress={()=>props.state.setSelectedImage(props.item.node.image.uri)} key={props.key} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
            <Image
               key={props.key}
               source={{ uri: props.item.node.image.uri }}
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
            />
           {props.state.selectedImage===props.item.node.image.uri && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
          </TouchableOpacity>
        );
    };
    
 export default memo(ImageCard);