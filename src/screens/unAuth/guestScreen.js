import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  RFPercentage as rfp,
  RFValue as rfv,
} from "react-native-responsive-fontsize";
import fonts from "../../theme/fonts";
import { IMAGES,ICONS,COLORS,SIZES,screenHeight,screenWidth,wp2,hp2,getFont,FONTS } from "../../theme";

export default function GuestScreen() {
  return (
    <View style={styles.container}>
        <Text>GuestScreen</Text>
        <ICONS.AntDesign name={"check"} size={16} color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems:'center',
    justifyContent:'center',
  },
});