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
//import SelectDropdown from 'react-native-select-dropdown';
import ColorBox from '../../components/colorBox';
import QuantityComp from '../../components/quantityComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function ImageUploadLookbook(props) {

    const scrollX = new Animated.Value(0);

  const [photos, setPhotos]=useState();
  const [selectedImage, setSelectedImage]=useState([]);
  const [nextButton, setNextButton]=useState(false);
  const [showQuantity, setShowQuantity]=useState(false);
  const [confirmButton,setConfirmButton]=useState(false);
  const [uploadButton, setUploadButton]=useState(false);

  const stylesDropdown = ["BEACHWEAR", "CASUALWEAR", "FORMALWEAR", "NIGHTLIFE","OUTDOORWEAR","SPORTSWEAR","STREETWEAR"];
  const [isOpened,setIsOpened]=useState(false);
  const [selectedText, setSelectedText]=useState('SELECT STYLE');

  const [colorBox, setColorBox]=useState(false);
  const [addQuantity, setAddQuantity]=useState([1]);

  console.log(selectedImage);

  useEffect(()=>{
    async function runThis () {
      if (Platform.OS === "android" && (await hasAndroidPermission())) {
        showPhotos();
      }
      if(Platform.OS==='ios'){
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
    <SafeAreaView style={styles.container}>
     
      {selectedImage.length!==0 && !nextButton?(
        <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Lookbook</Text>
        <TouchableOpacity onPress={()=>setNextButton(true)} style={styles.button}>
          <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>NEXT</Text>
        </TouchableOpacity>
      </View>
      ):nextButton?(
        <View style={[styles.headWrap,{justifyContent:'center'}]}>
         <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>Lookbook</Text>
      </View>
      ):(
        <View style={[styles.headWrap,{justifyContent:'center'}]}>
        <Text style={styles.heading}>Lookbook</Text>
      </View>
      )}

      {selectedImage.length!==0?(
        <View style={styles.scrollViewWrap}>
              <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}>
                {selectedImage.map((item,index)=>(
                     <View key={index} style={styles.imageContainer}>
                     <Image 
                   source={{uri: item}}
                   style={{width: '100%', height: '100%'}}
                   resizeMode="cover"
                 />
               </View>
                ))}
            </Animated.ScrollView>
            <View
              style={{
                width: wp2(94),
                position: 'absolute',
                zIndex: 999,
                bottom: hp2(1),
              }}>
              <RNAnimatedScrollIndicators
                numberOfCards={selectedImage.length}
                scrollWidth={wp2(94)}
                activeColor={'#707070'}
                inActiveColor={'#D9D9D9'}
                scrollAnimatedValue={scrollX}
              />
            </View>
          </View>
      ):(
        <View style={styles.imageContainer}>
        <Text>Select Image</Text>
        </View>
      )}

     {nextButton && !colorBox && !showQuantity && !confirmButton ?(
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
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.inputBox}>
          <Text>pieces</Text>
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
            placeholderTextColor={'grey'}
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
            placeholderTextColor={'grey'}
          />
        </View>
        <TouchableOpacity onPress={()=>setColorBox(true)} style={styles.inputBox}>
         <Text>colour</Text>
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
        
        {/* <SelectDropdown data={stylesDropdown} defaultButtonText="SELECT STYLE" buttonStyle={styles.inputBox} 
        buttonTextStyle={{color:'black',fontWeight:'700',fontSize:rfv(13),textAlign:'left'}}
        renderDropdownIcon={isOpened => {
            return <ICONS.FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#A1A1A1'} size={22} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={{backgroundColor:'white',borderRadius: wp2(4),overflow:'hidden',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 8,}}
          rowStyle={{borderBottomWidth:0,borderRadius:wp2(2),overflow:'hidden'}}
          rowTextStyle={{color:'black',fontWeight:'700',fontSize:rfv(13)}}
          selectedRowStyle={{backgroundColor:'#F6F5F3'}}
        /> */}

        <TouchableOpacity onPress={()=>setShowQuantity(true)} style={[styles.button,{width:wp2(30),alignSelf:'flex-end',marginRight:wp2(10),marginTop:hp2(1)}]}>
          <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>NEXT</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
     ):nextButton && colorBox ? (
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
     ):nextButton && showQuantity && !confirmButton ? (
       <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical:hp2(2)}}>
       {addQuantity.map((item,index)=>(
        <QuantityComp key={index} />
       ))}
       <TouchableOpacity onPress={()=>setAddQuantity([...addQuantity,1])} style={{alignSelf:'flex-end',marginRight:wp2(6),marginVertical:hp2(1)}}>
       <ICONS.AntDesign name="pluscircle" size={34} color="#162FAC" />
       </TouchableOpacity>
        <TouchableOpacity onPress={()=>setConfirmButton(true)} style={[styles.button,{width:wp2(30),alignSelf:'flex-end',marginRight:wp2(10),marginTop:hp2(1)}]}>
          <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>NEXT</Text>
        </TouchableOpacity>
       </KeyboardAwareScrollView>
     ):nextButton && confirmButton ? (
        <ScrollView contentContainerStyle={{paddingVertical:hp2(1)}}>

        <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
            <Text  style={{color:'black',fontWeight:'700',fontSize:rfv(13)}} >product name</Text>
        </View>
          <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
            <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>pieces</Text>
          </View>
          <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>description</Text>
          </View>
          <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>free shipping to all regions</Text>
          </View>
          <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>price</Text>
          </View>
          <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
           <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>colour</Text>
          </View>
          <View style={[styles.inputBox,{flexDirection:'row',alignItems:'center',paddingHorizontal:wp2(2),justifyContent:'space-between'}]}>
              <Text style={{color:'black',fontWeight:'700',fontSize:rfv(13)}}>{selectedText}</Text>
              <ICONS.FontAwesome name={'chevron-down'} color={'#A1A1A1'} size={22} />
          </View>

          <TouchableOpacity onPress={()=>setUploadButton(true)} style={[styles.button,{width:wp2(54),alignSelf:'center',marginTop:hp2(2)}]}>
            <Text style={{color: 'white',fontWeight:'700',fontSize:rfv(13)}}>ADD TO LOOKBOOK</Text>
          </TouchableOpacity>
          
        </ScrollView>
     ):(
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: hp2(2),flexDirection:'row',flexWrap:'wrap',paddingHorizontal:wp2(2),}}>
       {photos?.map((p, i) => {
       return (
         <TouchableOpacity onPress={()=>selectedImage.includes(p.node.image.uri)?(setSelectedImage(selectedImage.filter(e => e !== p.node.image.uri))):(setSelectedImage([...selectedImage,p.node.image.uri]))} key={i} style={{width:wp2(24),height:wp2(24),overflow:'hidden'}}>
         <Image
            key={i}
            source={{ uri: p.node.image.uri }}
           style={{width: '100%', height: '100%'}}
           resizeMode="cover"
         />
        {selectedImage.includes(p.node.image.uri) && ( <ICONS.AntDesign name="checkcircle" size={20} color="#0F2ABA" style={{position:'absolute',right:wp2(2),top:hp2(0.5),zIndex:999}} />)}
       </TouchableOpacity>
       );
     })}
     </ScrollView>
     )}
    </SafeAreaView>
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
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf:'center',
  },
  heading: {
    color: 'black',
    fontSize: rfv(22),
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
