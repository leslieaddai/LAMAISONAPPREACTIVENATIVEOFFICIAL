import { Image, SafeAreaView, Text, View } from 'react-native'
import React,{useState} from 'react'
import styles from './Styles'
import { hp2, wp2 } from '../../theme'
import { FlatList } from 'react-native-gesture-handler'
import OrderDetailscomp from '../../components/OrderDetailsComp/OrderDetailscomp'
import LoaderComp from '../../components/loaderComp'
import { COLORS } from '../../theme'
const OrderDetails = ({navigation,route}) => {
  const [orderData,setOrderData]=useState(route?.params?.item);
    const {item} = route.params
    const {addressData} = route.params
    const {orderStatus} = route.params

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
            orderStatus={orderStatus}
            addressData={addressData}
            user={item?.product?.user}
       
            orderId={item?.id}
            loaderState={{loadingStatusChange,setLoadingStatusChange,onChangeOrderStatus}}
          
            />
      </View>
        )
      }}
      />
      
      </View>
      </SafeAreaView>

      </>
  )
}

export default OrderDetails
