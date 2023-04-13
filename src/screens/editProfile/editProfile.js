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

export default function EditProfile(props) {
  const [images, setImages] = useState([]);
  
  const selectImage = async () => {
    const result = await launchImageLibrary({mediaType:'photo'});
    if (!result.didCancel) {
        setImages(result.assets)
        console.log(images);
      }
  }

  const onRemove = (id) => {
    var array = [...images];
    if (id !== -1) {
      array.splice(id, 1);
      setImages(array);
    }
  };

  const settingOptions = (name, navScreen) => {
    return (
      <>
      {name == 'DISPLAY PHOTO' ? (
         <TouchableOpacity onPress={selectImage} style={styles.filters}>
         <Text style={{color: 'black'}}>{name}</Text>
             <View style={styles.imageWrap}>
                {images.length >= 1 ? (
                      <>
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
                        <Image
                          source={{ uri: images[0].uri }}
                          style={{ width: "100%", height: "100%" }}
                          resizeMode="cover"
                        />
                      </>
                    ) : (
                      <Image
                          source={IMAGES.randomProfile}
                          style={{width: '100%', height: '100%'}}
                          resizeMode="cover"
                      />
                    )}
             </View>
       </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={()=>props.navigation.navigate(navScreen)} style={styles.filters}>
        <Text style={{color: 'black'}}>{name}</Text>
      
          {name == 'ABOUT' ? (
            <ICONS.MaterialIcons name="edit" size={24} color="black" />
          ) : (
            <Text style={{color: 'black'}}>XXXXXXXXXX</Text>
          )}
      
      </TouchableOpacity>
      )}
      </>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>EDIT PROFILE</Text>
      </View>

      {settingOptions('DISPLAY PHOTO', 'brandProfileScreen')}
      {props.route.params.user == 'brand' && (
        <>
        {settingOptions('ABOUT', 'about')}
        </>
      )}
      {settingOptions('USERNAME', 'username')}
      {settingOptions('EMAIL', 'email')}
      {settingOptions('PHONE', 'phone')}
      {settingOptions('PASSWORD', 'passwordChange')}

      {images.length >= 1 && (
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'white'}}>DONE</Text>
            </TouchableOpacity>
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
