import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  SafeAreaView,
  Alert,
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
import RNAnimatedScrollIndicators from 'react-native-animated-scroll-indicators';
import BottomComp from '../../components/bottomComp';
import LoaderComp from '../../components/loaderComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {
  GetShippingAddress,
  ChangeShippingAddress,
  GetRegionsAll,
  GetCountries,
  CreateGuestOrder,
  CreateEditorOrder,
} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

export default function BuyNow(props) {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.userData);
  const guestUser = useSelector(state => state.guestData);
  const {products} = useSelector(state => state.GuestBasket);

  const [continueButton, setContinueButton] = useState('continue');

  const [stateChange, setStateChange] = useState({
    address_1: null,
    address_2: null,
    city: null,
    region: null,
    country: null,
    postcode: null,
    email: null,
    name: null,
    card: null,
    expiry: null,
    cvv: null,
  });
  const updateState = data => setStateChange(prev => ({...prev, ...data}));
  const {address_1, address_2, city, country, region, postcode, email, name, card, expiry, cvv} = stateChange;

  const [isOpenedRegions, setIsOpenedRegions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('SELECT REGION');
  const [regionsData, setRegionsData] = useState([]);

  const [isOpenedCountries, setIsOpenedCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('SELECT COUNTRY');
  const [countriesData, setCountriesData] = useState([]);

  const [total, setTotal] = useState(0);
  const [commission, setCommission] = useState(15);

  useEffect(() => {
    getAllRegions();
  }, []);

  useEffect(() => {
    if(user?.token!==''){
      //setLoading(true);

      axios
        .get(GetShippingAddress, {
          headers: {Authorization: `Bearer ${user?.token}`},
        })
        .then(async function (res) {
          console.log(res.data);
          setStateChange({
            address_1: res?.data?.data?.address_1,
            address_2: res?.data?.data?.address_2,
            city: res?.data?.data?.city,
            country: res?.data?.data?.country?.country_id,
            region: res?.data?.data?.region?.id,
            postcode: res?.data?.data?.postcode,
            email:null,
            name:null,
            card:null,
            expiry:null,
            cvv:null,
          });
          if (res?.data?.data?.region !== null) {
            setSelectedRegion(res?.data?.data?.region?.name);
          }
          if (
            res?.data?.data?.region !== null &&
            res?.data?.data?.country !== null
          ) {
            getAllCountries(res?.data?.data?.region?.code);
            setSelectedCountry(res?.data?.data?.country?.name);
          }
          //setLoading(false);
        })
        .catch(function (error) {
          console.log(error.response.data);
          //setLoading(false);
          errorMessage('Something went wrong!');
        });
    }
  }, []);

  useEffect(()=>{
    if(stateChange?.region !== null && stateChange?.region !== ''){
      let val = 0;
      products.map((item,index)=>{
        val=val+Number(item?.data?.price*item?.Quantity)
        item?.data?.product_region?.map((item,index)=>{
          if(stateChange?.region === item?.region_id){
            val = val + Number(item?.price)
          }
        })
      })
      console.log(val);
      setTotal(val);
    }
  },[stateChange?.region])

  const getAllRegions = () => {
    axios
      .get(GetRegionsAll)
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setRegionsData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        errorMessage('Something went wrong to get regions list!');
        //errorMessage(error.response.data.message)
      });
  };

  const getAllCountries = country_code => {
    axios
      .get(GetCountries + country_code)
      .then(async function (res) {
        //console.log(res.data);
        //setStateChange(res.data.data);
        setCountriesData(res?.data?.data);
        //setLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data);
        //setLoading(false);
        errorMessage('Something went wrong to get countries list!');
        //errorMessage(error.response.data.message)
      });
  };

  const goBackFunction = () => {
    if (continueButton === 'continue') {
      props.navigation.goBack();
    }
    if (continueButton === 'confirm') {
      setContinueButton('continue')
    }
    if (continueButton === 'purchase') {
      setContinueButton('confirm')
    }
  };

  const onContinue = () => {

  if( (stateChange.address_1 !== '' && stateChange.address_1 !== null) && (stateChange.city !== '' && stateChange.city !== null) && (stateChange.region!== '' && stateChange.region!== null) && (stateChange.country !== '' && stateChange.country !== null) && (stateChange.postcode !== '' && stateChange.postcode !== null)){
    setContinueButton('confirm')
  }else{
    errorMessage('Please fill all fields!')
  }

  }

  const onConfirm = () => {

    if((stateChange.email !== '' && stateChange.email !== null) && (stateChange.name !== '' && stateChange.name !== null) && (stateChange.card !== '' && stateChange.card !== null) && (stateChange.expiry !== '' && stateChange.expiry !== null) && (stateChange.cvv !== '' && stateChange.cvv !== null)){
      setContinueButton('purchase')
    }else{
      errorMessage('Please fill all fields!')
    }

  }

  const createGuestOrder = () => {
    
    setLoading(true);

    var formdata = new FormData();

    let productArr = [];
    let colorArr = [];
    let sizeArr = [];
    let quantityArr = [];

    products.map((item, index) => {
      productArr.push(item.data.id);
      formdata.append('product_id[]', item.data.id);

      colorArr.push(item.colorId.id);
      formdata.append('color_id[]', item.colorId.id);

      sizeArr.push(item.sizeId.size_id);
      formdata.append('size_id[]', item.sizeId.size_id);

      quantityArr.push(Number(item.Quantity));
      formdata.append('qty[]', Number(item.Quantity));
    });

    formdata.append('device_id', guestUser?.device_id);
    formdata.append('status_id', 3);
    formdata.append('payment_method', 'stripe');
    formdata.append('address1', stateChange.address_1);
    formdata.append('address2', stateChange.address_2);
    formdata.append('region', stateChange.region);
    formdata.append('city', stateChange.city);
    formdata.append('country', stateChange.country);
    formdata.append('post_code', stateChange.postcode);
    formdata.append('email', stateChange.email);
    formdata.append('title', stateChange.name);
    formdata.append('acc_number', stateChange.card);
    formdata.append('expiry', stateChange.expiry);
    formdata.append('cvv', stateChange.cvv);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CreateGuestOrder,
      headers: {
        // Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setLoading(false);
        //props.navigation.pop(1);
        //props.navigation.navigate('confirmationScreen')
        //props.navigation.replace('confirmationScreen')
        props.navigation.replace('bottomNavigationGuest', {screen: 'confirmationScreen',})
        dispatch({
          type: types.ClearBasketGuest
        });
        successMessage('Order Done');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Order Failed');
        errorMessage(error?.response?.data?.message);
      });

  }

  const createEditorOrder = () => {
    
    setLoading(true);

    var formdata = new FormData();

    formdata.append('user_id', user?.userData?.id);
    formdata.append('status_id', 3);
    formdata.append('payment_method', 'stripe');
    formdata.append('address1', stateChange.address_1);
    formdata.append('address2', stateChange.address_2);
    formdata.append('region', stateChange.region);
    formdata.append('city', stateChange.city);
    formdata.append('country', stateChange.country);
    formdata.append('post_code', stateChange.postcode);
    formdata.append('email', stateChange.email);
    formdata.append('title', stateChange.name);
    formdata.append('acc_number', stateChange.card);
    formdata.append('expiry', stateChange.expiry);
    formdata.append('cvv', stateChange.cvv);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CreateEditorOrder,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formdata,
    };

    axios
      .request(config)
      .then(async function (res) {
        console.log(res.data);
        setLoading(false);
        //props.navigation.pop();
        props.navigation.navigate('confirmationScreen');
        //props.navigation.replace('confirmationScreen')
        //props.navigation.replace('bottomNavigation', {screen: 'confirmationScreen',})
        dispatch({
          type: types.Clearcart
        });
        successMessage('Order Done');
      })
      .catch(function (error) {
        console.log(error.response.data);
        setLoading(false);
        //errorMessage('Order Failed');
        errorMessage(error?.response?.data?.message);
      });

  }

  const scrollX = new Animated.Value(0);

  // const textBox = (place) => {
  //   return (
  //     <View style={styles.inputBox}>
  //       <TextInput style={styles.textInput} placeholder={place}  placeholderTextColor={'grey'} keyboardType={place=='CARD NUMBER' ? 'number-pad' : 'default'} />
  //     </View>
  //   );
  // };

  // const textBox2 = () => {
  //   return (
  //     <>
  //       {textBox('EMAIL')}
  //       {textBox('NAME ON CARD')}
  //       {textBox('CARD NUMBER')}
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignSelf: 'center',
  //           justifyContent: 'space-between',
  //           width: wp2(80),
  //         }}>
  //         <View style={[styles.inputBox, {width: wp2(48)}]}>
  //           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="EXPIRY DATE MM/YY" />
  //         </View>
  //         <View style={[styles.inputBox, {width: wp2(28)}]}>
  //           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="CVV" keyboardType='number-pad' />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };

  return (
    <>
     <View style={{position: 'absolute', zIndex: 999}}>
        {loading && <LoaderComp />}
      </View>

    <SafeAreaView style={{flex:1}}>
       <View style={styles.container}>
      <View style={styles.headWrap}>
        <TouchableOpacity onPress={()=>goBackFunction()} style={{position: 'absolute', left: wp2(4)}}>
          <ICONS.AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.checkout}>Check Out</Text>
        <ICONS.Entypo name="lock" size={30} color="black" />
      </View>
     {user?.token!==''?(
       <KeyboardAwareScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{paddingTop: hp2(2), paddingBottom: hp2(12)}}>
       <View style={styles.checkoutWrap}>
       <FlatList
           horizontal
           showsHorizontalScrollIndicator={true}
           pagingEnabled
           data={props?.route?.params?.data}
           renderItem={({item, index}) => {
             return (
               <View style={styles.dataWrap}>
             <View style={styles.productImage}>
               <Image
                 //source={IMAGES.vinDiesel}
                 source={{uri:item?.product?.product_images[0]?.image[0]?.original_url}}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="cover"
               />
             </View>
             
         <View style={styles.itemArea}>
           <Text style={styles.text}>{item?.product?.name}</Text>

           <View
             style={{flexDirection: 'row', justifyContent: 'space-between'}}>
             <Text style={styles.text}>price</Text>
             <Text style={styles.text}>£{item?.product?.price}</Text>
           </View>

           {/* <View style={{flexDirection:'row',alignItems:'center'}}>
         <View style={{width:wp2(9),height:wp2(9),backgroundColor:item?.colorId?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
         <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>{item?.sizeId?.size?.size}</Text>
         </View> */}

         <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold'}}>Quantity: {item?.qty}</Text>

           {continueButton === 'purchase' && 
           <View
           style={{flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style={styles.text}>Shipping</Text>
           {/* <Text style={styles.text}>{item?.data?.product_region.map((item,index)=>{
             if(stateChange?.region === item?.region_id){
               return (
                 '£'+item?.price
               )
             }
           })}</Text> */}
         </View>
         }
         </View>
               </View>
             )
           }}
         />
       </View>

       {continueButton === 'purchase' && 
       <>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Sub Total</Text>
         <Text style={styles.text}>£{total}</Text>
       </View>

       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Commission {commission}%</Text>
         <Text style={styles.text}>£{total*(commission/100)}</Text>
       </View>

       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Total</Text>
         <Text style={styles.text}>£{total+(total*(commission/100))}</Text>
       </View>
       </>
       }

       {continueButton == 'confirm' ? (
         <View style={styles.detailInputArea}>
            <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'EMAIL'}  placeholderTextColor={'grey'}  value={stateChange.email}
             onChangeText={val => updateState({email: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'NAME ON CARD'}  placeholderTextColor={'grey'}  value={stateChange.name}
             onChangeText={val => updateState({name: val})}/>
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'CARD NUMBER'}  placeholderTextColor={'grey'}  value={stateChange.card}
             onChangeText={val => updateState({card: val})} keyboardType='number-pad' maxLength={19}/>
     </View>
       <View
         style={{
           flexDirection: 'row',
           alignSelf: 'center',
           justifyContent: 'space-between',
           width: wp2(80),
         }}>
         <View style={[styles.inputBox, {width: wp2(48)}]}>
           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="EXPIRY DATE MM/YY" maxLength={5} value={stateChange.expiry}
             onChangeText={val => updateState({expiry: val})} />
         </View>
         <View style={[styles.inputBox, {width: wp2(28)}]}>
           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="CVV" keyboardType='number-pad' maxLength={4}  value={stateChange.cvv}
             onChangeText={val => updateState({cvv: val})}/>
         </View>
       </View>
         </View>
       ) : continueButton == 'continue' ? (
         <View style={[styles.detailInputArea2]}>
           {/* {textBox('ADDRESS LINE 1')}
           {textBox('ADDRESS LINE 2')}
           {textBox('COUNTRY')}
           {textBox('CITY')}
           {textBox('POSTCODE')} */}
           <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 1'}  placeholderTextColor={'grey'} value={stateChange.address_1}
             onChangeText={val => updateState({address_1: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 2'}  placeholderTextColor={'grey'} value={stateChange.address_2}
             onChangeText={val => updateState({address_2: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'CITY'}  placeholderTextColor={'grey'} value={stateChange.city}
             onChangeText={val => updateState({city: val})} />
     </View>

     <TouchableOpacity
           onPress={() =>
             isOpenedRegions
               ? setIsOpenedRegions(false)
               : setIsOpenedRegions(true)
           }
           style={[
             styles.inputBox,
             {
               flexDirection: 'row',
               alignItems: 'center',
               paddingHorizontal: wp2(2),
               justifyContent: 'space-between',
             },
           ]}>
           <Text
             style={{color: 'black', fontWeight: '700', fontSize: rfv(13)}}>
             {selectedRegion}
           </Text>
           <View>
             <ICONS.FontAwesome
               name={isOpenedRegions ? 'chevron-up' : 'chevron-down'}
               color={'#A1A1A1'}
               size={22}
             />
           </View>
         </TouchableOpacity>

         {isOpenedRegions && (
           <View style={[styles.styleBox]}>
             {regionsData?.map((item, index) => (
               <TouchableOpacity
                 onPress={() => {
                   setSelectedRegion(item?.name);
                   updateState({region: Number(item?.id)});
                   setIsOpenedRegions(false);
                   setSelectedCountry('SELECT COUNTRY');
                   updateState({country: null});
                   getAllCountries(item?.code);
                 }}
                 key={index}
                 style={styles.itemWrap}>
                 <Text style={styles.itemTxt}>{item?.name}</Text>
                 {selectedRegion === item?.name && (
                   <ICONS.Entypo
                     name="check"
                     size={24}
                     color="black"
                     style={{position: 'absolute', right: 10}}
                   />
                 )}
               </TouchableOpacity>
             ))}
           </View>
         )}

         <TouchableOpacity
           disabled={selectedRegion === 'SELECT REGION' ? true : false}
           onPress={() =>
             isOpenedCountries
               ? setIsOpenedCountries(false)
               : setIsOpenedCountries(true)
           }
           style={[
             styles.inputBox,
             {
               flexDirection: 'row',
               alignItems: 'center',
               paddingHorizontal: wp2(2),
               justifyContent: 'space-between',
             },
           ]}>
           <Text style={styles.selectedTxt}>{selectedCountry}</Text>
           <View>
             <ICONS.FontAwesome
               name={isOpenedCountries ? 'chevron-up' : 'chevron-down'}
               color={'#A1A1A1'}
               size={22}
             />
           </View>
         </TouchableOpacity>

         {isOpenedCountries && countriesData.length !== 0 && (
           <View style={[styles.styleBox]}>
             {countriesData?.map((item, index) => (
               <TouchableOpacity
                 onPress={() => {
                   setSelectedCountry(item?.name);
                   updateState({country: Number(item?.country_id)});
                   setIsOpenedCountries(false);
                 }}
                 key={index}
                 style={styles.itemWrap}>
                 <Text style={styles.itemTxt}>{item?.name}</Text>
                 {selectedCountry === item?.name && (
                   <ICONS.Entypo
                     name="check"
                     size={24}
                     color="black"
                     style={{position: 'absolute', right: 10}}
                   />
                 )}
               </TouchableOpacity>
             ))}
           </View>
         )}

     {/* <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'COUNTRY'}  placeholderTextColor={'grey'}  />
     </View> */}
     
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'POSTCODE'}  placeholderTextColor={'grey'}  value={stateChange.postcode}
             onChangeText={val => updateState({postcode: val})} maxLength={10} />
     </View>
         </View> 
       ) : (
         <>
           <View style={[styles.detailInputArea2]}>
           {/* {textBox('ADDRESS LINE 1')}
           {textBox('ADDRESS LINE 2')}
           {textBox('CITY')}
           {textBox('COUNTRY')}
           {textBox('POSTCODE')} */}

               <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.address_1}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.address_2}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.city}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{selectedRegion}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{selectedCountry}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.postcode}</Text>
     </View>
           </View>
           <View style={[styles.detailInputArea, {borderBottomWidth: 0}]}>
             {/* {textBox2()} */}
             <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.email}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.name}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.card}</Text>
     </View>
       <View
         style={{
           flexDirection: 'row',
           alignSelf: 'center',
           justifyContent: 'space-between',
           width: wp2(80),
         }}>
        <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(48)}]}>
       <Text style={styles.selectedTxt}>{stateChange.expiry}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(28)}]}>
       <Text style={styles.selectedTxt}>{stateChange.cvv}</Text>
     </View>
       </View>
           </View>

           {/* <View style={styles.iconsWrap}>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.applePay}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.paypal}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.gPay}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
           </View> */}
         </>
       )}

       <TouchableOpacity
         onPress={() => {
           continueButton == 'continue'
           ? onContinue()
           : continueButton == 'confirm'
           ? onConfirm()
           :  createEditorOrder();
         }}
         style={styles.button}>
         <Text style={styles.buttonText}>
           {continueButton == 'continue'
             ? 'CONTINUE'
             : continueButton == 'confirm'
             ? 'CONFIRM'
             : 'PURCHASE'}
         </Text>
       </TouchableOpacity>
     </KeyboardAwareScrollView>
     ):(
       <KeyboardAwareScrollView
       showsVerticalScrollIndicator={false}
       contentContainerStyle={{paddingTop: hp2(2), paddingBottom: hp2(12)}}>
       <View style={styles.checkoutWrap}>
       <FlatList
           horizontal
           showsHorizontalScrollIndicator={true}
           pagingEnabled
           data={products}
           renderItem={({item, index}) => {
             return (
               <View style={styles.dataWrap}>
             <View style={styles.productImage}>
               <Image
                 //source={IMAGES.vinDiesel}
                 source={{uri:item?.data?.product_images[0]?.image[0]?.original_url}}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="cover"
               />
             </View>
             
         <View style={styles.itemArea}>
           <Text style={styles.text}>{item?.data?.name}</Text>

           <View
             style={{flexDirection: 'row', justifyContent: 'space-between'}}>
             <Text style={styles.text}>price</Text>
             <Text style={styles.text}>£{item?.data?.price}</Text>
           </View>

           <View style={{flexDirection:'row',alignItems:'center'}}>
         <View style={{width:wp2(9),height:wp2(9),backgroundColor:item?.colorId?.color_code,borderRadius:wp2(2),borderWidth:1}}></View>
         <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold',marginLeft:wp2(2)}}>{item?.sizeId?.size?.size}</Text>
         </View>

         <Text style={{color:'black',fontSize:rfv(12),fontWeight:'bold'}}>Quantity: {item?.Quantity}</Text>

           {continueButton === 'purchase' && 
           <View
           style={{flexDirection: 'row', justifyContent: 'space-between'}}>
           <Text style={styles.text}>Shipping</Text>
           <Text style={styles.text}>{item?.data?.product_region.map((item,index)=>{
             if(stateChange?.region === item?.region_id){
               return (
                 '£'+item?.price
               )
             }
           })}</Text>
         </View>
         }
         </View>
               </View>
             )
           }}
         />
       </View>

       {continueButton === 'purchase' && 
       <>
       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Sub Total</Text>
         <Text style={styles.text}>£{total}</Text>
       </View>

       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Commission {commission}%</Text>
         <Text style={styles.text}>£{total*(commission/100)}</Text>
       </View>

       <View
         style={{
           flexDirection: 'row',
           justifyContent: 'space-between',
           paddingLeft: wp2(42),
           paddingRight: wp2(6),
           marginVertical: hp2(1),
         }}>
         <Text style={styles.text}>Total</Text>
         <Text style={styles.text}>£{total+(total*(commission/100))}</Text>
       </View>
       </>
       }

       {continueButton == 'confirm' ? (
         <View style={styles.detailInputArea}>
            <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'EMAIL'}  placeholderTextColor={'grey'}  value={stateChange.email}
             onChangeText={val => updateState({email: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'NAME ON CARD'}  placeholderTextColor={'grey'}  value={stateChange.name}
             onChangeText={val => updateState({name: val})}/>
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'CARD NUMBER'}  placeholderTextColor={'grey'}  value={stateChange.card}
             onChangeText={val => updateState({card: val})} keyboardType='number-pad' maxLength={19}/>
     </View>
       <View
         style={{
           flexDirection: 'row',
           alignSelf: 'center',
           justifyContent: 'space-between',
           width: wp2(80),
         }}>
         <View style={[styles.inputBox, {width: wp2(48)}]}>
           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="EXPIRY DATE MM/YY" maxLength={5} value={stateChange.expiry}
             onChangeText={val => updateState({expiry: val})} />
         </View>
         <View style={[styles.inputBox, {width: wp2(28)}]}>
           <TextInput style={styles.textInput} placeholderTextColor={'grey'} placeholder="CVV" keyboardType='number-pad' maxLength={4}  value={stateChange.cvv}
             onChangeText={val => updateState({cvv: val})}/>
         </View>
       </View>
         </View>
       ) : continueButton == 'continue' ? (
         <View style={[styles.detailInputArea2]}>
           {/* {textBox('ADDRESS LINE 1')}
           {textBox('ADDRESS LINE 2')}
           {textBox('COUNTRY')}
           {textBox('CITY')}
           {textBox('POSTCODE')} */}
           <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 1'}  placeholderTextColor={'grey'} value={stateChange.address_1}
             onChangeText={val => updateState({address_1: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'ADDRESS LINE 2'}  placeholderTextColor={'grey'} value={stateChange.address_2}
             onChangeText={val => updateState({address_2: val})}  />
     </View>
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'CITY'}  placeholderTextColor={'grey'} value={stateChange.city}
             onChangeText={val => updateState({city: val})} />
     </View>

     <TouchableOpacity
           onPress={() =>
             isOpenedRegions
               ? setIsOpenedRegions(false)
               : setIsOpenedRegions(true)
           }
           style={[
             styles.inputBox,
             {
               flexDirection: 'row',
               alignItems: 'center',
               paddingHorizontal: wp2(2),
               justifyContent: 'space-between',
             },
           ]}>
           <Text
             style={{color: 'black', fontWeight: '700', fontSize: rfv(13)}}>
             {selectedRegion}
           </Text>
           <View>
             <ICONS.FontAwesome
               name={isOpenedRegions ? 'chevron-up' : 'chevron-down'}
               color={'#A1A1A1'}
               size={22}
             />
           </View>
         </TouchableOpacity>

         {isOpenedRegions && (
           <View style={[styles.styleBox]}>
             {regionsData?.map((item, index) => (
               <TouchableOpacity
                 onPress={() => {
                   setSelectedRegion(item?.name);
                   updateState({region: Number(item?.id)});
                   setIsOpenedRegions(false);
                   setSelectedCountry('SELECT COUNTRY');
                   updateState({country: null});
                   getAllCountries(item?.code);
                 }}
                 key={index}
                 style={styles.itemWrap}>
                 <Text style={styles.itemTxt}>{item?.name}</Text>
                 {selectedRegion === item?.name && (
                   <ICONS.Entypo
                     name="check"
                     size={24}
                     color="black"
                     style={{position: 'absolute', right: 10}}
                   />
                 )}
               </TouchableOpacity>
             ))}
           </View>
         )}

         <TouchableOpacity
           disabled={selectedRegion === 'SELECT REGION' ? true : false}
           onPress={() =>
             isOpenedCountries
               ? setIsOpenedCountries(false)
               : setIsOpenedCountries(true)
           }
           style={[
             styles.inputBox,
             {
               flexDirection: 'row',
               alignItems: 'center',
               paddingHorizontal: wp2(2),
               justifyContent: 'space-between',
             },
           ]}>
           <Text style={styles.selectedTxt}>{selectedCountry}</Text>
           <View>
             <ICONS.FontAwesome
               name={isOpenedCountries ? 'chevron-up' : 'chevron-down'}
               color={'#A1A1A1'}
               size={22}
             />
           </View>
         </TouchableOpacity>

         {isOpenedCountries && countriesData.length !== 0 && (
           <View style={[styles.styleBox]}>
             {countriesData?.map((item, index) => (
               <TouchableOpacity
                 onPress={() => {
                   setSelectedCountry(item?.name);
                   updateState({country: Number(item?.country_id)});
                   setIsOpenedCountries(false);
                 }}
                 key={index}
                 style={styles.itemWrap}>
                 <Text style={styles.itemTxt}>{item?.name}</Text>
                 {selectedCountry === item?.name && (
                   <ICONS.Entypo
                     name="check"
                     size={24}
                     color="black"
                     style={{position: 'absolute', right: 10}}
                   />
                 )}
               </TouchableOpacity>
             ))}
           </View>
         )}

     {/* <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'COUNTRY'}  placeholderTextColor={'grey'}  />
     </View> */}
     
     <View style={styles.inputBox}>
       <TextInput style={styles.textInput} placeholder={'POSTCODE'}  placeholderTextColor={'grey'}  value={stateChange.postcode}
             onChangeText={val => updateState({postcode: val})} maxLength={10} />
     </View>
         </View> 
       ) : (
         <>
           <View style={[styles.detailInputArea2]}>
           {/* {textBox('ADDRESS LINE 1')}
           {textBox('ADDRESS LINE 2')}
           {textBox('CITY')}
           {textBox('COUNTRY')}
           {textBox('POSTCODE')} */}

               <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.address_1}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.address_2}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.city}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{selectedRegion}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{selectedCountry}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.postcode}</Text>
     </View>
           </View>
           <View style={[styles.detailInputArea, {borderBottomWidth: 0}]}>
             {/* {textBox2()} */}
             <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.email}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.name}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2)}]}>
       <Text style={styles.selectedTxt}>{stateChange.card}</Text>
     </View>
       <View
         style={{
           flexDirection: 'row',
           alignSelf: 'center',
           justifyContent: 'space-between',
           width: wp2(80),
         }}>
        <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(48)}]}>
       <Text style={styles.selectedTxt}>{stateChange.expiry}</Text>
     </View>
     <View style={[styles.inputBox,{justifyContent:'center',paddingHorizontal:wp2(2),width:wp2(28)}]}>
       <Text style={styles.selectedTxt}>{stateChange.cvv}</Text>
     </View>
       </View>
           </View>

           {/* <View style={styles.iconsWrap}>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.applePay}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.paypal}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
             <TouchableOpacity style={styles.iconImage}>
               <Image
                 source={IMAGES.gPay}
                 style={{width: '100%', height: '100%'}}
                 resizeMode="contain"
               />
             </TouchableOpacity>
           </View> */}
         </>
       )}

       <TouchableOpacity
         onPress={() => {
           continueButton == 'continue'
           ? onContinue()
           : continueButton == 'confirm'
           ? onConfirm()
           :  createGuestOrder();
         }}
         style={styles.button}>
         <Text style={styles.buttonText}>
           {continueButton == 'continue'
             ? 'CONTINUE'
             : continueButton == 'confirm'
             ? 'CONFIRM'
             : 'PURCHASE'}
         </Text>
       </TouchableOpacity>
     </KeyboardAwareScrollView>
     )}
      {/* <BottomComp /> */}
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
    marginTop:Platform.OS === "ios"? hp2(0) : hp2(4),
    alignItems: 'center',
    //backgroundColor:'red',
    justifyContent: 'center',
  },
  checkout: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(24),
    marginRight: wp2(2),
  },
  productImage: {
    width: wp2(36),
    height: hp2(20),
    overflow: 'hidden',
    borderRadius: wp2(4),
    alignSelf: 'center',
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  checkoutWrap: {
    width: wp2(92),
    height: hp2(24),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    flexDirection: 'row',
  },
  scrollViewWrap: {
    width: wp2(36),
    height: hp2(20),
    overflow: 'hidden',
    borderRadius: wp2(4),
    alignSelf: 'center',
  },
  itemArea: {
    //flex: 1,
    width:wp2(54),
    justifyContent: 'space-evenly',
    paddingLeft: wp2(2),
    paddingVertical: hp2(2),
  },
  text: {fontWeight: '700', textTransform: 'uppercase', color: 'black'},
  detailInputArea: {
    width: wp2(92),
    height: hp2(34),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    justifyContent: 'space-evenly',
  },
  detailInputArea2: {
    width: wp2(92),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    justifyContent: 'space-evenly',
  },
  inputBox: {
    width: wp2(80),
    height: hp2(5),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginVertical: hp2(1),
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    color: 'black',
    paddingHorizontal: wp2(2),
    fontSize: rfv(13),
    fontWeight: '700',
  },
  iconsWrap: {
    width: wp2(94),
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button: {
    width: wp2(66),
    height: hp2(5),
    backgroundColor: 'black',
    borderRadius: wp2(10),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp2(4),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: rfv(13),
  },
  iconImage: {
    width: wp2(18),
    height: wp2(18),
    overflow: 'hidden',
    //borderRadius: wp2(4),
    //alignSelf:'center',
    //marginHorizontal: wp2(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  styleBox: {
    width: wp2(80),
    backgroundColor: 'white',
    borderRadius: wp2(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  itemWrap: {
    flexDirection: 'row',
    width: wp2(80),
    height: hp2(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp2(2),
    overflow: 'hidden',
  },
  itemTxt: {
    color: 'black',
    fontWeight: '700',
    fontSize: rfv(13),
    position: 'absolute',
    left: 10,
  },
  selectedTxt: {color: 'black', fontWeight: '700', fontSize: rfv(13)},
  dataWrap:{
    width:wp2(92),
    flexDirection:'row',
  },
});
