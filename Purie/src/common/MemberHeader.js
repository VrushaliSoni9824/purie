import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/routers';
import { useSelector } from 'react-redux';
import {showPrice} from '../utils';
import { COLORS } from '../constants/Colors';
import { WALLETSCREEN, CARTSCREEN } from '../constants/Screens';

const toggleDrawer = (navigation) => {
        
    
    navigation.openDrawer();
}

const MemberHeader = ({title}) => {

    const reduxUser = useSelector(state => state.user);

    const navigation = useNavigation();

    console.log('RDW',reduxUser);


  

    return (
        <View style={styles.nav}>
            <View style={styles.row}>
                <View style={styles.col}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon name="menu" color="#087E8B" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.col2, styles.ac]}>
                    <Text style={styles.heading}>{title}</Text>
                </View>
                <View style={[styles.col, styles.ar]}>
                    
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('PROFILE', { screen : WALLETSCREEN})} style={{flexDirection: 'row'}}>
                            <Icon name="wallet-outline" color="#087E8B" size={25} />
                        <Text style={{  backgroundColor: COLORS.PRIMARY, paddingHorizontal: 10, borderRadius: 20, color: "white", fontWeight: 'bold', paddingTop: 3}}>{showPrice(reduxUser.walletBalance)}</Text>
                           </TouchableOpacity>
                        
                        </View>
                </View>
            </View>
            
        </View>
    )
}

export default MemberHeader

const styles = StyleSheet.create({
    ac: {
        alignItems: 'center'
    },
    ar: {
        alignItems: 'flex-end'
    },
    heading:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#087E8B',
        paddingTop: 3
    },
 nav: {
     
    // position: 'absolute',
     width: '100%',
     height: 50,
     alignSelf: 'center',
     justifyContent: 'center',
     backgroundColor: 'white',
     paddingHorizontal: 15

 },
 row: {
     flexDirection: 'row'
 },
 col: {
     flex:1
 },
 col2: {
     flex: 2
 }
})
