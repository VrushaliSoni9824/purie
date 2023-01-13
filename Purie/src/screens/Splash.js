import React, {useState, useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, ActivityIndicator,ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { LOGINSCREEN } from '../constants/Screens';
import { connect } from 'react-redux';
import { storeUser } from '../Store/user/actions';
import { getAsyncData, getLogoDimensions } from '../utils';
import { API_LINK, ASYNC_LOGIN_KEY, BIG_LOGO_RATIO, MEDIA_LINK } from '../constants/Strings';
import { addToCart } from '../Store/user/actions';

const Splash = ({navigation, reduxUser, storeUser, _loadCart}) => {

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [action, setaction] = useState(LOGINSCREEN);
    const [isLoggedIn, setIsLoggedIn] = useState(reduxUser.isLoggedIn);
    const [appInit, setAppInit] = useState(false);


    useEffect(() => {

        if(isLoggedIn == false)
        {
            getAsyncData(ASYNC_LOGIN_KEY).then((asUser) => {
                if(asUser !== null)
                {
                    console.log('ASYNC USER',JSON.parse(asUser));
                    var temp = JSON.parse(asUser);

                    if(temp.hasOwnProperty('name') && temp.name != '')
                    {
                        const asPUser = JSON.parse(asUser);
                        console.log('Storing DAta to REcus ' + asPUser.userId );
                        console.log('API',API_LINK+'fetch_cart');
                        

                        // load customer cart
                        fetch(API_LINK+'fetch_cart',{
                            method : 'POST',
                            headers : {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                                mode: 'cors'
                            },
                            body: JSON.stringify({
                                user_id: asPUser.userId
                                
                                 })
                             })
                            .then((response) => response.json())
                            .then((responseData) => {
                                console.log('AUTO CART RESPONSE:',responseData);
                              if(responseData.hasOwnProperty('Total'))
                              {
                               
                                let total = responseData.Total;
                                let subTotal = responseData.Total;
                                let qty = 0;
                                let cart = [];

                                for(let i = 0; i < responseData.cart.length; i++)
                                {
                                    let cartItem = {
                                        id: responseData.cart[i].id,
                                        name: responseData.cart[i].product_name,
                                        image: MEDIA_LINK + responseData.cart[i].image_1,
                                        qty: responseData.cart[i].pro_qty,
                                        rate: responseData.cart[i].sale_price
                                    };
                                    cart.push(cartItem);
                                    qty += parseInt(responseData.cart[i].pro_qty);
                                }

                                const newCart = {
                                    cart:cart,
                                    cartSubTotal: subTotal,
                                    cartCount: qty,
                                    total: total
                                }
                               
                                _loadCart(newCart);
                                
                               }
                             
                             })
                            .catch(function(error) {
                                        console.warn('There has been a problem with your fetch operation: ' + error);
                                         // ADD THIS THROW error
                                         setApiStatus(false);
                                          throw error;
                                        
                                        })
                                ;
                        
                        storeUser(asPUser);
                        setIsLoggedIn(true);

                    }
                    else{
                        setIsLoggedIn(false);
                    }
                }
            });
            setAppInit(true);
            console.log('PRU',reduxUser);
        }
        else{
            setAppInit(true);
        }

        

    },[]);


    const goToAction = () => {
        navigation.replace(action);
    }    


    return (<ScrollView style={styles.containers}>
        <View style={styles.container}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logo.png')} style={styles.logo} resizeMode={"stretch"}/>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" > 
                <Text style={styles.title}>Welcome To Purie.</Text>
                <Text style={styles.subtitle}>Get start to access the products.</Text>
                <View style={styles.getstart}>
                    {
                        (appInit)
                        ?
                        <TouchableOpacity onPress={goToAction}>
                        <Text style={styles.getstartText}>Get Start Now</Text>
                    </TouchableOpacity>
                        :
                        <TouchableOpacity >
                        <Text style={styles.getstartText}>Loading...</Text>
                    </TouchableOpacity>
                    }
                    
                </View>

                
            </Animatable.View>

        </View>
        </ScrollView>
    )
}


const LogoDimension = getLogoDimensions(BIG_LOGO_RATIO);

//console.log('DIM',height_logo+'--'+width_logo);
const styles = StyleSheet.create({
    containers:{
        flex:1,
        backgroundColor:'#fff',
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    header:{
        paddingVertical:100,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        
        backgroundColor:'#fff',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:30,
        paddingHorizontal:50,
    },
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
    title:{
        color:'#2f746f',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        
    },
    subtitle:{
        paddingVertical:10,
        textAlign:'center',
        fontSize:17,
        color:'#2f746f',
    },
    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:40,
        borderRadius:50,
        marginTop:50,
        
    },
    getstartText:{
        color:'white',
        padding:16,
        fontSize:18,
        fontWeight:'600',
    }
    
})

const mapStateToProps = state => {
    return {
        reduxUser: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser : (asyncUser) => dispatch(storeUser(asyncUser)),
        _loadCart : (cart) => dispatch(addToCart(cart))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Splash);
