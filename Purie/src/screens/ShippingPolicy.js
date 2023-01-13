import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
const ShippingPolicy = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Shipping Policy"/>
        
            <View style={styles.body}>
                <Text style={styles.par}>Caretom Informatics Private Limited is the licensed owner of the brand Purie and the website www.purie.in (”The Site”). Thank you for visiting and shopping at www.purie.in Following are the terms and conditions that constitute our Shipping Policy.</Text>
                <Text style={styles.par}>Shipment process</Text>
                <Text style={styles.par}>Shipping duration can vary as per the customer selection at the time of products checkout and it may get slow down because of numerous reasons like traffic conditions, road closure, depend upon customer/buyers address, natural delay like rain etc but Purie puts its best effort to delivery the products as per the specified time while checkout.</Text>
                <Text style={styles.par}>If we are experiencing a high volume of orders, shipments may be delayed as mentioned at the time of product checkout. Please allow additional time in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.</Text>
                <Text style={styles.par}>Shipping rates & delivery estimates</Text>
                <Text style={styles.par}>Shipping charges for your order will be calculated and displayed at the time of checkout.</Text>
                
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default ShippingPolicy

const styles = StyleSheet.create({
    body:{
        backgroundColor: '#F8F8FF',
        padding:20,
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        color: 'black',
    },
    par:{
        paddingTop:10,
        color: 'gray',
        textAlign:'justify',

    },
    points:{
        paddingLeft:20,
    }
})
