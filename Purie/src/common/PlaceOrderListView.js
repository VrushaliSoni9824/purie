import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { API_LINK, MEDIA_LINK } from '../constants/Strings'
import { showPrice } from '../utils';
import { useNavigation  } from '@react-navigation/core';
import { PRODUCTSCREEN, SUBSCRIPTIONSSCREEN } from '../constants/Screens';
import { addToCart, updatecart } from '../Store/user/actions';
import { connect, useSelector, useDispatch } from 'react-redux';


const PlaceOrderListView = ({item, _loadCart}) => {

    const navigation = useNavigation();    
    const reduxCart = useSelector(state => state.cart);
    const reduxUser = useSelector(state => state.user);
   // const dispatch = useDispatch();

    console.log('CART ITEM',item);

    var imagesource = MEDIA_LINK + item.item.image_1;  
    
    const [isAdded, setisAdded] = useState(false);
    const [showSubscribe,setShowSubscribe] = useState(false);

    const [qty,setQty] = useState(item.item.qty);

    console.log(`Image`, item.image);

    const addToCart = () => {
        setisAdded(true);
    };

    var tempQty = 0;

    const increment = () => {
        tempQty  = parseInt(qty) + 1;
        
        setQty(tempQty);
        updatecart('increment');
    }

    const decrement = () => {
        tempQty  = parseInt(qty) - 1;
        setQty(tempQty);
        updatecart('decrement');
    }

    var tempCart = reduxCart.cart;
    var subTotal = 0;
    var cartCount = 0;
    var total = 0;
    var formBody = ''

    const updatecart = (type) => {
        
        //console.log('CART ACT', tempCart[item.index]);
        if(type == 'increment')
        {
             subTotal = parseInt(reduxCart.cartSubTotal) + parseInt(item.item.rate);
             cartCount = parseInt(reduxCart.cartCount) + 1;
             total = parseInt(reduxCart.cartSubTotal) + parseInt(item.item.rate);

            tempCart[item.index] = {
                id: item.item.id,
                name: item.item.name,
                image: item.item.image,
                qty: parseInt(item.item.qty)+1,
                rate: item.item.rate
            };

            formBody = {
                user_id: reduxUser.customer.userId,
                product_id: item.item.id,
                qty:parseInt(item.item.qty)+1
            };
    

        }

        else if(type == 'decrement')
        {
            
             subTotal = parseInt(reduxCart.cartSubTotal) - parseInt(item.item.rate);
             cartCount = parseInt(reduxCart.cartCount) - 1;
             total = parseInt(reduxCart.cartSubTotal) - parseInt(item.item.rate);

            
             if(parseInt(item.item.qty)-1 > 0){
                 tempCart[item.index] = {
                     id: item.item.id,
                     name: item.item.name,
                     image: item.item.image,
                     qty: parseInt(item.item.qty)-1,
                     rate: item.item.rate
                 };
             }
             else{
                tempCart.splice(item.index,1);
             }

            
            formBody = {
                user_id: reduxUser.customer.userId,
                product_id: item.item.id,
                qty:parseInt(item.item.qty)-1
            };
        }


       

        fetch(API_LINK+'add_to_cart',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify(formBody)
             })
            .then((response) => response.text())
            .then((responseData) => {
               
                console.log('CART ADD',responseData);

                if(responseData.status == 'Success')
                {
                
                   
                    showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });
                }
                
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
 


        const cart = {
            cart:tempCart,
            cartSubTotal: subTotal,
            cartCount: cartCount,
            total: total
        }
    
        console.log('TUPDATE',cart);
      
        _loadCart(cart);
    } 

    return (
        
        <View style={styles.cartdetail}>
                     <View style={styles.productimage}>
                         <Image style={styles.pro} source={{uri: item.item.image}} resizeMode="contain" />
                     </View>
                     <View style={styles.producttitle}>
                         <Text style={styles.protitle}>{item.item.name}</Text>
                        
                         <Text style={styles.prosubtitle}>{showPrice(item.item.rate)}</Text>
                     </View>
                     <View style={styles.proqty}>
                        <Text style={styles.prosubtitle}> Qty</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5}}>
                            {/* <TouchableOpacity onPress={decrement} style={styles.actBtn}>
                                <Text style={styles.actionText}>-</Text>
                            </TouchableOpacity> */}
                        <Text style={styles.prosubtitle}> {qty}</Text>
                        {/* <TouchableOpacity onPress={increment}  style={styles.actBtn}>
                                <Text  style={styles.actionText}>+</Text>
                            </TouchableOpacity> */}
                        </View>
                     </View>
                     <View style={styles.cartbutton}>
                     <Text style={styles.prosubtitle}>Total</Text>
                     <Text style={styles.prosubtitle}> {showPrice(item.item.rate * qty)}</Text>

                     </View>
                 </View>
           
   
    )
}

//export default OrderListView

const styles = StyleSheet.create({
    actionText: {
        fontSize: 20

    },
    actBtn: {
        backgroundColor: 'white',
        width: 25,
        alignItems: 'center',
        borderRadius: 7
    },
    cart: {
        flex: 1,

        alignItems: 'center',

        padding: 10,
        paddingBottom:70,
    },
    cartdetail: {
        width: '100%',
        height: 70,

        backgroundColor: '#D5E6E5',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,


    },
    pro: {
        width: '60%',
        height: 60,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        
        
    },
    productimage: {
        width: '20%',
        justifyContent:'center',
        alignItems:'center'
    },
    producttitle: {
        width: '40%',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    protitle: {
        color: '#2f746f',
        fontSize: 15,
        fontWeight: '600',
        padding: 1
    },
    prosubtitle: {
        color: '#2f746f',
        fontSize: 12,
        fontWeight: '600',
        marginHorizontal: 5
    },
    cartbutton: {
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    proqty:{
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
        backgroundColor:'#fff',
        margin:10,
        borderRadius:10

    },
    addressSection:{
        
        padding:10
    },
    headTitle:{

    },
    title:{
        fontSize:17,
        fontWeight:'700'
    }

    
})

const mapDispatchToProps = dispatch => {
    return {
        _loadCart : (cart) => dispatch(addToCart(cart))
    }
}

export default connect(null,mapDispatchToProps)(PlaceOrderListView);