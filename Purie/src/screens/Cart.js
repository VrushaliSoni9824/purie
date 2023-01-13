import React, {useState, useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, Image, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import { ScrollView } from 'react-native';
import MemberHeader from '../common/MemberHeader'
import { useSelector } from 'react-redux';
import { API_LINK } from '../constants/Strings';
import OrderListView from '../common/OrderListView';
import { showPrice } from '../utils';
import {CHECKOUTSCREEN} from '../constants/Screens';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from '../constants/Colors';
const  Cart = ({ navigation }) => {

    const [infoLoaded, setInfoLoaded] = useState(false);
    
    const reduxCart = useSelector(state => state.cart);
    const reduxUser = useSelector(state => state.user);

    console.log(`reduxCart` , reduxCart);

    const cartObject = reduxCart.cart.map((item) => ({key:item.id, id:item.id, name: item.name, image: item.image, rate: item.rate, qty: item.qty }));
    console.log(`cartObject`, cartObject)
    


        useEffect(() => {
            
                        // load customer cart
                        fetch(API_LINK+'fetch_cart',{
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
                                console.log('AUTO CART RESPONSE:',responseData);
                              if(responseData.status == 'Success')
                              {
                                
                               
                                
                               }
                             
                             })
                            .catch(function(error) {
                                        console.warn('There has been a problem with your fetch operation: ' + error);
                                         // ADD THIS THROW error
                                         setApiStatus(false);
                                          throw error;
                                        
                                        })
                                ;
        }, [])

 
    
    
    const renderItem = (item) => {
      
        return (
           <OrderListView item={item} />
        );
    }
    
    const goToCheckout = () => {
        navigation.navigate(CHECKOUTSCREEN);

        console.log('NAV',CHECKOUTSCREEN);
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
        <MemberHeader title="Cart"/>
            
        
         <ScrollView>
         <View style={styles.container}>
             <StatusBar barStyle="dark-content" />
            
             <View style={styles.cart}>

                <FlatList
                    data={cartObject}
                    keyExtractor={(item,index) => item.id}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                />

                 
                 {/* <View style={styles.cartdetail}>
                     <View style={styles.productimage}>
                         <Image style={styles.pro} source={require('../assets/Product1.png')} />
                     </View>
                     <View style={styles.producttitle}>
                         <Text style={styles.protitle}>100% Pure Cow Milk</Text>
                         <Text style={styles.prosubtitle}>1 LTR</Text>
                     </View>
                     <View style={styles.cartbutton}>
                         <View style={styles.btn}>
                             <Text style={styles.plus}>+</Text>
                         </View>
                         <View style={styles.qty}>
                             <Text style={styles.quantity}>1</Text>
                         </View>
                         <View style={styles.btn}>
                             <Text style={styles.plus}>-</Text>
                         </View>

                     </View>
                 </View> */}
                




             </View>
            


         </View>
         </ScrollView>
               {
            (reduxCart.total > 0) && 
            <>
            
         <View style={styles.addressbar}>
                 <View style={styles.addressSection}>
                     <View style={[styles.headTitle,styles.col]}>
                         <Text style={styles.title}>Total :  {showPrice(reduxCart.total)}</Text>
                     </View>
                     <View style={styles.col}>
                         <View style={styles.getstart}>
                         <TouchableOpacity onPress={goToCheckout}>
                             <Text style={styles.getstartText}>Checkout</Text>
                         </TouchableOpacity>
                         </View>
                     </View>
                 </View>
             </View>
             </>
         }
         </View>
         </SafeAreaView>
    )
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.6 * 0.4;
const styles = StyleSheet.create({
    col: {
        flex: 1
    },
    container: {
        flex: 1,
       
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

    couponCode: {
        width: '90%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        borderRadius: 20, 
        height: 40,
        paddingHorizontal: 10,
    },
    coupons: {
        width:'100%',
        height:60,
        flexDirection: 'row',
        alignItems:'center'
    },
    couponCol1: {
        flex: 2
    },
    couponCol2: {
        flex: 1
    },
    couponButton: {
        backgroundColor: COLORS.PRIMARY,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        paddingVertical: 10,
        borderRadius: 20
    },
    textWhite: {
        color: 'white'
    },
   


})


export default Cart;