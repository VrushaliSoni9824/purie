import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { MEDIA_LINK, API_LINK } from '../constants/Strings'
import { addToCartStore, showPrice } from '../utils';
import { useNavigation  } from '@react-navigation/core';
import { PRODUCTSCREEN, SUBSCRIPTIONSSCREEN } from '../constants/Screens';
import {connect} from 'react-redux';
import {showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'

import SuccessError from '../screens/SuccessError';
import { addToCart } from '../Store/user/actions';


const ProductListView = ({item, reduxUser, _loadCart, reduxCart}) => {

    const [apiStatus, setApiStatus] = useState(false);
    
    const navigation = useNavigation();    
    console.log(`ITEM PROD`, item);
    var imagesource = MEDIA_LINK + item.item.image_1;  
    
    const [isAdded, setisAdded] = useState(false);
    const [showSubscribe,setShowSubscribe] = useState(false);
    const [qty, setQty] = useState(1);

    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");

    console.log('RD CART',reduxCart);

    const goToProductDetail = () => {
      //  navigation.navigate(PRODUCTSCREEN,{id:item.item.id});
      navigation.navigate(SUBSCRIPTIONSSCREEN,{product:item})
    }


    const addToCart = (qty) => {
       // setisAdded(true);

        const formBody = {
            user_id: reduxUser.customer.userId,
            product_id: item.item.id,
            qty:qty
        };

        var key = item.item.id;


        fetch(API_LINK+'add_to_cart',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify(formBody)
             })
            .then((response) => response.json())
            .then((responseData) => {
               
                console.log('CART ADD',responseData);

                if(responseData.status == 'Success')
                {
                    const cartItem = {
                       
                        productId : item.item.id,
                        thumb : imagesource,
                        qty : qty,
                        rate: item.item.sale_price,
                        name : item.item.product_name,
                        amount : parseInt(item.item.sale_price)*parseInt(qty)
        
                    };
                   
                    // showMessage({
                    //     message: "Success",
                    //     description: responseData.message,
                    //     type: "success",
                    //   });
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(false);
                    setshowAlert1(true);
                }
                
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
 
        
        console.log(`reduxCart`, reduxCart);
        console.log('CART COND',item.item.id+ ' /' +reduxCart.cart);
        if(reduxCart.cart.hasOwnProperty(item.item.id))
        {
            console.log("Product Found");
        }     
        else
        {
            console.log('Product Not Found');

            var cartItems = {
                id: item.item.id,
                name: item.item.product_name,
                image: imagesource,
                qty: 1,
                rate: item.item.sale_price
            };

            
           var rCart = reduxCart.cart;
            console.log(typeof rCart);
              rCart.push(cartItems);
            
            var subTotal = parseInt(reduxCart.cartSubTotal) + parseInt(item.item.sale_price);
            var cartCount = parseInt(reduxCart.cartCount) + 1;
            var total = parseInt(reduxCart.total) + parseInt(item.item.sale_price);

            const cart = {
                cart:rCart,
                cartSubTotal: subTotal,
                cartCount: cartCount,
                total: total
            }

            _loadCart(cart);



        }
       
        



       // addToCartStore(item);

        /*
        console.log(`FORMBODY`, formBody);

        fetch(API_LINK+'add_to_cart',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify(formBody)
             })
            .then((response) => response.json())
            .then((responseData) => {
               
                console.log('CART ADD',responseData);

                if(responseData.status == 'Success')
                {
                    const cartItem = {
                       
                        productId : item.item.id,
                        thumb : imagesource,
                        qty : qty,
                        rate: item.item.sale_price,
                        name : item.item.product_name,
                        amount : parseInt(item.item.sale_price)*parseInt(qty)
        
                    };
                   // _addToCart(cartItem);
                    showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });
                }
                // setData(responseData.order);
               // setLoading(false);
                //setIsDataLoaded(true);
             
             // setApiStatus(false);
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });

                        */
                        
    };




    const goSubscribe = () => {
        //setShowSubscribe(true); 
            navigation.navigate(SUBSCRIPTIONSSCREEN,{product:item})
    }

    return (
        <View style={styles.prorow}>
        
            <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />

        <View style={styles.product}>

            <Image style={styles.proImg} source={{uri: imagesource}} />

        </View>
        <View>
        <Text style={styles.productName}>{item.item.product_name}</Text>
        <View>
            {
                item.item.sale_price > 0 ?
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.price}>{showPrice(item.item.sale_price)}</Text>
                    <Text> /</Text>
                    <Text style={[styles.price,{color: 'red', textDecorationLine: 'line-through', fontSize: 10}]}>{showPrice(item.item.price)}</Text>
                </View>
                :
                <Text style={styles.price}>{showPrice(item.item.sale_price)}</Text>
            }
        </View>
        
        </View>
        
        {
            (item.item.subscribe_option == 0)
            ?
            <></>
        :
        <View >
            <TouchableOpacity onPress={goSubscribe} style={styles.subscribe}>
            <Text style={styles.subscribebtn}>Subscribe</Text>
            </TouchableOpacity>
        </View>
        }
        
         <View style={styles.subscribes}>
            {
                (!isAdded)
                ?
                <TouchableOpacity  onPress={() => addToCart(1)}><Text style={styles.subscribebtns}>Buy Once</Text></TouchableOpacity>
                :
                <View style={styles.row}>
                    <View style={styles.col}><TouchableOpacity style={styles.cartBtn}><Text>-</Text></TouchableOpacity></View>
                    <View style={styles.col}><TouchableOpacity><Text>{qty}</Text></TouchableOpacity></View>
                    <View style={styles.col} ><TouchableOpacity><Text>+</Text></TouchableOpacity></View>
                    </View>
            }
            
        </View> 

           
    </View>
    )
}

//export default ProductListView

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    ltr:{
        color:'gray'
    },
    cartBtn: {
        paddingVertical: 6,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    col: {
        flex: 1,
        textAlign: 'center',
    },
    modalStyle: {
        flex: 1,

    },
    products: {
        padding: 10,
    },
    prorow: {
        backgroundColor: '#fff',
        borderRadius: 10,
        maxWidth: '96%',
        width: width/2 - 10,
       alignSelf: 'center',
       marginBottom: 15
    },
    product: {
        width: '100%',    
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',


    },
    proImg: {
        width: '100%',
        height: 150,
        marginTop: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        resizeMode: 'contain'
    },
    productName: {
        padding: 7,
        fontWeight: '400',
        fontSize: 13,
        color:'#2f746f',

    },
    QtyPrice: {
        paddingLeft: 10,

        justifyContent: 'space-between',

    },

    price: {
        fontSize: 14,
        fontWeight: '400',
        color:'#2f746f',
        paddingLeft: 10,
    },
    subscribe: {
        alignItems: 'center',
        backgroundColor: '#2f746f',
        margin: 10,
        borderRadius: 50,
    },
    subscribebtn: {
        color: 'white',
        padding: 5,
        fontSize: 15,
        fontWeight: '500',
    },
    subscribebtns:{
        color: 'white',
        padding: 5,
        fontSize: 15,
        fontWeight: '500',
    },
    subscribes:{
        alignItems: 'center',
        backgroundColor: '#2f746f',
        margin: 5,
        borderRadius: 50,
    },
    buynow: {
        alignItems: 'center',
        backgroundColor: '#18B8D5',
    }
    
})


const mapStateToProps = (state) => {
    return {
        reduxCart:state.cart,
        reduxUser:state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        _loadCart : (cart) => dispatch(addToCart(cart))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListView)