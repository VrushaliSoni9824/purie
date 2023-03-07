import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { useSelector } from 'react-redux'
import { API_LINK } from '../constants/Strings'
import { showMessage } from 'react-native-flash-message';
import RazorpayCheckout from 'react-native-razorpay';
import { showPrice } from '../utils'
import { updateWallet } from '../Store/user/actions'
import { connect } from 'react-redux'
import { SafeAreaView } from "react-native-safe-area-context";

const Wallet = ({updateWalletBalance, navigation}) => {
 
    
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    const reduxUser = useSelector(state => state.user);
    const [amount, setAmount] = useState('');
    const [amtText, setAmtText] = useState('');
    const [walletHistory, setwalletHistory] = useState('');
    const [wallet, setWallet] = useState(false);
    const last_blns = reduxUser.walletBalance;

    const makePayment = () => {
        console.log('RD U', reduxUser);

        const mobile  = reduxUser.customer.mobile;
        const phone = '+91' + mobile;
        const name = reduxUser.customer.name;
        const email = reduxUser.customer.email;
        
        

        var options = {
            description: 'Order at Purie',
            image: 'https://www.purie.in/images/PURIE.png',
            currency: 'INR',
           // key: 'rzp_test_do35dSw0dnY61g', // Your api key
            key: 'rzp_live_nRwexvw0ujgKDp', // Your api key
            amount: parseInt(amount) * 100,
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

                const txnId = data.razorpay_payment_id
              
        
              updateWalletAmt();

                         
            // handle success
           // alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
           // alert(`Error: ${error.code} | ${error.description}`);
          });
        

    }



    const updateWalletAmt = () => {

        fetch(API_LINK+'add-wallet',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify({
              
                    user_id: reduxUser.customer.userId,
                    amount: amount,
                    status: 'Credit',
                    payment_for: 'Wallet',
                    payment_status: 'Completed'

                
                 })
             })
            .then((response) => response.json())
            .then((responseData) => {
                showMessage({
                    message: "Success",
                    description: "Recharge Successfull",
                    type: "success",
                  });
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
                      //  reduxLoadPlans(responseData.subscribe_plan)

                      //  setCategories(responseData);
                       // set(true);
                      
                     // setApiStatus(false);
                     })
                    .catch(function(error) {
                                console.warn('There has been a problem with your fetch operation: ' + error);
                                 // ADD THIS THROW error
                                 setApiStatus(false);
                                  throw error;
                                
                                });
               showWalletHistory();
              
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your update wallet operation: ' + error);
                         // ADD THIS THROW error
                          throw error;
                        
                        });
        
    }
    


    console.log(reduxUser);

    useEffect(() => {
        
        if(!isInfoLoaded)
        {
            
            showWalletHistory();
            
        }

        return () => {
            
        }
    }, [isInfoLoaded]);


const showWalletHistory = () => {
    console.log("**************");
    console.log({user_id: reduxUser.customer.userId});
    console.log("**************");
    fetch(API_LINK+'wallet_history',{
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            mode: 'cors'
        },
        body: JSON.stringify({
            user_id: reduxUser.customer.userId
            
             })
         })
        .then((response) => response.json())
        .then((responseData) => {
            
            console.log('WALLET LIST RESPONSE:',responseData.wallet_history);
           // updateWalletBalance(responseData.wallet[0].wallet_amount);
           setwalletHistory(responseData.wallet_history);
             
           
        
          //setApiStatus(false);
         })
        .catch(function(error) {
                    console.warn('There has been a problem with your fetch operation: ' + error);
                     // ADD THIS THROW error
                  //   setApiStatus(false);
                      throw error;
                    
                    })
            ;

                    setIsInfoLoaded(true);

}


    const selectAmt = (amt) => {
        console.log('AMT',amt);
        setAmount(amt);
        setAmtText('('+showPrice(amt)+')')
    }
    


        const renderItem = (item) => {
            console.log('ITEM',item);
            return (
                <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>{showPrice(item.item.amount)}</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>{item.item.date}</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
            );   
        }
        

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Wallet"/>


                <View style={[styles.row, styles.sectionHeight]}>
                        <View style={[styles.col, styles.ac]}>
                        <TouchableOpacity onPress={() => selectAmt(500)} >
                        <Text style={styles.amount}>Rs.500</Text>
                        </TouchableOpacity>
                        </View>

                        <View style={[styles.col, styles.ac]}>
                        <TouchableOpacity onPress={() => selectAmt(1000)} >
                        <Text style={styles.amount}>Rs.1000</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={[styles.col, styles.ac]}>
                        <TouchableOpacity onPress={() => selectAmt(1500)} >
                        <Text style={styles.amount}>Rs.1500</Text>
                        </TouchableOpacity>
                        </View>
                        
                </View>

                    <View style={styles.form}> 
                    
                    <TextInput placeholder="Enter Amount..." style={styles.input} keyboardType="numeric" onChangeText={(text) => selectAmt(text)} />
                    
                    
                    
                </View>

                <View style={styles.recharge}>
                    <TouchableOpacity onPress={makePayment}>
                    
                        {
                          (amount != '') && <Text style={[styles.rechargeText,{textAlign: 'center'}]}>Pay {amtText}</Text> 
                        } 
                        
                        
                    </TouchableOpacity>
                        {
                            (amount == '') && <Text style={styles.rechargeText}>Enter Amount First</Text>
                        }
                    </View>



                    <View style={styles.history}>
                        <View style={styles.historyBor}>
                            <Text style={styles.HistoryText}>Your Recharge History</Text>
                        </View>
                        <View style={styles.record}>
                        
                        <FlatList
                        data={walletHistory}
                        keyExtractor={item => item.id}
                        renderItem={renderItem} />

                        </View>
                    </View>

