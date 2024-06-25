import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {RFValue as rfv} from 'react-native-responsive-fontsize';

import {ICONS, COLORS, wp2, hp2} from '../../theme';

import NextPickupComp from '../../components/nextPickupComp';

import {useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';
import NewHeaderComp from '../auth/componnets/NewHeaderComp';

export default function NextPickupScreen(props) {
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.userData);
  const [data, setData] = useState(props?.route?.params?.data);

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>

      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {/* <View style={styles.headWrap}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{position: 'absolute', left: wp2(4)}}>
              <ICONS.AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.pickupText}>NEXT PICKUP</Text>
          </View> */}
          <NewHeaderComp
            title={'Next Pick up'}
            movePreviousArrow={true}
            arrowNavigation={() => props.navigation.goBack()}
          />

          {loading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: hp2(6),
              }}>
              <SkypeIndicator color={'black'} />
            </View>
          ) : data.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: hp2(1),
                paddingBottom: hp2(12),
                alignSelf: 'center',
              }}
              numColumns={2}
              data={data}
              renderItem={({item, i}) => {
                return <NextPickupComp key={i} item={{item}} />;
              }}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text>No product added yet</Text>
            </View>
          )}
        </View>
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
  pickupText: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
  },
});
