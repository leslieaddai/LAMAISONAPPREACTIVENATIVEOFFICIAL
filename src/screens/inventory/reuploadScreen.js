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
  Animated,
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
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import ColorBox from '../../components/colorBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ReuploadScreen(props) {

    const scrollX = new Animated.Value(0);

    const [nextButton,setNextButton]=useState(false);
    const [confirmButton,setConfirmButton]=useState(false);
    const [uploadButton, setUploadButton]=useState(false);  

  const stylesDropdown = ["BEACHWEAR", "CASUALWEAR", "FORMALWEAR", "NIGHTLIFE","OUTDOORWEAR","SPORTSWEAR","STREETWEAR"];
  const [isOpened,setIsOpened]=useState(false);
  const [selectedText, setSelectedText]=useState('SELECT STYLE');

  const [colorBox, setColorBox]=useState(false);

  if (uploadButton){
    return(
      <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" />
        <Text style={{marginTop:hp2(2),color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16)}}>Successfully Uploaded!</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

        <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Lookbook</Text>
      </View>
     
        <View style={styles.scrollViewWrap}>
              <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}>
              
                     <View style={styles.imageContainer}>
                     <Image 
                   source={IMAGES.randomPic}
                   style={{width: '100%', height: '100%'}}
                   resizeMode="cover"
                 />
               </View>
            </Animated.ScrollView>
            <View
              style={{
                width: wp2(94),
                position: 'absolute',
                zIndex: 999,
                bottom: hp2(1),
              }}>
              <RNAnimatedScrollIndicators
                numberOfCards={1}
                scrollWidth={wp2(94)}
                activeColor={'#707070'}
                inActiveColor={'#D9D9D9'}
                scrollAnimatedValue={scrollX}
              />
            </View>
          </View>

<ScrollView contentContainerStyle={{paddingVertical:hp2(1)}}>
     {nextButton && !confirmButton && !colorBox ? (
        <View style={styles.inputBox}>
        <TextInput
          style={{
            flex: 1,
            color: 'black',
            paddingHorizontal: wp2(2),
            fontSize: rfv(13),
            fontWeight: '700',
          }}
          placeholder="QUANTITY"
        />
      </View>
     ):confirmButton && !colorBox ?(
        <KeyboardAwareScrollView contentContainerStyle={{paddingVertical:hp2(1)}}>
        <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder="PRODUCT NAME"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder="DESCRIPTION"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder="FREE SHIPPING TO ALL REGIONS"
            />
          </View>
          <View style={styles.inputBox}>
            <TextInput
              style={{
                flex: 1,
                color: 'black',
                paddingHorizontal: wp2(2),
                fontSize: rfv(13),
                fontWeight: '700',
              }}
              placeholder="PRICE"
            />
          </View>

          <TouchableOpacity onPress={()=>setColorBox(true)} style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>COLOR</Text>
          </TouchableOpacity>
  
          <View style={[styles.inputBox,{flexDirection:'row',alignItems:'center',paddingHorizontal:wp2(2),justifyContent:'space-between'}]}>
              <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>{selectedText}</Text>
              <TouchableOpacity onPress={()=>isOpened?setIsOpened(false):setIsOpened(true)}>
              <ICONS.FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A1A1A1'} size={22} />
              </TouchableOpacity>
          </View>
  
          {isOpened && (
              <View style={[styles.inputBox,{marginVertical:hp2(0),height:hp2(42),overflow:'hidden'}]}>     
                  {stylesDropdown.map((item,index)=>(
                      <TouchableOpacity onPress={()=>{setSelectedText(item); setIsOpened(false);}} key={index} style={{width:wp2(80),height:hp2(6),alignItems:'center',justifyContent:'center',backgroundColor:selectedText===item?"#F6F5F3":"white",borderRadius:wp2(2),overflow:'hidden'}}>
                      <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>{item}</Text>
                      </TouchableOpacity>
                  ))}
          </View>
          )}
  
          <TouchableOpacity onPress={()=>setUploadButton(true)} style={[styles.button,{width:wp2(36),alignSelf:'center',marginTop:hp2(1)}]}>
            <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>REUPLOAD</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
     ):colorBox?(
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(2)}}>
        <Text style={{color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16),alignSelf:'center'}}>Select all colours for this piece</Text>
        <View style={styles.colorsWrap}>
  <ColorBox color="black"/>
  <ColorBox color="white"/>
  <ColorBox color="#A1A1A1"/>
  <ColorBox color="#F61616"/>
  <ColorBox color="#008000E8"/>
  <ColorBox color="#0000FF"/>
  <ColorBox color="#5C4033"/>
  <ColorBox color="#FF69B4"/>
  <ColorBox color="#FAFA33"/>
  <ColorBox color="#FFA500"/>
  <ColorBox color="#800080"/>
  <ColorBox color="#F5F5DC"/>
  </View>
    </ScrollView>
     ):(
         <TouchableOpacity style={[styles.inputBox,{justifyContent:'center',paddingHorizontal: wp2(2),}]}>
         <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>SIZES AVAILABLE</Text>
         </TouchableOpacity>
     )}

        {!confirmButton && (
            <TouchableOpacity onPress={()=>nextButton?setConfirmButton(true):setNextButton(true)} style={[styles.button,{width:wp2(26),alignSelf:'flex-end',marginRight:wp2(10),marginTop:hp2(6)}]}>
            <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>NEXT</Text>
          </TouchableOpacity>
        )}
       
      </ScrollView>
   
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    width:wp2(100),
    flexDirection: 'row',
    marginVertical: hp2(4),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'center',
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
    marginVertical: hp2(1),
    alignSelf:'center',
  },
  scrollViewWrap: {
    width: wp2(94),
    height: hp2(36),
    overflow: 'hidden',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems:'center',
    justifyContent:'center',
  },
  colorsWrap:{
    width:wp2(96),
    flexDirection:'row',
    flexWrap:'wrap',
    alignSelf:'center',
  },
});
