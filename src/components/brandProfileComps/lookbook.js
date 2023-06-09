import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
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
import { useNavigation } from '@react-navigation/native';

  export function ImgComp  (props)  {
    return(
      <View style={styles.imageContainer}>
      <Image
        //source={IMAGES.randomPic}
        source={{uri:props?.path?.item?.media?.[0]?.original_url}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </View>
    )
  }

export default function Lookbook(props) {
  //console.log(props.data.data,'=======>')
  const navigation = useNavigation();

  return (
    <>
      {/* <TouchableOpacity  onPress={() => navigation.navigate('lookbookScreen')} style={styles.lookbook}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: rfv(24)}}>
          LOOKBOOK
        </Text>
      </TouchableOpacity> */}
      <View style={styles.galaryContainer}>
        {props?.data?.galleries?.reverse().map((item,index)=>{
          if(index<6) return <ImgComp key={index} path={{item}} />
        })}
      </View>

      {/* <FlatList 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{alignSelf:'center',}}
    numColumns={3}
     data={props.data.data}
      renderItem={({item,i})=>{
        return(
          imgComp(item.media[0].original_url)
        )
      }}

     /> */}

    </>
  );
}

const styles = StyleSheet.create({
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
  galaryContainer: {
    width: wp2(90),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  imageContainer: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
  },
});
