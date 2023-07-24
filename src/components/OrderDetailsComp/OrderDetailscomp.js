import { Image, SafeAreaView, Text, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { hp2, wp2 } from '../../theme'
import styles from './styles'
import {BottomSheet} from 'react-native-btr';
import BottomSheetViewOrderStatus from '../bottomSheet/BottomsheetViewOrderStatus';

import {errorMessage, successMessage} from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {ChnageOrderStatus} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';
import types from '../../Redux/types';
import {SkypeIndicator} from 'react-native-indicators';

//import LoaderComp from '../loaderComp';

const OrderDetailscomp = (props) => {

const dispatch = useDispatch();
//const [loadingStatusChange, setLoadingStatusChange] = useState(false);
const user = useSelector(state => state.userData);

  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(props?.status);
  const orderStatusData = props?.orderStatus;

  
    const [loading, setLoading] = useState(false)
    const onloading = (value,label)=>{
      setLoading(value)
    }

    const toggleBottomNavigationView = () => {
      setVisible(!visible);
      uibottomesheetvisiblity(!visible);
      setIsOpenedStatus(false);
    };
    const uibottomesheetvisiblity = Bool => {
      setVisible(Bool);
    };

    const SelectOrderStatus = (Bool,statusname,statusid)=>{

      //////setSelectedStatus(statusname);

      //updateState({region: Number(regionid)});
      //setIsOpenedRegions(false);

      //////setIsOpenedStatus(false);

      //setSelectedCountry('SELECT COUNTRY');
      //updateState({country: null});
      //setIsOpenedRegions(Bool)

      //////setIsOpenedStatus(Bool)

      //getAllCountries(regioncode);

        props?.loaderState?.setLoadingStatusChange(true);
      
        axios
          .post(ChnageOrderStatus,{order_detail_id:props?.orderId,status_id:statusid},{
            headers:{Authorization:`Bearer ${user?.token}`}
          })
          .then(async function (res) {
            console.log(res?.data);
            setSelectedStatus(statusname);
            setIsOpenedStatus(false);
            props?.loaderState?.setLoadingStatusChange(false);
            props?.loaderState?.onChangeOrderStatus(props?.indexValue,statusname);
          })
          .catch(function (error) {
            console.log(error?.response?.data);
            props?.loaderState?.setLoadingStatusChange(false);
            //errorMessage('Something went wrong!');
            errorMessage(errorHandler(error))
          });

    }

    useEffect(()=>{            
      if(isOpenedStatus){
        setModalData(orderStatusData)
        uibottomesheetvisiblity(true)
  
      }
    },[isOpenedStatus])  
  
  return (
    <View>
        <View style={styles.imagecontainer}>
        {loading?
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf:'center'
        }}>
      <SkypeIndicator
      color={'black'}
    /> 
    </View>
    :
    undefined
        }
      <Image
      progressiveRenderingEnabled={true}
      onLoadStart={()=>{onloading(true,"onLoadStart")}}
      onLoad={()=>onloading(false,"onLoad")}
      onLoadEnd={()=>{onloading(false,"onLoadEnd")}}
      source={{uri:props.uri}}
      resizeMode='cover'
      style={styles.imageView}
      />
      </View>
      <View style={{marginLeft:wp2(10)}}>
      <Text style={styles.textstyle}>Brand Name -Noongoons</Text>
      <Text style={styles.textstyle}>{`Product Name - ${props.productname}`}</Text>
      <Text style={styles.textstyle}>{`Description - ${props.description}`}</Text>
      <Text style={styles.textstyle}> {`Quantity - ${props.quantity}`}</Text>
      <Text style={styles.textstyle}> {`Size - ${props.size}`}</Text>
      <View style={styles.colourView}>
      <Text style={styles.colourText}> Colour - </Text>
      <View style={{width:wp2(9),height:wp2(5),backgroundColor:`${props.colourcode}`,borderRadius:wp2(2),borderWidth:1}}></View>
      </View>
      <Text style={styles.textstyle}> {`Price - £ ${props.price}`}</Text>
      {/* <Text style={styles.textstyle} onPress={()=> console.log('hi')}> {`Status - ${props.status}`}</Text> */}
      <Text style={styles.textstyle} onPress={()=> isOpenedStatus?setIsOpenedStatus(false):setIsOpenedStatus(true)}> {`Status - ${selectedStatus}`}</Text>
      </View>
      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}
        >
          <BottomSheetViewOrderStatus
          Data={modalData}
          SelectedStatus={selectedStatus}
          uibottomesheetvisiblity={uibottomesheetvisiblity}
          SelectOrderStatus={SelectOrderStatus}
        />

        </BottomSheet>
    </View>
  )
}

export default OrderDetailscomp