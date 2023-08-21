import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { hp2, wp2 } from '../../theme'

const SkeletonViewSearchComp = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
            <View style={{marginTop:hp2(2),flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.skeletonView} />
            <View style={styles.skeletonView} />
            <View style={styles.skeletonView} />
            </View>
            
            </SkeletonPlaceholder>
  )
}

export default SkeletonViewSearchComp

const styles = StyleSheet.create({
    skeletonView:{
        borderRadius: wp2(2),
        width: wp2(28),
        height:hp2(22),
        marginHorizontal: wp2(2),
        marginVertical: hp2(2),
      },
})