import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
const PrivacyPolicy = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Privacy Policy"/>
        
            <View style={styles.body}>
                <Text style={styles.par}>Caretom Informatics Private Limited is the licensed owner of the brand Purie and the website www.purie.in (”The Site”). Caretom Informatics Private Limited respects your privacy. This Privacy Policy provides succinctly the manner your data is collected and used by Caretom Informatics Private Limited on the Site. As a Customer to the Mobile Application/Website you are advised to please read the Privacy Policy information details thoroughly. By accessing the services provided by the Mobile Application/WebSite you agree to the collection of your information and use your data by Caretom Informatics Private Limited are subject to the company Privacy Policy.</Text>
                <Text style={styles.par}>What data do we collect about you (customers/visitors)?</Text>
                <Text style={styles.par}>As part of the registration process on the Website/Mobile Application, Caretom Informatics Private Limited may collect the following personally identifiable information about you: Name including first and last name, alternate email address, Address, Mobile phone number and contact details, Postal code, Demographic profile (like your age, gender, occupation, education, address etc.) and information about the pages on the Website/Mobile Application you visit/access, the links you click on the Website/Mobile Application, the number of times you access the page and any such browsing information along with your lifestyle preferences.</Text>
                <Text style={styles.par}>How do we collect the Data?</Text>
                <Text style={styles.par}>Caretom Informatics Private Limited will collect personally identifiable information about you only as part of a voluntary registration process, on-line survey or any combination thereof. The Website/Mobile Application may contain links to other Website/Mobile Application. Caretom Informatics Private Limited is not responsible for the privacy practices of such Website/Mobile Application which it does not own, manage or control. The Website/Mobile Application and third-party vendors, including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such as the DoubleClick cookie) together to inform, optimize, and serve ads based on someone’s past visits to the Website/Mobile Application.</Text>
                <Text style={styles.par}>How is data used?</Text>
                <Text style={styles.par}>Caretom Informatics Private Limited will use your personal information to provide personalized features to you on the Website/Mobile Application and to provide promotional offers to you through the Website/Mobile Application and other channels. Caretom Informatics Private Limited will also provide this information to its business associates and partners to get in touch with you when necessary to provide the services requested by you. Caretom Informatics Private Limited will use this information to preserve transaction history as governed by existing law or policy. Caretom Informatics Private Limited may also use contact information internally to direct its efforts for product improvement, to contact you as a survey respondent, to notify you if you win any contest; and to send you promotional materials from its contest sponsors or advertisers. Caretom Informatics Private Limited will also use this information to serve various promotional and advertising materials to you via display advertisements through the Google Ad network on third party Website/Mobile Application. You can opt out of Google Analytics for Display Advertising and customize Google Display network ads using the Ads Preferences Manager. Information about Customers on an aggregate (excluding any information that may identify you specifically) covering Customer transaction data and Customer demographic and location data may be provided to partners of Caretom Informatics Private Limited for the purpose of creating additional features on the Website/Mobile Application, creating appropriate merchandising or creating new products and services and conducting marketing research and statistical analysis of customer behaviour and transactions.</Text>
                <Text style={styles.par}>With whom your data will be shared?</Text>
                <Text style={styles.par}>Caretom Informatics Private Limited will not use your financial information for any purpose other than to complete a transaction with you. Caretom Informatics Private Limited does not rent, sell or share your personal information and will not disclose any of your personally identifiable information to third parties. In cases where it has your permission to provide products or services you’ve requested and such information is necessary to provide these products or services the information may be shared with Caretom Informatics Private Limited’s business associates and partners. Caretom Informatics Private Limited may, however, share consumer information on an aggregate with its partners or third parties where it deems necessary. In addition, Caretom Informatics Private Limited may use this information for promotional offers, to help investigate, prevent or take action regarding unlawful and illegal activities, suspected fraud, potential threat to the safety or security of any person, violations of the Website/Application’s terms of use or to defend against legal claims; special circumstances such as compliance with subpoenas, court orders, requests/order from legal authorities or law enforcement agencies requiring such disclosure.</Text>
                <Text style={styles.par}>Financial Information</Text>
                <Text style={styles.par}>Caretom Informatics Private Limited does not store/use any financial information. Caretom Informatics Private Limited uses third party software like Razorpay for any financial transactions and has no liability towards any transaction conducted through such software. You may visit Razorpay website (www.razorpay.com) for details on their policies and Terms of service.</Text>
                <Text style={styles.par}>How can you correct inaccuracies in the data?</Text>
                <Text style={styles.par}>To correct or update any information you have provided, the Website/Mobile Application allows you to do it online. In the event of loss of access details or if you are unable to change details online, you can contact at vrindavanmilk.com/contact.</Text>
                <Text style={styles.par}>Policy updates</Text>
                <Text style={styles.par}>Caretom Informatics Private Limited reserves the right to change or update this policy at any time. Such changes shall be effective immediately upon posting to the Website/Mobile Application.</Text>
                <Text style={styles.par}>Grievance Officer</Text>
                <Text style={styles.par}>In accordance with the Information Technology Act, 2000 and Rules made thereunder, the name and contact details of the Grievance Officer are provided below:</Text>
                <Text style={styles.par}>Address: 398A, Udyog Kendra 1, Ecotech III, Greater Noida, Uttar Pradesh 201301</Text>
                <Text style={styles.par}>Name: Sudip Biswas</Text>
                <Text style={styles.par}>Phone No: 9891246728</Text>
                <Text style={styles.par}>WhatsApp No: 9891246728</Text>
                <Text style={styles.par}>E-mail: sudip@purie.in</Text>
                <Text style={styles.par}>If you wish to make a complaint regarding any violation of the provisions of the Policy, you may send a written complaint to the Grievance Officer, who shall redress the complaint in accordance with the provisions of the Information Technology Act, 2000 and Rules made thereunder.</Text>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

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
