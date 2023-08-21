import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { hp2, wp2 } from '../../theme'

const SkeletonEditorProfileComp = () => {
    let data =[{},{},{},{},{}]
  return (
    <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
        <View style={styles.ImageView}/>
        <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp2(2)}}>
            <View style={styles.nameView}/>
            <View style={styles.followbtn}/>
        </View>
        <View style={styles.textView}/>
        <View style={styles.populartxt}/>
        <View style={{flexDirection:'row'}}>
        {data.map((item,key)=>(
        <View key={key} style={styles.poplarprod}/>
            )
        )}
        </View>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <View style={styles.wardrobe}/>
        <View style={styles.wardrobe}/>
        <View style={styles.wardrobe}/>
        </View>
        <View style={styles.lookbookbtn}/>
        <View style={{flexDirection:'row',justifyContent:'center',flexWrap:'wrap'}}>
        <View style={styles.nextpickup}/>
        <View style={styles.nextpickup}/>
        <View style={styles.nextpickup}/>
        <View style={styles.nextpickup}/>
        <View style={styles.nextpickup}/>
        <View style={styles.nextpickup}/>
        </View>
        <View style={styles.lookbookbtn}/>
    </SkeletonPlaceholder>
  )
}

export default SkeletonEditorProfileComp

const styles = StyleSheet.create({
    ImageView:{
        width: wp2(100),
        height: hp2(28),
    },
    textView:{
        width:wp2(70),
        height:hp2(2),
        marginTop:hp2(1),
        marginLeft:wp2(2)
    },
    nameView:{
        width:wp2(40),
        height:hp2(4),
        marginTop:hp2(1)
    },
    followbtn:{
        width:wp2(40),
        height:hp2(4),
        marginTop:hp2(1),
        borderRadius:20
    },
    populartxt:{
        width:wp2(60),
        height:hp2(4),
        marginLeft:wp2(2),
        marginTop:hp2(1)
    },
    poplarprod:{
        width: wp2(20),
        height: hp2(10),
        borderRadius: wp2(6),
        marginTop:hp2(2),
        marginLeft:wp2(2)
    },
    wardrobe:{width: wp2(28),
        height: hp2(12),
        overflow: 'hidden',
        marginHorizontal: wp2(1),
        marginTop: hp2(2),
        borderRadius: wp2(4),
    },
    lookbookbtn:{
        width:wp2(70),
        height:hp2(5),
        borderRadius:20,
        marginTop:hp2(2),
        alignSelf:'center'
    },
    nextpickup: {
    width: wp2(28),
    height: hp2(12),
    overflow: 'hidden',
    marginHorizontal: wp2(1),
    marginTop: hp2(1),
    }
})