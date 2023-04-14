import React, {useState} from 'react';
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
import BottomComp from '../../components/bottomComp';
import Category from '../../components/FTS100Comps/category';
import BrandComp from '../../components/FTS100Comps/brands';

export default function FTS100(props) {
  const [selected,setSelected]=useState('');
  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
      <Text style={styles.ftsText}>FTS 100</Text>

      <View style={{height:hp2(7)}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        {/* <Category text="top 100" state={{selected,setSelected}} />
        <Category text="streetwear" state={{selected,setSelected}} />
        <Category text="sportswear" state={{selected,setSelected}} />
        <Category text="nightlife" state={{selected,setSelected}} />
        <Category text="formalwear" state={{selected,setSelected}} />
        <Category text="outdoorswear" state={{selected,setSelected}} />
        <Category text="beachwear" state={{selected,setSelected}} /> */}

        <Category text="activewear" state={{selected,setSelected}} />
        <Category text="beachwear" state={{selected,setSelected}} />
        <Category text="casualwear" state={{selected,setSelected}} />
        <Category text="formalwear" state={{selected,setSelected}} />
        <Category text="nightlife" state={{selected,setSelected}} />
        <Category text="outdoor" state={{selected,setSelected}} />
        <Category text="streetwear" state={{selected,setSelected}} />
        
      </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop:hp2(1),paddingBottom:hp2(12),}}>
        <BrandComp rank={1} />      
        <BrandComp rank={2} /> 
        <BrandComp rank={3} /> 
        <BrandComp rank={4} />  
        <BrandComp rank={5} />  
        <BrandComp rank={6} />  
        <BrandComp rank={7} />  
        <BrandComp rank={8} />  
        <BrandComp rank={9} />  
        <BrandComp rank={10} />  
        <BrandComp rank={11} />  
        <BrandComp rank={12} />  
      </ScrollView>

      <BottomComp />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  ftsText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(28),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignSelf: 'center',
  },
});
