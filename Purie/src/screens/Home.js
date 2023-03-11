import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator, Modal, Pressable,useWindowDimensions } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { COLORS } from "../constants/Colors";
import { API_LINK } from "../constants/Strings";
import { isTemplateElement } from "@babel/types";
import ProductListView from "../common/ProductListView";
import CategoryListView from "../common/CategoryListView";
import LoadingView from "../common/LoadingView";
import MemberHeader from "../common/MemberHeader";
import { loadPlans } from "../Store/subscribe/actions";
import { updateWallet } from '../Store/user/actions';
import { SafeAreaView } from "react-native-safe-area-context";
import OTPInputView from '@twotalltotems/react-native-otp-input'

import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';


const images = [
    'https://www.purie.in/images/slide-1.png',
    'https://www.purie.in/images/slide-2.png'
    

]
const Home = ({ navigation, reduxUser, reduxLoadPlans, updateWalletBalance }) => {

    const { width } = useWindowDimensions();
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setisLoadingImage] = useState(false);
    const [data, setData] = useState("");

    const [modalVisible, setModalVisible] = useState(false);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [mostSellingProducts, setmostSellingProducts] = useState(false);
    const [categories, setCategories] = useState(false);
    const [wallet, setWallet] = useState(false);

   // const [isHomePageReady, setisHomePageReady] = useState(false);

   var source = {
    html: `
  <p style='text-align:center;'>
    <b>Hello</b> World!
  </p>`
  };
 

   const getadvertisement = async () => {
//     try {
//      const response = await fetch('https://purie.in/app/api/fetch_advertisement.php');
//      const json = await response.json();
//      console.log("*****************************************************");
//      console.log(JSON.stringify(response));
//      console.log("*****************************************************");
//      setData(json.data);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }

fetch('https://purie.in/app/api/fetch_advertisement.php',{
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("*****************************************************");
             console.log(responseJson[0].image_url);
             console.log( responseJson[0].image_url+ '?' + new Date())
             console.log("*****************************************************");
            //  setData(responseJson[0].image_url);
            setData(responseJson[0].image_url+ '?' + new Date());
             setModalVisible(true);
             setLoading(false);
      })
      .catch((error) => {
        //Error 
        console.error(error);
        setLoading(false);
      });


 }

 useEffect(() => {
//    getadvertisement(); 
 },[]);


    const loadHomeData = () => {
        
       
        console.log('home data api call ');

        fetch(API_LINK+'fetch_home_product',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify({
              
                
                 })
             })
            .then((response) => response.json())
            .then((responseData) => {
               
                console.log('HOMEDATA',responseData);
                setmostSellingProducts(responseData.pro_data);
                //setIsDataLoaded(true);
             
             // setApiStatus(false);
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
               
                        


                        fetch(API_LINK+'subscribe_plan',{
                            method : 'POST',
                            headers : {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                                mode: 'cors'
                            },
                            body: JSON.stringify({
                              
                                
                                 })
                             })
                            .then((response) => response.json())
                            .then((responseData) => {
                               
                                console.log('Plan DATA',responseData);

                                reduxLoadPlans(responseData.subscribe_plan)

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
                


                                        fetch(API_LINK+'fetch_category',{
                                            method : 'POST',
                                            headers : {
                                                'Accept': 'application/json',
                                                'Content-type': 'application/json',
                                                mode: 'cors'
                                            },
                                            body: JSON.stringify({
                                              
                                                
                                                 })
                                             })
                                            .then((response) => response.json())
                                            .then((responseData) => {
                                               
                                                console.log('HOME CAT DATA',responseData);
                                                setCategories(responseData);
                                               // set(true);
                                              
                                             // setApiStatus(false);
                                             })
                                            .catch(function(error) {
                                                        console.warn('There has been a problem with your fetch operation: ' + error);
                                                         // ADD THIS THROW error
                                                         setApiStatus(false);
                                                          throw error;
                                                        
                                                        });


                if(!mostSellingProducts && !categories && !wallet)
                {
                    setIsDataLoaded(true);
                }
                                         
    }


    if(!isDataLoaded)
    {
    loadHomeData();
    }

    console.log('RD',reduxUser);

    const renderProduct = (item) => {
        console.log('REN FLAT',item);
        return (
        <ProductListView
         item={item}
         />
        );
    }

    // const source = {
    //     html: `
    //   <p style='text-align:center;'>
    //     Hello World!
    //   </p>`
    //   };
      
    const renderCategory = (item) => {
        console.log('CAT VIEw');
        return (
            <CategoryListView item={item} />
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, }}>
{/* =========open Modal */}

{/* <View style={modalstyle.centeredView}> */}
    <View style={{flex:1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}
      >
        
        <View style={modalstyle.centeredView}>
          <View style={modalstyle.modalView}>
          <Pressable
              style={{flex:1,width:'100%'}}
              onPress={() => {
                console.log("aaaaaaaaaaa")
                setModalVisible(!modalVisible)}}
            >
        
            <View style={{flex:1,width:'100%'}}>
                <View style={{flex:0.02,alignItems:'flex-end'}}>
                <Pressable
              style={[modalstyle.button, modalstyle.buttonClose]}
              onPress={() => {
                console.log("aaaaaaaaaaa")
                setModalVisible(!modalVisible)}}
            >
            <Image source={require('../assets/cancel.png')}
                    style={{width: 20, height: 20,borderRadius:20}} />
              {/* <Text style={modalstyle.textStyle}> aaaa </Text> */}
            </Pressable>
                </View>

                {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View> */}
                {(isLoading) ? 
                    <View style={{flex:0.98,backgroundColor:'#000',borderRadius:20, alignItems:'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View>
                :
                <View style={{flex:0.98,backgroundColor:'#000',borderRadius:20}}>
                    <Image 
                    onLoadStart={()=>{
                        setisLoadingImage(true);
                    }}

                    onLoadEnd={() => {
                        setisLoadingImage(false);
                    }}
                    source={{uri:data, cache: "reload"}} style={{width: '100%', height: '100%',borderRadius:20}} />
                {isLoadingImage && <LoadingView/>}
                </View>
                }
               
            </View>
            </Pressable>

          </View>
        </View>
      </Modal>
      </View>
      {/* <Pressable
        style={[modalstyle.button, modalstyle.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={modalstyle.textStyle}>Show Modal</Text>
      </Pressable> */}
    {/* </View> */}


{/* ========= close modal */}
        <View>
            <MemberHeader title="Purie"/> 

            {/* <View style={{backgroundColor:'#000'}}>
            <RenderHtml
      contentWidth={width}
      source={source}
    />
            </View> */}
            
            <ScrollView showsVerticalScrollIndicator={false}>

            
                <SliderBox images={images}
                    dotColor="black"
                    autoplay
                    circleLoop
                    dotStyle={{ width: 7, height: 7, borderRadius: 3, borderColor: "white", borderWidth: 3 }}
                    imageLoadingColor="grey"
                />

            {
                (!isDataLoaded)
                ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View>
                :
                <>
        
                <View style={styles.categorycontainer}>
                    <Text style={styles.catTitle}>Most Popular Category</Text>
                    <View style={styles.categoryrow}>
                    {
                        (!categories)
                        ?
                        <View style={{flexDirection: 'row', flex:1, justifyContent: 'center'}}>
                            <ActivityIndicator size={20} color="black" />
                        </View>
                        :
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={renderCategory}
                            numColumns={4}
                        />
                    }
                        
                        {/* <View style={styles.category}>
                        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
                            <View>
                            <Image style={styles.catImg} source={require('../assets/Dairy.png')} />
                            </View>
                            </TouchableOpacity>
                            <Text style={styles.catName}>Dairy</Text>
                        </View>
                        <View style={styles.category}>
                            <Image style={styles.catImg} source={require('../assets/Fruits.png')} />
                            <Text style={styles.catName}>Fruits</Text>
                        </View>
                        <View style={styles.category}>
                            <Image style={styles.catImg} source={require('../assets/Grocery.png')} />
                            <Text style={styles.catName}>Grocery</Text>
                        </View>
                        <View style={styles.category}>
                            <Image style={styles.catImg} source={require('../assets/Vegetables.png')} />
                            <Text style={styles.catName}>Vegetables</Text>
                        </View> */}

                    </View>
                </View>
                <View style={styles.products}>
                    <Text style={styles.catTitle}>Most Selling Products.</Text>
                </View>
                <View style={{ marginLeft: 10, }}>
                    {
                        (!mostSellingProducts)
                        ?
                        <View>
                        <ActivityIndicator size={20} color="black" />
                    </View>
                        :
                    <FlatList
                        data={mostSellingProducts}
                        keyExtractor={item => item.id}
                        renderItem={renderProduct}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    /> 
                    }    
                    
                </View>

                </>
            }


                 
                <View style={styles.banner}>
                    
                        <View>
                            <Image style={styles.bannerImage} source={require('../assets/images.jpeg')} />

                        </View>
                    
                </View>
                <View style={styles.banner}>
                    
                    <View>
                        <Image style={styles.bannerImage} source={require('../assets/1.png')} />

                    </View>
                
            </View>
                <View style={styles.footer}></View>

            </ScrollView>
        </View>
        </SafeAreaView>
    )
}


const modalstyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        height: '90%',
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#000",
      },
      buttonClose: {
        backgroundColor: "#fff",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

const styles = StyleSheet.create({
    footer: {
        height: 60
    },
    slider: {
        width: '100%',
        height: 200,
    },
    categorycontainer: {
        width: '100%',
        borderRadius: 20,

        padding: 10,
    },
    catTitle: {

        fontSize: 15,
        fontWeight: '400',
        color: '#087E8B'
    },
    categoryrow: {

       
        flexDirection: 'row',
        paddingTop: 0,

    },
    category: {
        width: '24%',
        margin: 2,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5

    },
    catImg: {
        width: 65,
        height: 65,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth: 1.5

    },
    catName: {
        marginTop: 5,
        color: 'black',
        fontWeight: '300'
    },
    ltr: {
        fontSize: 14,

    },

    products: {
        padding: 10,
    },
    prorow: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 170,
        marginRight: 10,
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
        borderTopRightRadius: 10
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
    banner: {
        margin: 10,
        marginTop: 20,
    },
    bannerImage: {
        width: '100%',
        borderRadius: 7,
        height:200
    }




})


const mapStateToProps = state => {
    return {
        reduxUser : state.user,
        reduxPlans: state.subscriptionPlans
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxLoadPlans : plans => dispatch(loadPlans(plans)),
        updateWalletBalance : amt => dispatch(updateWallet(amt))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);

