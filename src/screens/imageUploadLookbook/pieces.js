import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,

  TouchableOpacity,
  Text,

  Platform,
  SafeAreaView,
} from 'react-native';

import {

  RFValue as rfv,
} from 'react-native-responsive-fontsize';

import {

  ICONS,
  COLORS,
 
  wp2,
  hp2,
 
} from '../../theme';

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {PiecesUrl} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';

export default function Pieces(props) {
 
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);

  useEffect(() => {
    setLoading(true);

    axios
      .get(PiecesUrl, {
        headers: {Authorization: `Bearer ${user.token}`},
      })
      .then(async function (res) {
       
        setData(res.data.data);
        setLoading(false);
      })
      .catch(function (error) {
        
        setLoading(false);
        
        errorMessage(errorHandler(error))
      });
  }, []);

  const options = text => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.route.params.updateState({
            pieces: text.piece_name,
            piece_id: text.id,
          });
          props.navigation.goBack();
        }}
        style={styles.optionWrap}>
        <Text style={{color: 'black'}}>{text.piece_name}</Text>
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                props.route.params.stateChange.pieces == text.piece_name
                  ? 'black'
                  : '#D9D9D9',
            },
          ]}></View>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

    <SafeAreaView style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.heading}>ITEMS</Text>
      </View>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: hp2(6),
          }}>
          <SkypeIndicator color={'black'} />
        </View>
      ) : (
        <>
          {data?.map(item => {
           
            return <>{options(item)}</>;
          })}
          
        </>
      )}
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
  },
  headWrap: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
    alignItems: 'center',
  
    justifyContent: 'center',
    width: wp2(100),
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
  optionWrap: {
    width: wp2(90),
    height: hp2(4),
    
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp2(1),
    marginTop: hp2(2),
    alignSelf: 'center',
  },
  circle: {
    width: wp2(5),
    height: wp2(5),
    
    borderRadius: 100,
  },
});
