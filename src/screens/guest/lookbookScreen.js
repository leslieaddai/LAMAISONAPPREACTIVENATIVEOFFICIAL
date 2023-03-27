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
import BottomComp from '../../components/bottomComp';
import CollectionComp from '../../components/collectionComp';

export default function LookbookScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.lookbookText}>Lookbook</Text>
      </View>
      <Text style={styles.collectionText}>Latest Collection</Text>
      <Text style={{fontWeight: '600', color: 'black',marginLeft:wp2(6),}}>
        Spring/Summer ‘23 - The Initial
      </Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('collectionScreen')} style={styles.imageContainer}>
      <Image
            source={IMAGES.lookbook}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
      </TouchableOpacity>
      <Text style={styles.collectionText}>All Collections</Text>
     <View>
     <ScrollView contentContainerStyle={{paddingHorizontal:wp2(4),paddingVertical:hp2(1)}} horizontal showsHorizontalScrollIndicator={false}>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
      </ScrollView>
     </View>

      <TouchableOpacity onPress={()=>props.navigation.navigate('selectCoverPhoto')} style={styles.button}>
          <Text style={{color: 'white'}}>CREATE COLLECTION</Text>
        </TouchableOpacity>

      <BottomComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    marginBottom:hp2(2),
  },
  lookbookText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
  collectionText: {
    color: 'black',
    fontWeight: '600',
    fontSize: rfv(22),
    marginLeft:wp2(6),
    marginBottom:hp2(0.5),
  },
  imageContainer: {
    width: wp2(84),
    height: hp2(22),
    overflow:'hidden',
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
    alignSelf:'center',
    marginVertical:hp2(1),
  },
  button: {
    width: wp2(48),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:hp2(2),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
