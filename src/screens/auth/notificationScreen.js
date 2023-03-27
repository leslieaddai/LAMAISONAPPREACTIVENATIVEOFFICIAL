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
import LineComp from '../../components/lineComp';
import NotificationComp from '../../components/notificationComp';

export default function NotificationScreen(props) {
  return (
    <View style={styles.container}>
        <View style={styles.headWrap}>
            <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginLeft:wp2(3),marginRight:wp2(5)}}>
            <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.notificationText}>Notifications </Text>
        </View>
        <ScrollView contentContainerStyle={{paddingBottom:hp2(12),}}>
        <LineComp/>
        <NotificationComp follow={false}/>
        <NotificationComp follow={true}/>
        <NotificationComp follow={false}/>
        <NotificationComp follow={true}/>
        <LineComp/>
        <NotificationComp follow={false}/>
        <NotificationComp follow={true}/>
        <NotificationComp follow={false}/>
        <NotificationComp follow={true}/>
        </ScrollView>
      <BottomComp/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap:{
    flexDirection:'row',
    marginTop:hp2(4),
    alignItems:'center',
  },
  notificationText:{
    color:'black',
    fontWeight:'700',
    fontSize:rfv(28),
  },

});
