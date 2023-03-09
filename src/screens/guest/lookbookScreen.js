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
        <TouchableOpacity style={{position: 'absolute', left: wp(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.lookbookText}>Lookbook</Text>
      </View>
      <Text style={styles.collectionText}>Latest Collection</Text>
      <Text style={{fontWeight: '600', color: 'black',marginLeft:wp(6),}}>
        Spring/Summer ‘23 - The Initial
      </Text>
      <View style={styles.imageContainer}>
      <Image
            source={IMAGES.lookbook}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
      </View>
      <Text style={styles.collectionText}>All Collections</Text>
      <Text style={{color:'black',textAlign:'center'}}>Winter/Fall ‘22 - The Last Dance</Text>
      <ScrollView contentContainerStyle={{paddingHorizontal:wp(4),}} horizontal>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
        <CollectionComp/>
      </ScrollView>
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
    marginTop: hp(5),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
    marginBottom:hp(2),
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
    marginLeft:wp(6),
    marginBottom:hp(1),
  },
  imageContainer: {
    width: wp(84),
    height: hp(24),
    overflow:'hidden',
    backgroundColor: 'white',
    borderRadius: wp(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf:'center',
    marginVertical:hp(3),
  },
});
