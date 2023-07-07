import React, {useState,useEffect} from 'react';
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
  FlatList,
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
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {Popular,Newsfeed} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function PostCompListView(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [page, setPage] = useState();
  const [pageNo, setPageNo] = useState();
  const user = useSelector(state => state.userData);

  const [showDelete, setShowDelete] = useState(false);

  const [heart, setHeart] = useState(false);
  const [share, setShare] = useState(false);
  const [hanger, setHanger] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={{marginVertical: hp2(1)}}>
    <View style={styles.postWrap}>
      <TouchableOpacity
        onPress={() => navigation.navigate('brandProfileScreen')}
        style={styles.imageWrap}>
        <Image
          source={IMAGES.randomProfile}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          showDelete ? setShowDelete(false) : setShowDelete(true);
        }}>
        {showDelete ? (
          <View style={styles.deleteButton}>
            <Text style={{color: 'black'}}>Delete Post</Text>
            <ICONS.Ionicons name="ios-trash-bin" size={24} color="red" />
          </View>
        ) : (
          <ICONS.Ionicons
            name="menu-outline"
            size={44}
            color="black"
            style={{marginLeft: wp2(68)}}
          />
        )}
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      onPress={() => navigation.navigate('imageViewScreen',{item:[{image:[{original_url:props?.data?.product_images?.[0]?.image?.[0]?.original_url}]}]})}
      style={styles.imageContainer}>
      <Image
        //source={IMAGES.randomPic}
        source={{uri:props?.data?.product_images?.[0]?.image?.[0]?.original_url}}
        style={{width: '100%', height: '100%'}}
        resizeMode="cover"
      />
    </TouchableOpacity>

    <View style={styles.iconWrap}>
      <TouchableOpacity
        onPress={() => {
          heart ? setHeart(false) : setHeart(true);
        }}>
        <ICONS.AntDesign
          name="heart"
          size={34}
          color={heart ? '#FC0004' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>1000</Text>

      <TouchableOpacity
        onPress={() => {
          hanger ? setHanger(false) : setHanger(true);
        }}>
        <ICONS.MaterialCommunityIcons
          name="hanger"
          size={34}
          color={hanger ? '#162FAC' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>1500</Text>

      <TouchableOpacity
        onPress={() => {
          share ? setShare(false) : setShare(true);
        }}>
        <ICONS.FontAwesome
          name="retweet"
          size={34}
          color={share ? '#13D755' : 'black'}
        />
      </TouchableOpacity>
      <Text style={{color: 'black'}}>3000</Text>
    </View>

    <TouchableOpacity
      onPress={() => navigation.navigate('commentScreen',{product_id:props?.data?.id,comments:props?.data?.product_comments})}>
      <View style={{flexDirection: 'row', marginLeft: wp2(2)}}>
        <Text
          style={{color: 'black', fontWeight: '700', marginRight: wp2(2)}}>
          {props?.data?.user?.name}
        </Text>
        <Text style={{color: 'black'}}>{props?.data?.name}</Text>
      </View>

      <Text style={{color: 'black', marginLeft: wp2(2)}}>{moment(props?.data?.created_at).fromNow()}</Text>
    </TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  postWrap: {
    width: wp2(94),
    height: hp2(7),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: hp2(1),
  },
  imageWrap: {
    width: wp2(14),
    height: wp2(14),
    borderRadius: wp2(5),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: wp2(100),
    height: hp2(36),
    overflow: 'hidden',
    //backgroundColor:'yellow',
  },
  iconWrap: {
    width: wp2(80),
    height: hp2(6),
    //backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  deleteButton: {
    width: wp2(38),
    height: hp2(6),
    backgroundColor: '#D9D9D9',
    borderRadius: wp2(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: wp2(44),

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
