import {  StyleSheet } from 'react-native'

import {  hp2, wp2 } from '../../theme'
import { RFValue } from 'react-native-responsive-fontsize'

const styles = StyleSheet.create({
    container: {
        paddingBottom:hp2(4),
    },
    orderText: {
        color: 'black',
        fontWeight: '700',
        fontSize: RFValue(24),
        marginTop: Platform.OS === 'ios' ? hp2(0) : hp2(4),
        textAlign: 'center'
    },
    imageView: {
        width: wp2(60),
        height: hp2(30),
        borderRadius: 20,
    },
    imagecontainer: {
        width: wp2(60),
        height: hp2(30),
        borderRadius: 20,
        alignSelf: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 5
    },
    skeletonView:{
        width: wp2(60),
        height: hp2(30),
        borderRadius: 20,
    },
    textstyle: {
        color: 'black',
        fontSize: hp2(2),
        fontWeight: 'bold',
        marginTop: hp2(2),
        marginHorizontal: wp2(10)
    },
    nametextstyle: {
        color: 'black',
        fontSize: hp2(2),
        fontWeight: 'bold',
        marginTop: hp2(2),
    },
    rowView: {
        flexDirection: 'row',
    },
    colourText: {
        color: 'black',
        fontSize: hp2(2),
        fontWeight: 'bold'
    },
    colourView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: wp2(10),
        marginTop: hp2(2)
    },
    ConatinerView: {
        marginTop: hp2(2)
    },
    statusbtn: {
        justifyContent: 'center',
    },
    iconstyle: {
        paddingLeft:wp2(2)
    },
    namestyle:{
        flexDirection:'row',
        marginHorizontal:wp2(10)
    }
})
export default (styles)