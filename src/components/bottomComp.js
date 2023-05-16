import React, {useState,useEffect} from 'react';
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
import fonts from '../theme/fonts';
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
} from '../theme';
import { useNavigation } from '@react-navigation/native';

import { errorMessage,successMessage } from '../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../config/helperFunction';
import { LogoutUrl } from '../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function BottomComp(props) {
  //console.log(props);

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [data,setData]=useState([]);
  const user = useSelector(state => state.userData)
  const basket = useSelector(state => state.basket)

  //console.log(basket.count);

  //console.log(user.userData.role[0].id);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity   onPress={() => navigation.navigate('FTS100')}  style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.fts2}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity   onPress={() => navigation.navigate('searchScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.search2}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        {/* <Text style={styles.iconText}>Discovery</Text> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('homeScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.home2}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        {/* <Text style={styles.iconText}>Home</Text> */}
      </TouchableOpacity>
      {user?.userData?.role?.[0]?.id!==3 && 
      <TouchableOpacity onPress={() => navigation.navigate('basketScreen')} style={{alignItems: 'center'}}>
      <View style={styles.iconWrap}>
        <Image
          source={IMAGES.bag2}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
      {basket?.count > 0 && 
              <View style={styles.basketCounter}>
              <Text style={{color:'white',fontSize:rfv(10)}}>{basket?.count}</Text>
          </View>
      }
      {/* <Text style={styles.iconText}>Basket</Text> */}
    </TouchableOpacity>
    }
      <TouchableOpacity onPress={() => user?.userData?.role?.[0]?.id===3?navigation.navigate('brandProfileScreen',{userData:user}):user?.userData?.role?.[0]?.id===2?navigation.navigate('editorProfileScreen',{userData:user}):navigation.navigate('guestScreen')} style={{alignItems: 'center'}}>
        <View style={styles.iconWrap}>
          <Image
            source={IMAGES.profileicon2}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
        </View>
        {/* <Text style={styles.iconText}>Profile</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp2(100),
    height: hp2(8),
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  iconWrap: {
    width: wp2(8),
    height: wp2(8),
    overflow: 'hidden',
  },
  iconText: {
    color: '#A1A1A1',
    fontWeight: '700',
  },
  basketCounter:{
    width:wp2(5),
    height:wp2(5),
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0F2ABA',
    position:'absolute',
    right:wp2(-1),
    top:wp2(-1),
  },
});
