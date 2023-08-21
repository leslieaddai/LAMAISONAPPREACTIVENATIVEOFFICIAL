import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { hp2, wp2 } from '../../theme'

const SkeletonViewMainComp = (props) => {
    
  return (
    <SkeletonPlaceholder borderRadius={4} alignItems='center' backgroundColor='#dddddd'>
        <>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={styles.imageView}/>
            {props.nametag&&
            <View
            style={styles.namestyle}
            />
        }
        </View>
        <View style={styles.skeletonView}/>
        {props.postcomp&&
        <>
        <View style={styles.commentstyle}/>
        <View style={styles.datestyle}/>
        </>
        }
        </>
    </SkeletonPlaceholder>
  )
}

export default SkeletonViewMainComp

const styles = StyleSheet.create({
    skeletonView:{
        width: wp2(100),
        height: hp2(30),
        marginVertical:hp2(2)
      },
      datestyle:{
        width:wp2(20),
        height:hp2(2),
        marginVertical:hp2(1)
    },
    commentstyle:{
        width:wp2(30),
        height:hp2(2)
    },
    namestyle:{
        width:wp2(40),
        height:hp2(2),
        marginLeft:wp2(2)
    },
    imageView:{ 
        width: wp2(14),
        height: wp2(14),
        borderRadius: wp2(5)}

})