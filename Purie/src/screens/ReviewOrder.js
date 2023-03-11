import React, {useState} from 'react'
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, ScrollView, KeyboardAvoidingView, Alert, Keyboard  } from 'react-native'
import MemberHeader from '../common/MemberHeader';
//import { useSelector } from 'react-redux';
import { showDate, showDateFromTimeString, showPrice, showValidity } from '../utils';
import { connect } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { saveTxn } from '../Store/user/actions';
import { ORDERSTATUSSCREEN } from '../constants/Screens';
import { SafeAreaView } from "react-native-safe-area-context";
import { API_LINK } from '../constants/Strings';
import { updateWallet } from '../Store/user/actions';
import { showMessage } from 'react-native-flash-message';

import SuccessError from '../screens/SuccessError';

const ReviewOrder = ({navigation, route, reduxUser, reduxSaveTxn, updateWalletBalance }) => {

   // const reduxUser =  useSelector(state => state.user);

   const [showAlert1, setshowAlert1] = useState(false);
   const [isError, setisError] = useState(false);
   const [alertTitle,setalertTitle] = useState("");    
   const [alertSubTitle,setalertSubTitle] = useState("");

    const { productName, planName, productImage, price, qty, duration, frequency, timeSlot, startDate, orderId, discount, couponDiscount } = route.params;
    console.log('REVIEW ORDER',route.params);

    const [apiStatus, setapiStatus] = useState(false);
    
    const processAddress = () => {
        navigation.replace(ORDERSTATUSSCREEN);
    }

    
    const makePayment = () => {
        console.log('RD U', reduxUser);

        const mobile  = reduxUser.customer.mobile;
        const phone = '+91' + mobile;
        const name = reduxUser.customer.name;
        const email = reduxUser.customer.email;

        const pay =  (reduxUser.walletBalance < 0 )? parseInt(reduxUser.walletBalance * -1) + 150  :150 - parseInt(reduxUser.walletBalance);

        console.log('you pay',pay);

        var options = {
            description: 'Order at Purie',
            image: 'https://www.purie.in/images/PURIE.png',
            currency: 'INR',
           // key: 'rzp_test_do35dSw0dnY61g', // Your api key
            key: 'rzp_live_nRwexvw0ujgKDp', // Your api key
            amount: pay * 100,
            name: 'Purie',
            prefill: {
              email: email,
              contact: phone,
              name: name
            },
            theme: {color: '#2f746f'}
          }

          RazorpayCheckout.open(options).then((data) => {
              console.log('PAYMENT RESPNSE',data);

                const txnId = data.razorpay_payment_id;
             

                fetch(API_LINK+'add-wallet',{
                    method : 'POST',
                    headers : {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        mode: 'cors'
                    },
                    body: JSON.stringify({
                      
                            user_id: reduxUser.customer.userId,
                            amount: pay,
                            status: 'Credit',
                            payment_for: 'Wallet',
                            payment_status: 'Completed'
        
                        
                         })
                     })
                    .then((response) => response.json())
                    .then((responseData) => {
                        // showMessage({
                        //     message: "Success",
                        //     description: "Recharge Successfull",
                        //     type: "success",
                        //   });
                        setalertTitle(responseData.message);
                        setalertSubTitle(" ");
                        setisError(false);
                        setshowAlert1(true);
                        // console.log('WALLET UPDATE status data',responseData);
                        fetch(API_LINK+'wallet',{
                            method : 'POST',
                            headers : {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                                mode: 'cors'
                            },
                            body: JSON.stringify({
                                userid: reduxUser.customer.userId
                                
                                 })
                             })
                            .then((response) => response.json())
                            .then((responseData) => {
                               
                                console.log('Wallet DATA',responseData);
                                if(responseData.wallet[0].wallet_amount != '')
                                {
                                    updateWalletBalance(responseData.wallet[0].wallet_amount);  
                                }
                                else
                                {
                                    updateWalletBalance(0);
                                }
                                setWallet(true);  
                              
                             })
                            .catch(function(error) {
                                        console.warn('There has been a problem with your fetch operation: ' + error);
                                         // ADD THIS THROW error
                                       //  setApiStatus(false);
                                          throw error;
                                        
                                        });
                       //showWalletHistory();
                      
                     })
                    .catch(function(error) {
                                console.warn('There has been a problem with your update wallet operation: ' + error);
                                 // ADD THIS THROW error
                                  throw error;
                                
                     });
                
        
             reduxSaveTxn(txnId);
             navigation.replace(ORDERSTATUSSCREEN);

            });

        }


    

    return (
       <>
       <SafeAreaView style={{ flex: 1,  }}>
       <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
       <MemberHeader  title="Review Order"/>
        <ScrollView>
            
            <View style={styles.page}>
                
            <Image source={{uri: productImage}} style={styles.productimage} resizeMode="contain" />

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Product</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{productName}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Plan</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{planName}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Quantity</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{qty}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Duration</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{showValidity(duration)}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Frequency</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{frequency}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Time Slot</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{timeSlot}</Text></View>
            </View>

            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Start From</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{showDate(startDate)}</Text></View>
            </View>
            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Sub Total</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{showPrice(price + discount)}</Text></View>
            </View>

            {
                discount != 0 &&
            
            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Discount</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{showPrice(discount)}</Text></View>
            </View>

            }

            {
                couponDiscount != 0 &&
            
            <View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Coupon Discount</Text></View>
                <View style={styles.col}><Text style={styles.bold}>{showPrice(couponDiscount)}</Text></View>
            </View>

            }

<View style={[styles.row, styles.bgWhite]} >
                <View style={styles.col}><Text>Total Amount</Text></View>
                <View style={styles.col}><Text style={[styles.bold,{  color: 'black'}]}>{showPrice(price  - couponDiscount)}</Text></View>
            </View>

            </View>
        </ScrollView>


        <View style={styles.buttons} >
            
                    <View style={styles.subscribe}>
                        {
                            reduxUser.walletBalance < 150 ?
                            <>
                                {
                            (!apiStatus) 
                            ?
                            <TouchableOpacity style={styles.subscribe} onPress={makePayment}>
                                 <View style={styles.subscribe_btn}>
                            <Text style={styles.subscribenow}>Make Payment</Text>
                            </View>
                            </TouchableOpacity>
                        
                            :
                            <TouchableOpacity style={styles.subscribe}>
                                 <View style={styles.subscribe_btn}>
                            <ActivityIndicator color="white" size={20}  style={{ padding: 16}}/>
                            </View>
                            </TouchableOpacity>
                        }
                            </>
                            :
                            <>
                                {
                            (!apiStatus) 
                            ?
                            <TouchableOpacity style={styles.subscribe} onPress={processAddress}>
                                 <View style={styles.subscribe_btn}>
                            <Text style={styles.subscribenow}>Start Subscription</Text>
                            </View>
                            </TouchableOpacity>
                        
                            :
                            <TouchableOpacity style={styles.subscribe}>
                                 <View style={styles.subscribe_btn}>
                            <ActivityIndicator color="white" size={20}  style={{ padding: 16}}/>
                            </View>
                            </TouchableOpacity>
                        }
                            </>
                        }
                        
                   
                   </View>
                </View>
                </SafeAreaView>
       </>
    )
}

//export default ReviewOrder

const styles = StyleSheet.create({
    subscribe_btn: {
        width:'100%',
        height:60,
        alignItems:'center',
        justifyContent:'center'
    },
    bold: {
        fontWeight: 'bold',
        color: '#666'
    },
    page: {
        
        flex: 1,
        marginHorizontal: 10,
        
    },
    productimage: {
        width: 'auto',
        height: 200,
        
    },
    bgWhite: {
        backgroundColor: 'white'
    },
    row: {
        flexDirection: 'row',
        marginVertical: 3,
        paddingHorizontal: 10,
        paddingVertical: 10, 
       
    },
    col: {
        flex: 1
    },
    subscribe:{
        backgroundColor:'#2f746f',
        width:'100%',
        height:60,
        alignItems:'center',
        justifyContent:'center'
    },
    subscribenow:{
        color:'white',
        fontSize:20,
        fontWeight:'600',
    },


})

const mapStateToProps = (state) => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        reduxSaveTxn : txnId => dispatch(saveTxn(txnId)),
        updateWalletBalance : amt => dispatch(updateWallet(amt))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewOrder);