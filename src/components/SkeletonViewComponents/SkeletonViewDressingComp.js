import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { hp2, wp2 } from '../../theme'

const SkeletonViewDressingComp = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
    <View>
    <View style={{flexDirection: 'row', alignItems: 'center',width:wp2(100)}}>
    <View style={styles.skeletonView} />
    <View style={styles.skeletonlikeView} />
    <View style={styles.skeletonlikeView} />
    <View style={styles.skeletonlikeView} />
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={styles.skeletonMainView}/>
    <View>
    <View style={styles.skeletonimage}/>
    <View style={styles.skeletonimage}/>
    </View>
    </View>
    <View style={{flexDirection:'row'}}>
    <View style={styles.skeletonMainView}/>
    <View>
    <View style={styles.skeletonimage}/>
    <View style={styles.skeletonimage}/>
    </View>
    </View>
    </View>
    </SkeletonPlaceholder>
  )
}

export default SkeletonViewDressingComp

const styles = StyleSheet.create({
    skeletonlikeView:{
        width: wp2(14),
        height: hp2(6),
        borderRadius: wp2(4),
        marginHorizontal:wp2(3),
        marginTop:hp2(2)
      },
      skeletonView:{
        width: wp2(16),
        height: hp2(8),
        borderRadius: wp2(6),
        marginHorizontal:wp2(4),
        marginRight:wp2(11),
        marginTop:hp2(2)
      },
      skeletonMainView:{
        width: wp2(54), 
        height: hp2(28), 
        borderRadius: wp2(2),
        marginLeft:wp2(4),
        marginVertical:hp2(2)
      },
      skeletonimage:{ 
        width: wp2(34), 
        height: hp2(14), 
        borderRadius: wp2(2),
        marginVertical:hp2(1),
        marginLeft:wp2(4)
    },
})