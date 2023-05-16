import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from 'react-native-responsive-fontsize';
import {
  wp2,
  hp2
} from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function CollectionComp(props) {
  const navigation = useNavigation();
  return (
    <View>
    
    <View style={{width:wp2(54),alignItems:'center'}}>
    <Text style={{color:'black',fontSize:rfv(10)}}>{props?.name}</Text>
    </View>
    
     <TouchableOpacity onPress={() => 
     navigation.navigate('collectionScreen',{collection:props?.itemscollection,collectionname:props?.name})} 
     style={styles.imageContainer}>
      <Image
        source={props?.uri}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </TouchableOpacity>
    </View>
   
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp2(48),
    height: hp2(30),
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: wp2(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: wp2(3),
    marginTop:hp2(1),
  },
});
