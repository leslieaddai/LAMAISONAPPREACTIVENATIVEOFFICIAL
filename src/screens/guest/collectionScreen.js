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
import CollectionItemsComp from '../../components/collectionItemsComp';

export default function CollectionScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.collectionText}>COLLECTION</Text>
      </View>
      <Text style={styles.text}>Spring/Summer ‘23 - The initial</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',paddingTop:hp2(2),paddingBottom:hp2(12),justifyContent:'space-between'}}>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
      <CollectionItemsComp/>
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
    marginTop: hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  collectionText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
  },
  text:{
    color:'black',
    fontWeight:'600',
    fontSize:rfv(22),
    alignSelf:'center',
    marginTop:hp2(3),
  },
});
