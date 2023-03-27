import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  ImageBackground,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';

export default function ImageViewScreen(props) {
  const scrollX = new Animated.Value(0);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>props.navigation.goBack()}
        style={{
          marginLeft: wp2(3),
          marginTop: hp2(4),
          position: 'absolute',
          zIndex: 999,
        }}>
        <ICONS.AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}>
        <View style={{width: wp2(100), height: hp2(100)}}>
          <Image
            source={IMAGES.vinDiesel}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>

        <View style={{width: wp2(100), height: hp2(100)}}>
          <Image
            source={IMAGES.randomPic}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>

        <View style={{width: wp2(100), height: hp2(100)}}>
          <Image
            source={IMAGES.vinDiesel}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>

        <View style={{width: wp2(100), height: hp2(100)}}>
          <Image
            source={IMAGES.randomProfile}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
          />
        </View>
      </Animated.ScrollView>
      <View
        style={{
          width: wp2(100),
          position: 'absolute',
          bottom: hp2(3),
          zIndex: 999,
        }}>
        <RNAnimatedScrollIndicators
          numberOfCards={4}
          scrollWidth={wp2(100)}
          activeColor={'#707070'}
          inActiveColor={'#D9D9D9'}
          scrollAnimatedValue={scrollX}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
