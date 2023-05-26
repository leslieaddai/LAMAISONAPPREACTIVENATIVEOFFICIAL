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
import CollectionItemsComp from '../../components/collectionItemsComp';
import AddCollectionComp from '../../components/addCollectionComp';

import LoaderComp from '../../components/loaderComp';

import { errorMessage,successMessage } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import { errorHandler } from '../../config/helperFunction';
import { createCollection,GetBrandProductsById } from '../../config/Urls';
import { useDispatch,useSelector } from 'react-redux';
import types from '../../Redux/types';
import { SkypeIndicator } from 'react-native-indicators';

export default function AddCollection(props) {
    const [selectedProducts, setSelectedProducts]=useState([]);
    const [uploadButton, setUploadButton]=useState(false);

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [data,setData]=useState([]);
    const user = useSelector(state => state.userData)

    const collectionName = props?.route?.params?.name;
    const collectionImage = props?.route?.params?.selectedImage;

    useEffect(()=>{
      setLoading(true);
      axios
      .get(GetBrandProductsById+`/${user?.userData?.id}`)
      .then(async function (res) {
         //console.log(res.data);
         setData(res.data.data);
         setLoading(false);
      }) 
      .catch(function (error) {
        console.log(error.response.data)
        setLoading(false);
        errorMessage('Something went wrong!')
      });
  
    },[])

    const onAddCollection = () => {
      setLoading2(true);

  var formdata = new FormData();
  
  formdata.append("user_id", user?.userData?.id);
  formdata.append("image", collectionImage);
  formdata.append("name", collectionName);
  selectedProducts.map((item,index)=>{
    formdata.append("product_id[]", item);
  })
  //formdata.append("product_id[]", selectedProducts);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: createCollection,
    headers: { 
      'Authorization': `Bearer ${user?.token}`, 
      'Accept': 'application/json',
      "Content-Type": "multipart/form-data"
    },
    data : formdata
  };

  axios.request(config)
  .then(async function (res) {
     console.log(res.data);
     setLoading2(false);
     successMessage('Created Successfully')
     setUploadButton(true)

    setTimeout(()=>{
      props.navigation.pop(2) 
    },3000);
    
  }) 
  .catch(function (error) {
    console.log(error.response.data)
    setLoading2(false);
    errorMessage('Upload Failed');
  });

  }
    
  if (uploadButton){
    return(
      <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
        <ICONS.AntDesign name="checkcircle" size={hp2(16)} color="#13D755" />
        <Text style={{marginTop:hp2(2),color:'black',textTransform:'uppercase',fontWeight:'700',fontSize:rfv(16)}}>Successfully Created!</Text>
      </View>
    )
  }

  return (
    <>
   <View style={{position:'absolute',zIndex:999}}>
{loading2 && (
      <LoaderComp/>
    )}
</View>
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Select all pieces in collection</Text>
      {selectedProducts.length > 0 && (
        <TouchableOpacity onPress={onAddCollection} style={styles.button}>
        <Text style={{color: 'white'}}>ADD COLLECTION</Text>
        </TouchableOpacity>
      )}

{loading ? 
    <View style={{  alignItems: 'center', justifyContent: 'center', marginVertical:hp2(6)}}>
      <SkypeIndicator color={'black'} />
    </View>
    :    
    <FlatList
    showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingVertical: hp2(2)}}
      data={data}
      numColumns={2}
      renderItem={({item,index})=>{
        return(
          <AddCollectionComp state={{selectedProducts,setSelectedProducts}} data={{item}} />
        )
      }}
      />
      }


      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingVertical: hp2(2),
          justifyContent: 'space-between',
        }}>
        <AddCollectionComp setBtn={setShowButton} />
      </ScrollView> */}

    </SafeAreaView>
    </>
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
    fontSize: rfv(16),
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
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
