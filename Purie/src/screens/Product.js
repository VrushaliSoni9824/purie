import React, {useState, useEffect} from "react";
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { API_LINK } from "../constants/Strings";


const Product = ({navigation, route}) => {
    // const {id} = route.params;
    const [isLoading, setLoading] = useState(true);
 
    const id = route.params;
    console.log('Prod Test');
    
    
    console.log('PID',id);
    const [product, setProduct] = useState(false);
    
    const getProductDetail = () => {

           console.log('product detail  api call ');
        
            fetch(API_LINK+'product_detail',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
        
                    id: id
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('PROD DATA',responseData);
                    setProduct(responseData.pro_data);
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

              useEffect(() => {
                getProductDetail();
              }, []);     

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {/* <View style={styles.header}>
                <Text>sudio</Text>
            </View> */}
            <View style={styles.product}>
                <Image style={styles.productimage} source={require('../assets/product.jpeg')} />
            </View>
            <View style={styles.detailContent}>
                
                <View style={styles.productdetailcontainer}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Pure Cow Milk</Text>
                    <View style={styles.pricetag}>
                        <Text style={styles.price}>Rs.65.0</Text>
                    </View>
                </View>
                <View style={styles.productdetail}>
                    <Text style={styles.detail}>In publishing and graphic design, Lorem 
                        ipsum is a placeholder text commonly used to 
                        demonstrate the visual form of a document or a 
                        typeface without relying on meaningful content.
                        n publishing and graphic design, Lorem 
                        ipsum is a placeholder text commonly used to 
                        demonstrate the visual form of a document or a 
                        typeface without relying on meaningful content.
                        </Text>
                </View>
                
                <View style={styles.buttons} >
                    <View style={styles.subscribe}>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Text style={styles.subscrbenow}>Subscribe</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buyonce}>
                    <Text style={styles.subscrbenow}>Buy Once</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Product

const styles = StyleSheet.create({
    product: {
        flex: 0.40,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    productimage: {
        width: '100%',
        height: 350,
        borderBottomLeftRadius: 50,
    },
    productdetailcontainer:{
        marginLeft:20, 
        marginTop:20, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    detailContent: {
        flex: 0.60,
        // marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 20,
    },
    pricetag:{
        backgroundColor:'green',
        height:40,
        width:100,
        borderTopLeftRadius:50,
        borderBottomLeftRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },
    price:{
        color:'white',
        fontSize:20,
        fontWeight:'500',
    },
    buttons:{
        marginTop:20, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    buyonce:{
        backgroundColor:'black',
        width:'50%',
        height:60,
        alignItems:'center',
        justifyContent:'center'

    },
    subscribe:{
        backgroundColor:'green',
        width:'50%',
        height:60,
        alignItems:'center',
        justifyContent:'center'
    },
    subscrbenow:{
        color:'white',
        fontSize:20,
        fontWeight:'600',
    },
    productdetail:{
        flex:6,
        padding:20,

    },
    detail:{
        fontSize:18,
        textAlign:'justify'
    }
})
