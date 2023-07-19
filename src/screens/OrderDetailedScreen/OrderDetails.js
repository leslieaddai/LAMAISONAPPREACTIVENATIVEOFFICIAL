import { Image, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import styles from './Styles'
import { hp2, wp2 } from '../../theme'
import { FlatList } from 'react-native-gesture-handler'
import OrderDetailscomp from '../../components/OrderDetailsComp/OrderDetailscomp'
const OrderDetails = ({navigation,route}) => {
    const {item} = route.params
  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Text style={styles.orderText}>Order Details</Text>
      <FlatList
      data={item}
      renderItem={({item})=>{
        return(
        <View style={styles.ConatinerView}>
            <OrderDetailscomp
            uri={item?.product?.product_images[0]?.image[0]?.original_url}
            productname={item?.product?.name}
            description={item?.product?.description}
            quantity={item?.qty}
            size={item?.size.size}
            colourcode={item?.color?.color_code}
            price={item?.price}
            status={item?.status.status}
            onpress={()=>{console.log(item.product_id)}}
            />
      </View>
        )
      }}
      />
      
      </View>
      </SafeAreaView>
  )
}

export default OrderDetails
