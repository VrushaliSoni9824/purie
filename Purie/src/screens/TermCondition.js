import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
const TermCondition = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Term And Conditions"/>
        
            <View style={styles.body}>
                <Text style={styles.par}>
                Please read the following important information before using Purie website- www.purie.in /Mobile Application 
                available on Apple Store/Google Play Store. By using Purie website- www.purie.in /Mobile Application, you are accepting our 
                terms and conditions of use. If you do not agree with the following terms, do not use this website.
                </Text>
                <View style={styles.points}>
                    <Text style={styles.par}>1. Application of terms and conditions</Text>
                    <Text style={styles.par}>This website/Application “Purie” is operated by “Caretom Informatics Private Limited”, an India 
                        based company incorporated under the Indian Companies Act of 1956 . The policy is issued by “Caretom Informatics Private Limited”.
                         By placing an order on this site you are entering into a purchase/sale 
                        transaction with “Purie”.The terms and conditions are enumerated as follows. </Text>

                    <Text style={styles.par}>2. Modification of Terms and Monitoring of Websites.</Text>
                    <Text style={styles.par}>Caretom Informatics Private Limited reserves the right to modify, add, or remove portions of these 
                        terms at any time. We suggest you check periodically for changes. If you use the website after we post changes to 
                        the terms, you accept the changes. We reserve the right to monitor use of the website</Text>
                    <Text style={styles.par}>3. Copyrights and Restrictions on Use of Materials.</Text>
                    <Text style={styles.par}>The contents of this website are protected by applicable copyright laws. No permission is granted to copy, distribute, modify, 
                        post, or frame any test, graphic, video, audio, software code, user interface, design, or logo.</Text>

                    <Text style={styles.par}>4. Limited License.</Text>
                    <Text style={styles.par}>Individuals may, for personal use only, bookmark or point to any page within this website. Other users may link only to “Purie” home page, www.purie.in, 
                        and, in doing so, must deliver our home page address, www.purie.in. Linking in any other way is prohibited without express written consent.</Text>
                
                    <Text style={styles.par}>5. Eligibility</Text>
                    <Text style={styles.par}>You represent and warrant that you are competent and eligible to enter into a legally binding agreement and have the requisite authority to bind the other party to 
                        this Agreement. You shall not use this Site if you are not competent to contract under the applicable laws, rules and regulations.</Text>
                
                    <Text style={styles.par}>6. Term</Text>
                    <Text style={styles.par}>This Agreement shall continue to be in full force and effect for so long as you are using the site. The site provides online shopping platform wherein the Users can purchase/buy the products and services listed on it pursuant to the terms and conditions set forth below. By clicking on the “Proceed to Payment” button, you are agreeing to use the Services in a manner consistent with and abide by the terms and conditions of this Agreement, our Privacy Policy, and with all applicable laws and regulations.</Text>
                    
                    <Text style={styles.par}>7.Termination</Text>
                    <Text style={styles.par}>Either User/ You or “Caretom Informatics Private Limited” may terminate the agreement at any time, with or without cause. However, “Caretom Informatics Private Limited” reserves the right, in its sole discretion, to terminate your access to the products and services offered on the site or any portion thereof at any time, without notice.</Text>

                    <Text style={styles.par}>8. Pricing and Availability of Products and/or Services</Text>
                    <Text style={styles.par}>All pricing on Website/Application of “Purie” is displayed in Indian Rupee (INR) and is inclusive of any Tax unless otherwise stated. Any pricing and availability of products, services and offers displayed online are subject to change without notice. All products and services are subject to availability and we give no guarantee in this regard. You acknowledge and accept that the website information is subject to change at any time and may not necessarily be up to date or accurate at the time of your visit. “Caretom Informatics Private Limited” accepts no liability for any errors or omissions, whether on behalf of itself or third parties. The address at which delivery of the products ordered by you are to be made should be correct and proper in all respects.</Text>
                    <Text style={styles.par}>After the receipt of payment the Buyer/ cash on delivery as the case may be, “Caretom Informatics Private Limited” shall arrange for the delivery of the product to the recipient at the shipping address provided by the Buyer. Any and all orders placed by you on this Site are a firm commitment to purchase and you are obligated to complete the transaction and not contest it in any way. Before placing an order you are advised to check the product description carefully. The prices mentioned at the time of ordering will be the prices charged on the date of the delivery. Although prices of most of the products do not fluctuate on a daily basis, some of the commodities and fresh food prices do change on a daily basis. </Text>
                    <Text style={styles.par}>By placing an order for a product you agree to be bound by the conditions of sale included in the item's description. </Text>

                    <Text style={styles.par}>9. Online Website Application Availability</Text>
                    <Text style={styles.par}>The “Caretom Informatics Private Limited”. entrusts the hosting of our sites to a specialist company and we are committed to proving this on a continual basis, however we do not warrant that the site will be continuously available at all times due to regular maintenance activity, It is expected that at times unforeseeable interruptions to this service may occur. Such activities are potentially outside our control.</Text>


                    <Text style={styles.par}>10. Offer & Cashback</Text>
                    <Text style={styles.par}>Maximum Cashback Upto Rs 250.</Text>
                    <Text style={styles.par}>Cannot Be clubbed with any other offer.</Text>
                    <Text style={styles.par}>Maximum 1 Offer on 1 Address.</Text>
                    <Text style={styles.par}>Offer valid on first recharge only.</Text>
                    <Text style={styles.par}>Cashback Amount cannot be Refunded.</Text>
                    <Text style={styles.par}>Cashback component of the wallet balance cannot be utilized to buy prepaid products (Ghee, Fruits & Vegetables etc.)</Text>


                    <Text style={styles.par}>11. Customer Referral Program </Text>
                    <Text style={styles.par}>a) The Referee and the Referrer cannot have the same address.</Text>
                    <Text style={styles.par}>b) Referral bonus cannot be clubbed with any other promotional offer or bonus.</Text>
                    <Text style={styles.par}>c) No person under 18 years of age, may use, access or participate in the referral program at any time or in any manner.</Text>


                    <Text style={styles.par}> 12.Delivery Agent Liability</Text>
                    <Text style={styles.par}>“Caretom Informatics Private Limited” employs Part-time/Student/other Delivery Agent and outsourcing company agreement. “Caretom Informatics Private Limited” is not responsible for any act of theft/vandalism/harassment caused by the Delivery agent.</Text>

                    <Text style={styles.par}>13.Pre-paid Products</Text>
                    <Text style={styles.par}>To place an order for a prepaid product, you are required to recharge your CD wallet with the MRP of the select product via the various payment modes available.</Text>

                    <Text style={styles.par}>14. Communication Policy</Text>
                    <Text style={styles.par}>By signing up with “Caretom Informatics Private Limited”, customer agrees to receive communication on WhatsApp, push notifications, SMS, Email, Customer Support Call, App and Website</Text>

                    <Text style={styles.par}>15. Disclaimer of Consequential Damages</Text>
                    <Text style={styles.par}>Your use of and browsing on this Site are at your own risk. Neither “Caretom Informatics Private Limited” Company or any parties, organizations or entities associated with the corporate brand name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of data information or business interruption) resulting from the use or inability to use the Website and the Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or not, such organization or entities were advised of the possibility of such damages. Without limiting the foregoing, everything on this Site is provided to you "as is" without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranty of merchantability, fitness for a particular purpose, or non-infringement. you expressly agree that your use of the site is at your sole risk.</Text>

                    <Text style={styles.par}>16. Governing Law</Text>
                    <Text style={styles.par}>These Terms and Conditions are governed by and construed in accordance with the Indian Penal Code. In the event that a dispute arises from these Terms of Use, you agree to submit to the non-exclusive jurisdiction of the courts of Delhi, India. If any part of these Terms of Use is found to be invalid or unenforceable, it shall be severed without affecting the remainder.</Text>


                </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default TermCondition

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
