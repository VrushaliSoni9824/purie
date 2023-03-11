import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import { API_LINK, MEDIA_LINK } from '../constants/Strings'
import { showPrice } from '../utils';
import { useNavigation  } from '@react-navigation/core';
import { PRODUCTSCREEN, SUBSCRIPTIONSSCREEN } from '../constants/Screens';
import Icon from 'react-native-vector-icons/Feather';
import { showMessage } from 'react-native-flash-message';
import SuccessError from '../screens/SuccessError';

const OrderHistoryListView = ({item, refreshOrder}) => {
    const [apiStatus, setApiStatus] = useState(false);
    const navigation = useNavigation();    

    var imagesource = MEDIA_LINK + item.item.image_1;  
    
    const [isAdded, setisAdded] = useState(false);
    const [showSubscribe,setShowSubscribe] = useState(false);
    const [qty,setQty] = useState(1);

    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");
    const [alertSubTitle,setalertSubTitle] = useState("");


    const addToCart = () => {
        setisAdded(true);
    };

    const pauseOrder = () => { 

      fetch(API_LINK+'play-pause',{
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            mode: 'cors'
        },
        body: JSON.stringify({
           
           cart_id: item.item.cart_id,
            delivery_status: 'Pause'
            
             })
         })
        .then((response) => response.json())
        .then((responseData) => {
           
           console.log('Play Pause',responseData); 
          if(responseData.status == 'Success')
          {
            
            refreshOrder();

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
          else
          {
            // showMessage({
            //     message: "Error",
            //     description: responseData.message,
            //     type: "default",
            //     backgroundColor: 'red'
            //   });
            //Alert.alert('Error',responseData.message);

            setalertTitle(responseData.message);
            setalertSubTitle(" ");
            setisError(true);
            setshowAlert1(true);
          }

          setApiStatus(false);
         })
        .catch(function(error) {
                    console.warn('There has been a problem with your fetch operation: ' + error);
                     // ADD THIS THROW error
                     setApiStatus(false);
                      throw error;
                    
                    })
            ;
    }

    const playOrder = () => { 

        fetch(API_LINK+'play-pause',{
          method : 'POST',
          headers : {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              mode: 'cors'
          },
          body: JSON.stringify({
             
             cart_id: item.item.cart_id,
              delivery_status: 'On Process'
              
               })
           })
          .then((response) => response.json())
          .then((responseData) => {
             
             console.log('Play Pause',responseData); 
            if(responseData.status == 'Success')
            {
              
              refreshOrder();
  
            //   showMessage({
            //       message: "Success",
            //       description: responseData.message,
            //       type: "success",
            //     });
            setalertTitle(responseData.message);
            setalertSubTitle(" ");
            setisError(false);
            setshowAlert1(true);
              
             }
            else
            {
            //   showMessage({
            //       message: "Error",
            //       description: responseData.message,
            //       type: "default",
            //       backgroundColor: 'red'
            //     });
              //Alert.alert('Error',responseData.message);
           
              setalertTitle(responseData.message);
              setalertSubTitle(" ");
              setisError(true);
              setshowAlert1(true);            }
            setApiStatus(false);
           })
          .catch(function(error) {
                      console.warn('There has been a problem with your fetch operation: ' + error);
                       // ADD THIS THROW error
                       setApiStatus(false);
                        throw error;
                      
                      })
              ;
      }
    

    return (
        
        <View style={styles.cartdetail}>
            <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
                     <View style={styles.productimage}>
                         <Image style={styles.pro} source={{uri: imagesource}} />
                     </View>
                     <View style={styles.producttitle}>
                         <Text style={styles.protitle}>{item.item.product_name}</Text>
                         <Text style={styles.prosubtitle}>{item.item.pro_qty}X{showPrice(item.item.sale_price)}</Text>
                         {/* <Text style={styles.prosubtitle}>{item.item.order_date}</Text> */}
                     </View>
                     
                     <View style={styles.cartbutton}>
                     <Text style={styles.prosubtitle}>Total</Text>
                     <Text style={styles.prosubtitle}> {showPrice(item.item.sale_price * item.item.pro_qty)}</Text>
                     <Text style={styles.prosubtitles}> {item.item.delivery_status}</Text>
                     </View>
                     <View style={styles.proqty}>
                        {/* <Text style={styles.prosubtitle}> Qty</Text>
                        <Text style={styles.prosubtitle}> {item.item.pro_qty}X{showPrice(item.item.sale_price)}</Text> */}
                        {
                            (item.item.delivery_status  == 'On Process')
                           && 
                           <TouchableOpacity onPress={pauseOrder}>
                           <Icon name="pause-circle" color="green" size={35} />
                           </TouchableOpacity>
                        }

{
                            (item.item.delivery_status  == 'Pause')
                           && 
                           <TouchableOpacity onPress={playOrder}>
                           <Icon name="play-circle" color="green" size={35} />
                           </TouchableOpacity>
                        }
                        
                     </View>
                 </View>
           
   
    )
}

export default OrderHistoryListView

const styles = StyleSheet.create({
    actionIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    cart: {
        flex: 1,

        alignItems: 'center',

        padding: 10,
        paddingBottom:70,
    },
    cartdetail: {
        width: '90%',
        alignSelf: 'center',
        height: 70,

        backgroundColor: '#D5E6E5',
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,


    },
    pro: {
        width: '60%',
        height: 60,
       borderRadius: 10
        
        
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
    },
    prosubtitles:{
        color: '#2f746f',
        fontSize: 12,
        fontWeight: 'bold',
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
