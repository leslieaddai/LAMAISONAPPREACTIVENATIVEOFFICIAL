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
import InventoryComp from '../../components/inventoryComp';

export default function Inventory(props) {

  return (
    <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
      <Text style={styles.heading}>Inventory</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: hp2(2),
          paddingBottom:hp2(12),
          justifyContent: 'space-between',
        }}>
       <InventoryComp value={300} />
       <InventoryComp value={0} />
       <InventoryComp value={200} />
       <InventoryComp value={620} />
       <InventoryComp value={110} />
       <InventoryComp value={0} />
       <InventoryComp value={20} />
       <InventoryComp value={12} />
       <InventoryComp value={330} />
       <InventoryComp value={18} />
       <InventoryComp value={0} />
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
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(19),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
