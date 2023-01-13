import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
const RefundPolicy = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Refund Policy"/>
        
            <View style={styles.body}>
                <Text style={styles.par}>Caretom Informatics Private Limited is the licensed owner of the brand Purie and the website www.purie.in (”The Site”). Caretom Informatics Private Limited respects your privacy. This Refund Policy provides succinctly the manner your data is collected and used by Caretom Informatics Private Limited on the Site. As a Customer to the Mobile Application/Website you are advised to please read the Refund Policy information details thoroughly. By accessing the services provided by the Mobile Application/WebSite you agree to the collection of your information and use your data by Caretom Informatics Private Limited are subject to the company Refund Policy.</Text>
                <Text style={styles.par}>Pricing</Text>
                
                <Text style={styles.par}>All pricing on Website/Mobile Application of “Purie” is displayed in Indian Rupee (INR) and is inclusive of any Tax unless otherwise stated. Any pricing and availability of products, services and offers displayed online are subject to change without notice.All products and services are subject to availability and we give no guarantee in this regard. You acknowledge and accept that the website information is subject to change at any time and may not necessarily be up to date or accurate at the time of your visit. Although the prices mentioned at the time of ordering will be the prices charged on the date of the delivery. Although prices of most of the products do not fluctuate on a daily basis, some of the commodities and fresh food prices do change on a daily basis. </Text>
                <Text style={styles.par}>Cancellation by Website/Mobile Application/Customer</Text>
                <Text style={styles.par}>Our focus is complete customer satisfaction. In the event, if you are displeased with the services provided, we will refund back the money, provided the reasons are genuine and proved after investigation. Please read the fine prints of each deal before buying it, it provides all the details about the services or the product you purchase. You as a customer can cancel your order anytime up to the cut-off time of the slot for which you have placed an order by calling our customer service. Customers can cancel/stop their subscription using Purie mobile application or by reaching out to the customer support. Multiple Accounts cannot be created with the same address, if found then Purie has the right to cancel/stop the Customer's subscription. In such a case we will refund any payments already made by you for the order into your wallet held with Purie. If we suspect any fraudulent transaction by any customer or any transaction which defies the terms & conditions of using the Website/Mobile Application, we at our sole discretion could cancel such orders. We will maintain a negative list of all fraudulent transactions and customers and would deny access to them or cancel any orders placed by them. Requests received later than 1 business day prior to the end of the current service period will be treated as cancellation of services for the next service period.</Text>
                <Text style={styles.par}>Return & Refunds</Text>
                <Text style={styles.par}>Purie has a Return and Refund policy which entitles all our members to return the product at the time of delivery if, due to some reason, they are not satisfied with the quality or freshness of the product. The return policy gives you an option to return milk packets within the same day of delivery and other products within 48 hours of delivery. Please don't use the product and preserve its original packaging and seal. Opened or damaged products will not be returned. We will take the returned product back with us and issue a credit note for the value of the return products which will be credited to your wallet/account on the Website/Mobile Application. </Text>

                
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default RefundPolicy

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