{/* 
                <View style={styles.history}>
                    <View style={styles.historyBor}>
                        <Text style={styles.HistoryText}>Your Recharge History</Text>
                    </View>
                    <View style={styles.record}>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamount}>Amount</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamount}>Date</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamount}>Status</Text>
                            </View>
                                
                        </View>
                        </View>

                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>

                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>
                        <View>
                            <View style={[styles.recordrow]}>
                            <View style={[styles.recordcol, styles.recordac, styles.ids]}>
                            <Text style={styles.recordamounts}>Rs.3000</Text>
                            </View>

                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>21 Oct 2021</Text>
                            </View>
                            <View style={[styles.recordcol, styles.recordac]}>
                            <Text style={styles.recordamounts}>Paid</Text>
                            </View>
                                
                        </View>
                        </View>

                    </View>
                </View> */}



        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

//export default Wallet

const styles = StyleSheet.create({
    recordamounts:{
        padding:5,
        borderColor:'green',
        fontSize:16,
        color:'#2f746f',
        
    },
    recordamount:{
        padding:5,
        borderColor:'green',
        fontSize:20,
        color:'#2f746f',
        fontWeight:'bold',
    },
    ids:{
        width:'10%',
    },
    recordac:{
        
        borderColor: '#2f746f', 
        
        borderWidth: .5,  
    },
    recordcol:{
        flex: 1,
    },
    recordrow:{
        flexDirection: 'row',
    },
    record:{
        backgroundColor:'#D5E6E5',
        
    },
    historyBor:{
        paddingBottom:10,
        borderBottom: 1
    },
    HistoryText:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#2f746f',

        
    },
    history:{
        padding:20,
        
    },
    amount:{
        padding:10,
        borderColor:'green',
        // backgroundColor:'gray',
        fontSize:20,
        color:'#2f746f',
        
    },

    sectionHeight: {
        marginTop: '3%'
    },
    ac:{
        alignItems: 'center',
        // backgroundColor:'gray'
        borderColor: '#2f746f', 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        
    },
    ar: {
        alignItems: 'flex-end'
    },
    col: {
        flex: 1,
        margin:5,
    },
    row: {
        flexDirection: 'row',
        paddingLeft:20,
        paddingRight:20,
        
    },

    form:{
        padding:20
    },
    phone:{
        
        fontWeight:'600',
        color:'#2f746f',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
    },
    recharge:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:100,
        marginRight:100,
        borderRadius:50,
        paddingBottom: 8
        
    },
    rechargeText:{
        color:'white',
        paddingTop:8,
        fontSize:16,
        fontWeight:'600',
    },
})


const mapStateToProps = state => {
    return {
        reduxUser : state.user,
        reduxPlans: state.subscriptionPlans
    };
}

const mapDispatchToProps = dispatch => {
    return {
        
        updateWalletBalance : amt => dispatch(updateWallet(amt))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Wallet);