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
import CollectionItemsComp from '../../components/collectionItemsComp';
import AddCollectionComp from '../../components/addCollectionComp';

export default function AddCollection(props) {
    const [showButton, setShowButton]=useState(true);
    const [uploadButton, setUploadButton]=useState(false);
    
  if (uploadButton){
    return(
      <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" />
        <Text style={{marginTop:hp2(2),color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16)}}>Successfully Created!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select all pieces in collection</Text>
      {showButton && (
        <TouchableOpacity onPress={()=>setUploadButton(true)} style={styles.button}>
        <Text style={{color: 'white'}}>ADD COLLECTION</Text>
        </TouchableOpacity>
      )}


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingVertical: hp2(2),
          justifyContent: 'space-between',
        }}>
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
        <AddCollectionComp setBtn={setShowButton} />
      </ScrollView>
    </View>
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
    marginTop: hp2(4),
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  button: {
    width: wp2(48),
    height: hp2(5),
    borderRadius: wp2(8),
    backgroundColor: '#162FAC',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop:hp2(2),
    borderWidth:1,

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
