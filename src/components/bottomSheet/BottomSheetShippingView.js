import {  
    StyleSheet,
    View,
    Text,
    Button,
    Dimensions,
    Image,
    Pressable,
    TextInput,
    SafeAreaView,
    Alert,
    ScrollView,
    TouchableOpacity} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import icons from '../../theme/icons';
import React , {useCallback, useRef, useMemo, useState, useEffect}from 'react'

const BottomSheetShippingView = (
Data,
uibottomesheetvisiblity,
addRegions,
regions
) => {

 
    const width = Dimensions.get('screen').width / 3;
    const changebottomsheetvisibility = (Bool,item) => {
        uibottomesheetvisiblity(Bool);
        addRegions(item)
    
      };
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.container,{height: '35%',marginBottom:hp(2)}]}>
        <View style={[styles.styleBox]}>
                 {Data?.Data?.map((item, index) => ( 
                     <TouchableOpacity
                     onPress={() => {
                        changebottomsheetvisibility(false,item)
                    }}
                     key={index}
                     style={styles.itemWrap}>
                     <Text style={styles.itemTxt}>{item?.name}</Text>
                     <icons.AntDesign
                       name={
                         regions?.some(e => e?.regionId === item?.shipping_id)
                           ? 'checkcircle'
                           : 'checkcircleo'
                       }
                       size={24}
                       color={
                         regions?.some(e => e?.regionId === item?.shipping_id)
                           ? 'black'
                           : 'lightgray'
                       }
                       style={{position: 'absolute', right: 10}}
                     />
                   </TouchableOpacity>
                 ))}
              </View>
        </ScrollView>
      </View>
    );
}

export default BottomSheetShippingView

const styles = StyleSheet.create({
    container: {
      width:wp('100'),
      flexDirection: 'column',
      backgroundColor: '#D3D3D3',
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
    },
    Text: {
      fontSize: 15,
      fontWeight: 'bold',
      padding: 2,
    },
    TextInput: {
      fontSize: 14,
    },
    Button: {
      backgroundColor: 'white',
      borderColor: 'black',
      shadowRadius: 12,
      borderRadius: 12,
      width: 100,
      shadowOpacity: 0.4,
      shadowOffset: {height: 0, width: 1},
      shadowColor: 'grey',
    },
    CardView:{
      width:wp('95'),
      height:hp('6'),
      marginVertical:hp('1'),
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:wp('4'),
      borderRadius:10,
      backgroundColor:'white'
    },
    itemTxt: {
      color: 'black',
      fontWeight: '700',
      fontSize: rfv(13),
      position: 'absolute',
      left: 10,
    },
    itemWrap: {
      flexDirection: 'row',
      width: wp(90),
      height: hp(6),
      alignSelf:"center",
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: wp(2),
      overflow: 'hidden',
      backgroundColor:'white',
      marginVertical:hp(1)
    },
    styleBox: {
      width: wp(100),
      backgroundColor: '#D3D3D3',
      borderRadius: wp(4),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
      overflow: 'hidden',
      alignSelf: 'center',
    },
  });