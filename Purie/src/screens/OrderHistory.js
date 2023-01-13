import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View , StyleSheet, Image, ScrollView, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MemberHeader from '../common/MemberHeader';
import OrderHistoryListView from '../common/OrderHistoryListView';
import { API_LINK } from '../constants/Strings';
import {connect} from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";

const  OrderHistory = ({ navigation, reduxUser }) => {
    // const {catName} = route.params;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
  
    //   console.log('CAt Name',catName);
  
    const getProduct = () => {
  
  //    console.log('home data api call ');
  
      fetch(API_LINK+'order_history',{
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
             
              console.log('HOMEDATA',responseData);
              setData(responseData.order);
              setLoading(false);
              //setIsDataLoaded(true);
           
           // setApiStatus(false);
           })
          .catch(function(error) {
                      console.warn('There has been a problem with your fetch operation: ' + error);
                       // ADD THIS THROW error
                       setApiStatus(false);
                        throw error;
                      
                      });
             
        }             
  
  
  
    /*
    const getProduct = async () => {
       try {
        const response = await fetch('https://purie.in/app/api/fetch_product');
        const json = await response.json();
        setData(json.pro_data);
         console.log(data.length);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  
    */
  
  
  
    useEffect(() => {
      getProduct();
    }, []);
  
  //   const Product = (data) => {
  //       console.log('ITEM',data);
  //       var prodImg = 'https://www.purie.in/upload/'+data.image_1;
  //       console.log('Product Image',prodImg);
  //       return (
  //         <View style={styles.category}>
  //                      <View style={styles.prorow}>
  //                          <View style={styles.product}>
  //       {/*  <Image source={{uri: prodImg}} style={styles.proImg} />  */}
  //         </View>
  //                          <View>
  //                             <TouchableOpacity onPress={() => navigation.navigate('Product')}>
  //                                  <Text style={styles.productName}>{data.product_name}</Text>
  //                              </TouchableOpacity>
  //                              <View style={styles.QtyPrice}>
  //                                  <Text style={styles.ltr}>{data.qty}</Text>
  //                                  <Text style={styles.price}>Rs.{data.sale_price}.0</Text>
  //                              </View>
  //                          </View>
  //                          <View style={styles.subscribe}>
  //                              <Text style={styles.subscribebtn}>Subscribe</Text>
  //                          </View>
  //                          <View style={styles.buynow}>
  //                              <Text style={styles.subscribebtn}>Buy Once</Text>
  //                      </View>
  //                     </View>
  //                  </View>
  //       );
  //   }
  
  
  const renderProduct = (item) => {
    console.log('REN FLAT',item);
    return (
    <OrderHistoryListView
     item={item}
     />
    );
  }
  


    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View> 
        <MemberHeader title="My Order"/>
            
        
         <ScrollView>
         <View style={styles.container}>
             
             <View style={styles.cart}>
             {isLoading ? 
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator/> 
                </View>
                : 
                <>
                
                <FlatList
                    data={data}
                    
                    keyExtractor={(item) => item.id}
                    renderItem={renderProduct}
                    />
                </>
            }




             </View>
             


         </View>
         </ScrollView>
         </View>
         </SafeAreaView>
    )
}


const { height } = Dimensions.get("screen");
const height_logo = height * 0.6 * 0.4;
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
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
    },
    cartbutton: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    proqty:{
        width: '10%',
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


const mapStateToProps = (state) => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        reduxSaveTxn : txnId => dispatch(saveTxn(txnId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);