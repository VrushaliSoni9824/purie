import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../constants/Colors';
import { connect } from "react-redux";
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { PLACEORDERSCREEN, WALLETSCREEN, WALLETSCREENPAY, ORDERSTATUSSCREEN, CARTSCREEN } from '../constants/Screens';
import { showPrice } from '../utils';
import OrderListView from '../common/OrderListView';
import PlaceOrderListView from '../common/PlaceOrderListView';
import {useDispatch} from 'react-redux';
import { emptyCart } from '../Store/user/actions'; 
import { updateWallet } from '../Store/user/actions';
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceOrder = ({ navigation, reduxUser, reduxCart, updateWalletBalance}) => {


    const [apiStatus, setApiStatus] = useState(0);
    const [isLoading, setLoading] = useState(false);
    //const [first, setfirst] = useState(second);
    const dispatch = useDispatch();

    const cartObject = reduxCart.cart.map((item) => ({key:item.id, id:item.id, name: item.name, image: item.image, rate: item.rate, qty: item.qty }));
    // console.log(`cartObject`, cartObject);

    useEffect( () => {
        console.log(isLoading);
    }, [isLoading]);

    const validateBalance = () => {
        if(parseInt(reduxCart.total) > parseInt(reduxUser.walletBalance))
        {
            showMessage({
                message: "Error",
                description: 'Please recharge wallet to proceed',
                type: "default",
                backgroundColor: 'red'
              });
            //  navigation.navigate('PROFILE', { screen : WALLETSCREEN});
        }
    }
    

    useEffect(() => {
       validateBalance();
    }, []);
   
 
  
    const processAddress = () => {

        // setLoading(!isLoading);
        var valid = true;
        // console.log("Hello clik");
        
        setLoading(true);

       
        

        if(valid)
        {

            if(!isLoading){
                Keyboard.dismiss();
                console.log("***********************aaaaaaaaaaa*********************************")
                console.log(JSON.stringify({
                    user_id: reduxUser.customer.userId,
                     }))
                console.log("********************************************************")
                fetch(API_LINK+'place_order',{
                    method : 'POST',
                    headers : {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        mode: 'cors'
                    },
                    body: JSON.stringify({
                        user_id: reduxUser.customer.userId,
                        
                         })
                     })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log("********************************************************")
                     console.log('ORDER RESPONSE:',responseData);
                     console.log("********************************************************")
                       
                      if(responseData.status == 'Success')
                      {
                        // setOldpassword('');
                        // setPassword('');
    
                     showMessage({
                            message: "Success",
                            description: responseData.message,
                            type: "success",
                          }); 
    
                    dispatch(emptyCart());
                    // walletBalance();
                    updateWalletBalance(reduxUser.walletBalance - reduxCart.total); 
                          navigation.replace(CARTSCREEN);
                       }
                      else
                      {
                        showMessage({
                            message: "Error",
                            description: responseData.message,
                            type: "default",
                            backgroundColor: 'red'
                          });
                        //Alert.alert('Error',responseData.message);
                      }
    
                    //   setApiStatus(0);
                    setLoading(false);
                     })
                    .catch(function(error) {
                                console.warn('There has been a problem with your fetch operation: ' + error);
                                 // ADD THIS THROW error
                                //  setApiStatus(0);
                                setLoading(false);
                                  throw error;
                                
                                })
                        ;
               
            }
           
        }

        // setApiStatus(0);
        // setLoading(false);

       

    }
    const makePayment = () => {
        navigation.navigate('PROFILE', { screen : WALLETSCREENPAY});
    }
    const renderItem = (item) => {
      
        return (
           <PlaceOrderListView item={item} />
        );
    }
    
  



    const renderEmpty = () => {
        
        return (
            <View style={{flex: 1, height: '100%', justifyContent:'center', alignItems: 'center'}}>
                <Text>Your cart is empty</Text>
            </View>
        );

    }
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{backgroundColor: 'white', flex: 1, height: '100%'}}> 
            {/* <Text style={{color:'black'}}>aaaaaaa {apiStatus}</Text> */}
            <MemberHeader title="Review Order"/>
            {/* <Text style={{color:'black'}}>aaaaaaa </Text> */}
            {!isLoading ? (
                <View>
                
        </View>
            ) : (
                <View>
                    <Text style={{color:'black', textAlign:'center' }}>Wait your order is being placed... </Text>
                <ActivityIndicator vis color="black" size={20}  style={{ padding: 16}}/>
            </View>
                // <ActivityIndicator vis color="black" size={20}  style={{ padding: 16}}/>
            )}
            
        <ScrollView showsVerticalScrollIndicator={false}>
        
        
            <View style={styles.container}>
            
            <FlatList
                    data={cartObject}
                    keyExtractor={(item,index) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                />

            
            
            </View>
                    

                
       
        </ScrollView>
        
        <View style={styles.addressbar}>
                 <View style={styles.addressSection}>
                     <View style={[styles.headTitle,styles.col]}>
                         <Text style={styles.title}>Total :  {showPrice(reduxCart.total)} </Text>
                     </View>
                     <View style={styles.col}>
                         <View style={styles.getstart}>
                         {
                        (reduxCart.total > reduxUser.walletBalance)
                        ?
                         <TouchableOpacity onPress={makePayment}>
                             <Text style={styles.getstartText}>Recharge {showPrice((reduxCart.total)-(reduxUser.walletBalance))} </Text>
                         </TouchableOpacity>
                         :
                            <View>
                                {
                                (!apiStatus)
                                 ?
                         <TouchableOpacity onPress={processAddress}>
                             <Text style={styles.getstartText}>Place Order</Text>
                         </TouchableOpacity>
                         :
                         
                             <ActivityIndicator color="black" size={20}  style={{ padding: 16}}/>
                        
                         }
                         </View>
                        }
                         </View>
                         
                     </View>
                 </View>
             </View>
             </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    col: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingTop:20,
        paddingHorizontal:20,
       
    },
    cart: {
        flex: 1,

        alignItems: 'center',

        padding: 10
    },
    cartdetail: {
        width: '100%',
        height: 100,

        backgroundColor: '#D5E6E5',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,


    },
    pro: {
        width: '80%',
        height: 80,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        
        
    },
    productimage: {
        width: '20%',
        justifyContent:'center',
        alignItems:'center'
    },
    producttitle: {
        width: '65%',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    protitle: {
        color: '#2f746f',
        fontSize: 19,
        fontWeight: '600',
        padding: 1
    },
    prosubtitle: {
        color: '#2f746f',
        fontSize: 17,
        fontWeight: '600',
    },
    cartbutton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plus: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25

    },
    qty: {
        height: 20,
        width: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    quantity: {
        color: '#2f746f',
        fontWeight: 'bold'
    },


    addressbar:{
        backgroundColor:'#f5f5f5',
        marginTop:10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingBottom:0,
        width: '100%',
       
       
    },
    addressSection:{
        
        padding:10,
        flexDirection: 'row',

    },
    headTitle:{

    },
    title:{
        fontSize:17,
        fontWeight:'700',
        marginTop: 15,
        color: '#2f746f'
    },
    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:0,
        borderRadius:50,
        
    },
    getstartText:{
        color:'white',
        paddingVertical:13,
        fontSize:16,
        fontWeight:'600',
    },




})


const mapStateToProps = (state) => {
    return {
        reduxUser : state.user,
        reduxCart: state.cart
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        reduxSaveTxn : txnId => dispatch(saveTxn(txnId)),
        updateWalletBalance : amt => dispatch(updateWallet(amt))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);