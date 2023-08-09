import { Image,  Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { ICONS,  wp2 } from '../../theme'
import styles from './styles'
import {BottomSheet} from 'react-native-btr';
import BottomSheetViewOrderStatus from '../bottomSheet/BottomsheetViewOrderStatus';

import {errorMessage, } from '../../config/NotificationMessage';
import axios from 'react-native-axios';
import {errorHandler} from '../../config/helperFunction';
import {ChnageOrderStatus} from '../../config/Urls';
import {useDispatch, useSelector} from 'react-redux';

import {SkypeIndicator} from 'react-native-indicators';


const OrderDetailscomp = (props) => {
const dispatch = useDispatch();

const user = useSelector(state => state.userData);
const roleid = user?.userData?.role?.[0]?.id
  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState();
  const [isOpenedStatus, setIsOpenedStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(props?.status);
  const orderStatusData = props?.orderStatus;
  const addressData = props?.addressData;

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

     

        props?.loaderState?.setLoadingStatusChange(true);
      
        axios
          .post(ChnageOrderStatus,{order_detail_id:props?.orderId,status_id:statusid},{
            headers:{Authorization:`Bearer ${user?.token}`}
          })
          .then(async function (res) {
           
            setSelectedStatus(statusname);
            setIsOpenedStatus(false);
            props?.loaderState?.setLoadingStatusChange(false);
            props?.loaderState?.onChangeOrderStatus(props?.indexValue,statusname);
          })
          .catch(function (error) {
          
            props?.loaderState?.setLoadingStatusChange(false);
   
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
    <View style={styles.container}>
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
        <View style={styles.namestyle}>
      <Text style={styles.nametextstyle}>{roleid===3?'Editor Name ':'Brand Name '}</Text>
      <Text style={styles.nametextstyle}>- {props?.user?.name}</Text>
        </View>
      <Text style={styles.textstyle}>{`Product Name - ${props?.productname}`}</Text>
      <Text style={styles.textstyle}>{`Description - ${props?.description}`}</Text>
      <Text style={styles.textstyle}>{`Address 1 - ${addressData?.add1}`}</Text>
      <Text style={styles.textstyle}>{`Address 2 - ${addressData?.add2}`}</Text>
      <Text style={styles.textstyle}>{`City - ${addressData?.city}`}</Text>
      <Text style={styles.textstyle}>{`Country - ${addressData?.country}`}</Text>
      <Text style={styles.textstyle}>{`Quantity - ${props?.quantity}`}</Text>
      <Text style={styles.textstyle}>{`Size - ${props?.size}`}</Text>
      <View style={styles.colourView}>
      <Text style={styles.colourText}>Colour - </Text>
      <View style={{width:wp2(9),height:wp2(5),backgroundColor:`${props?.colourcode}`,borderRadius:wp2(2),borderWidth:1}}></View>
      </View>
      <Text style={styles.textstyle}>{`Price - £ ${props?.price}`}</Text>
    
      <TouchableOpacity 
      onPress={()=> isOpenedStatus?setIsOpenedStatus(false):setIsOpenedStatus(true)}
      style={styles.statusbtn}>
      <Text style={styles.textstyle}>{`Status - ${selectedStatus}`}
      <View style={styles.iconstyle}>
             <ICONS.FontAwesome
               name={isOpenedStatus ? 'chevron-up' : 'chevron-down'}
               color={'#A1A1A1'}
               size={22}
             />
           </View>
          </Text>
           </TouchableOpacity>
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