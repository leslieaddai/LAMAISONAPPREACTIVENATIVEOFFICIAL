import {  SafeAreaView, Text, View } from 'react-native'
import React,{useState} from 'react'
import styles from './Styles'

import { FlatList } from 'react-native-gesture-handler'
import OrderDetailscomp from '../../components/OrderDetailsComp/OrderDetailscomp'
import LoaderComp from '../../components/loaderComp'
import { COLORS } from '../../theme'

const OrderDetails = ({navigation,route}) => {
  const [orderData,setOrderData]=useState(route?.params?.item);
    const {addressData} = route.params
    const {editorname} =route.params
    const{editoremail}  = route.params
    const onChangeOrderStatus = (indexNo,newStatus) => {
      let tempArr = orderData;
      tempArr[indexNo].status.status=newStatus;
      setOrderData(tempArr);
    }
    const [loadingStatusChange, setLoadingStatusChange] = useState(false);
  return (
    <>
        <View style={{position: 'absolute', zIndex: 999}}>
        {loadingStatusChange && <LoaderComp />}
      </View>
      <SafeAreaView
        style={{flex: 0, backgroundColor: COLORS.appBackground}}></SafeAreaView>
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.orderText}>Order Details</Text>
      <View style={{justifyContent:'center',flex: 1,}}>
      {
        orderData.length === 0
        ?
        <Text style={styles.nodatatext}>Order Detail Not Found</Text>
        :
        <FlatList
      data={orderData}
      renderItem={({item,index})=>{
        return(
        <View style={styles.ConatinerView}>
            <OrderDetailscomp
            key={index}
            indexValue={index}
            uri={item?.product?.product_images[0]?.image[0]?.original_url}
            productname={item?.product?.name}
            description={item?.product?.description}
            quantity={item?.qty}
            size={item?.size?.size}
            colourcode={item?.color?.color_code}
            price={item?.price}
            status={item?.status?.status}
            addressData={addressData}
            user={item?.user}
            name={editorname}
            email={editoremail}
            orderId={item?.id}
            alldata={item}
            loaderState={{loadingStatusChange,setLoadingStatusChange,onChangeOrderStatus}}
          
            />
      </View>
        )
      }}
      />
      }
        
        </View>
      </View>
      </SafeAreaView>

      </>
  )
}

export default OrderDetails
