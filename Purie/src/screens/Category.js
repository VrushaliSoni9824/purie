import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View , StyleSheet, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MemberHeader from '../common/MemberHeader';
import ProductListView from '../common/ProductListView';
import { API_LINK } from '../constants/Strings';
import { SafeAreaView } from "react-native-safe-area-context";

const Category = ({ navigation, route }) => {

  const {catName} = route.params;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

    console.log('CAt Name',catName);

  const getProduct = () => {

//    console.log('home data api call ');

    console.log(

     '  catName: '+ catName
        
         );

    fetch(API_LINK+'fetch_product',{
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            mode: 'cors'
        },
        body: JSON.stringify({

          catName: catName
            
             })
         })
        .then((response) => response.json())
        .then((responseData) => {
           
            console.log('HOMEDATA',responseData);
            setData(responseData.pro_data);
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
    <View style={{flex: 1/2}}>
  <ProductListView
   item={item}
   />
   </View>
  );
}

const ListEmptyComponent = () => {
  return (
    <View style={{flex:1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <Text> No Records Founds</Text>
    </View>
  );
}


  
  return (
      <>
      <SafeAreaView style={{ flex: 1}}>
       <MemberHeader title={catName} />
    <View style={styles.categoryrow}>
       
      {isLoading ? 
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator/> 
        </View>
        : 
        <>
        
        <FlatList
              data={data}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={renderProduct}
              ListEmptyComponent={ListEmptyComponent}
              />
        </>
      }
    </View>
    </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({

    categoryrow: {
        flexDirection: 'row',
        
        padding:10,
    },
    category: {
       flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        margin: 5,

    },
    products: {
        padding: 10,
    },
    prorow: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',

    },
    product: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'


    },
    proImg: {
        width: '70%',
        height: 130,
        marginTop: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    productName: {
        padding: 7,
        fontWeight: '400',
        fontSize: 13

    },
    QtyPrice: {
        paddingLeft: 10,

        justifyContent: 'space-between',

    },

    price: {
        fontSize: 14,
        fontWeight: '400',
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
    buynow: {
        alignItems: 'center',
        backgroundColor: '#98AFC7',
    },
})


export default Category;