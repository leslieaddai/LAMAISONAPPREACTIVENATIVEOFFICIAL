import { Image, SafeAreaView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { hp2, wp2 } from '../../theme'
import styles from './styles'
import {SkypeIndicator} from 'react-native-indicators';


const OrderDetailscomp = (props) => {
    const [loading, setLoading] = useState(false)
    const onloading = (value,label)=>{
      setLoading(value)
    }
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
      <Text style={styles.textstyle} onPress={props.onpress}> {`Status - ${props.status}`}</Text>
      </View>
    </View>
  )
}

export default OrderDetailscomp