import React, {useState, useEffect} from "react";
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Modal, TextInput, ScrollView, KeyboardAvoidingView, Alert, Keyboard  } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
//import { } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { API_LINK, MEDIA_LINK, SITE_LINK } from "../constants/Strings";
import { connect } from "react-redux";
import MemberHeader from "../common/MemberHeader";
import { showAddress, showPrice } from "../utils";
import PlanItem from "../common/PlanItem";
import DatePicker from 'react-native-date-picker'
import { showMessage } from "react-native-flash-message";
import { REVIEWORDERSCREEN } from "../constants/Screens";
import { saveQuote, updateAddress } from "../Store/user/actions";
import { COLORS } from '../constants/Colors';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import SuccessError from '../screens/SuccessError';


const Subscribe = ({navigation, route, reduxUser, reduxPlans, reduxSaveQuote, reduxUpdateAdress}) => {
    
    
const [showAlert1, setshowAlert1] = useState(false);
const [isError, setisError] = useState(false);
const [alertTitle,setalertTitle] = useState("");    
const [alertSubTitle,setalertSubTitle] = useState("");

    const product = route.params;
   // const plans = reduxPlans.plans;

    const frequencyOptions = ["Daily","Alternate"];
    const timeOptions = ["Morning"];

    console.log('PARAMS',route.params);

   const [apiStatus, setApiStatus] = useState(false);

   const [qty, setQty] = useState(1);
   const [open, setOpen] = useState(false)

    var currentDate = new Date();
    var today = currentDate;
    currentDate.setDate(currentDate.getDate() + 1);

    const cost = product.product.item.sale_price;
    const [plans, setplans] = useState(false);
    const [planName, setPlanName] = useState('');
    const [selected, setselected] = useState(3);
    const [price, setprice] = useState(0);
    const [duration, setduration] = useState(0);
    const [offer, setOffer] = useState(0);
    const [discountAmount,setdiscountAmount] = useState(0);
    const [basePlanPrice, setbasePlanPrice] = useState(0);
    const [baseSaving, setbaseSaving] = useState(0);
    const [freq, setFreq] = useState('Daily');
    const [ts, setts] = useState('Morning');
    const [startDate, setStartDate] = useState(currentDate);
    const [showModalDate, setShowModalDate] = useState(false);

    const [couponDiscountPerUnit, setCouponDiscountPerUnit] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0);

   
    console.log('PRODUCT ss',product.product.item.image_1);
    console.log('PLANS',reduxPlans.plans);
    console.log('CoUNT',reduxPlans.plans.length);

    const imageSource = MEDIA_LINK + product.product.item.image_1;
    console.log('iage',imageSource);


    const [frmFlat, setFrmFlat] = useState('');
    const [flatError, setFlatError] = useState(false);

    const [frmBlock, setFrmBlock] = useState('');
    const [blockError, setBlockError] = useState(false);

    const [frmSociety, setFrmSociety] = useState('');
    const [societyError, setSocietyError] = useState(false);

    const [frmZip, setFrmZip] = useState('');
    const [zipError, setZipError] = useState(false);

    const [frmCity, setFrmCity] = useState('');
    const [cityError, setCityError] = useState(false);

    const [frmState, setFrmState] = useState('');
    const [stateError, setStateError] = useState(false);

    const [frmCountry, setFrmCountry] = useState('India');
    const [countryError, setCountryError] = useState(false);

    const [frmLandmark, setFrmLandmark] = useState('');
    const [landmarkError, setLandmarkError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    
    const getAddress = () => {
  
        //    console.log('home data api call ');
        
            fetch(API_LINK+'user_address',{
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
                      console.log(`address api responseData`, responseData.user_address[0]);
                     if (responseData.status == 'true') {
                        
                         setFrmFlat(responseData.user_address[0].flat);
                         setFrmBlock(responseData.user_address[0].block);
                         setFrmSociety(responseData.user_address[0].society);
                         setFrmZip(responseData.user_address[0].zip);
                         setFrmCity(responseData.user_address[0].city);
                         setFrmState(responseData.user_address[0].state);
                         setFrmCountry(responseData.user_address[0].country);
                         setFrmLandmark(responseData.user_address[0].landmark);
                        // Address_updated_data(true);
                       //  setData(true);
                        // navigation.navigate(PLACEORDERSCREEN);

                        const address = {
                            shippingId: responseData.user_address[0].id,
                            flat: responseData.user_address[0].flat,
                            block: responseData.user_address[0].block,
                            society: responseData.user_address[0].society,
                            city: responseData.user_address[0].city,
                            state: responseData.user_address[0].state,
                            country: responseData.user_address[0].country,
                            zip: responseData.user_address[0].zip,
                            landmark: responseData.user_address[0].landmark
                        };

                        reduxUpdateAdress(address);
                     }
                     else
                     {
      
                     }
               
                  });
                          
          };
        
        
          useEffect(() => {
            getAddress();
          }, []);
        
    
    const subscribeBtn = () => {
        if(reduxUser.shippingAddress.shippingId == '')
        {
            Alert.alert('Error','Please enter shipping address before proceeding');
        }
    else
        { 
            setApiStatus(true);

            let salePrice = product.product.item.sale_price - couponDiscountPerUnit - (discountAmount / duration);

            console.log('ORDERSSSSS',{
                
                user_id: reduxUser.customer.userId,
                plan_id: selected,
                product_id: product.product.item.id,
                quantity: qty,
                price: basePlanPrice,
                total: price,
                couponDiscount: couponDiscount,
                isCouponApplied: isCouponApplied,
                couponCode: couponCode,
                planDiscount: discountAmount,
                duration: duration,
                start_subscribe: startDate,
                delivery_time: ts,
                frequency: freq,
                salePrice: salePrice

                
                 });

            fetch(API_LINK+'add_subscribe',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify({
                
                user_id: reduxUser.customer.userId,
                plan_id: selected,
                product_id: product.product.item.id,
                quantity: qty,
                price: basePlanPrice,
                total: price,
                couponDiscount: couponDiscount,
                isCouponApplied: isCouponApplied,
                couponCode: couponCode,
                planDiscount: discountAmount,
                duration: duration,
                start_subscribe: startDate,
                delivery_time: ts,
                frequency: freq,
                salePrice: salePrice

                
                 })
             })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('RESponse',responseData);
              if(responseData.status == 'Success')
              {
                
                // const subscribeData = {
                //     productName: product.product.item.product_name,
                //     planName: planName,
                //     productImage: imageSource,
                //     price: price,
                //     qty: qty,
                //     duration: duration,
                //     frequency: freq,
                //     timeSlot: ts,
                //     startDate: startDate,
                //     orderId: responseData.user.orderId

                // };

                reduxSaveQuote(responseData.user.order_id);

                navigation.navigate(REVIEWORDERSCREEN,{
                    productName: product.product.item.product_name,
                    planName: planName,
                    productImage: imageSource,
                    price: price,
                    discount: discountAmount,
                    couponDiscount: couponDiscount,
                    qty: qty,
                    duration: duration,
                    frequency: freq,
                    timeSlot: ts,
                    startDate: startDate,
                    orderId: responseData.user.order_id

                });
                
               }
              else
              {
                // showMessage({
                //     message: "Error",
                //     description: responseData.message,
                //     type: "default",
                //     backgroundColor: 'red'
                //   });
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
}


    useEffect(()=>{

        var offerAmount = parseInt(cost) * parseInt(duration) * parseInt(offer) / 100;
        console.log(parseInt(cost)+' ___ '+ parseInt(duration) + '_______' + parseInt(offer));
        console.log('OF',offerAmount); 
        var newcost = (parseInt(cost) * duration) -  parseInt(offerAmount);
        setbasePlanPrice(newcost);                      
        setbaseSaving(offerAmount);
        console.log('OP',newcost);
        setQty(1);
        setprice(newcost);
        setdiscountAmount(offerAmount);

    },[selected]);


    const loadHomeData = () => {

        console.log('home data api call ');

        
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

                                setplans(responseData.subscribe_plan)

                              
                             })
                            .catch(function(error) {
                                        console.warn('There has been a problem with your fetch operation: ' + error);
                                         // ADD THIS THROW error
                                          throw error;
                                        
                                        });



          
                                         
    }


  useEffect(() => {
    loadHomeData();
  },[]);
    
    
  const increment = () => {
    var tempQty = parseInt(qty) + 1;
    setQty(tempQty);  
    updateTotal('increment');
  }

  const decrement = () => {
      if(qty > 1)
      {
      var tempQty = parseInt(qty) - 1;
      console.log('QTY',tempQty);
    setQty(tempQty);   
     updateTotal('decrement');
     }
  }

  const updateTotal = (action) => {

        console.log('Action called');
        if(action == 'increment')
        {
        console.log(typeof parseInt(basePlanPrice));
            
            var tempPrice = parseInt(price) + parseInt(basePlanPrice);
            console.log('BP',basePlanPrice);
            console.log('tP',tempPrice);
            setprice(tempPrice);

             var tempOffer = parseInt(discountAmount) + parseInt(baseSaving);
             setdiscountAmount(tempOffer);   
        }

        else if(action == 'decrement')
        {
            
            
            var tempPrice = parseInt(price) - parseInt(basePlanPrice);
            console.log('BP',basePlanPrice);
            console.log('tPD',tempPrice);
            setprice(tempPrice);
            var tempOffer = parseInt(discountAmount) - parseInt(baseSaving);
             setdiscountAmount(tempOffer);   
        }

    
  }

    const setFreqAlt = () => {
        setFreq('Alternate');
    }

    const setFreqDaily = () => {
        setFreq('Daily');
    }

    const setTSOne = () => {
        setts('Morning');
    }

    const setTsTwo = () => {
        setts('Evening');
    }
    
    const renderItem = (item) => {
      //  console.log('RENERING',item);
        return (
           <PlanItem item={item} select={selected} cost={cost} price={price} selectPlan={setselected} duration={setduration} offer={setOffer} setPlanName={setPlanName} />
        );
    }

    const shippingAddressAction = () => {

        if(reduxUser.shippingAddress.shippingId != '')
        {
            const ACTION = SITE_LINK + 'add_address';
        }
        else
        {
            const ACTION = SITE_LINK + 'update_address';
        }

        
        var valid = true;
        
        setApiStatus(true);

        if(frmFlat.trim() == '')
        {
            setFlatError('Please enter your flat no/house no');
            valid = false;
        }
        
        else{
            setFlatError(false);
        }

        if(frmBlock.trim() == '')
        {
            setBlockError('Please enter your tower/block');
            valid = false;
        }
        
        else{
            setBlockError(false);
        }
        if(frmSociety.trim() == '')
        {
            setSocietyError('Please enter your society/area name');
            valid = false;
        }
        
        else{
            setSocietyError(false);
        }
        if(frmZip.trim() == '')
        {
            setZipError('Please enter your zip code');
            valid = false;
        }
        
        else{
            setZipError(false);
        }

        if(frmCity.trim() == '')
        {
            setCityError('Please enter your city name');
            valid = false;
        }
        
        else{
            setCityError(false);
        }
        if(frmState.trim() == '')
        {
            setStateError('Please enter your state name');
            valid = false;
        }
        
        else{
            setStateError(false);
        }
        if(frmLandmark.trim() == '')
        {
            setLandmarkError('Please enter your landmark');
            valid = false;
        }
        
        else{
            setLandmarkError(false);
        }
        

        
        if(valid)
        {

            Keyboard.dismiss();
            fetch(API_LINK+'address',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    user_id: reduxUser.customer.userId,
                    flat : frmFlat,
                    block : frmBlock,
                    society : frmSociety,
                    zip : frmZip,
                    city : frmCity,
                    state : frmState,
                    landmark : frmLandmark,
                    country : frmCountry

                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('adress RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    // setOldpassword('');
                    // setPassword('');

                //  showMessage({
                //         message: "Success",
                //         description: responseData.message,
                //         type: "success",
                //       }); 
                setalertTitle(responseData.message);
                setalertSubTitle(" ");
                setisError(false);
                setshowAlert1(true);
                      setShowModal(false);
                      getAddress();
                     
                      //toggleModal();
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

        setApiStatus(false);

        
        
    }

      const [openDate, setOpenDate] = useState(false);


    const toggleDatePicker = () => { 
        setOpenDate(!openDate);
     }

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const dropdownIcon = () => { 
        return <Icon name="chevron-down" color="black" size={20} />;
     }

     const [couponCode, setCouponCode] = useState('');
     const [couponMessage, setCouponMessage] = useState('');
     const [isCouponApplied, setIsCouponApplied] = useState(false);

     const applyCoupon = () => { 
         if(couponCode != '') {

            Keyboard.dismiss();
            fetch(API_LINK+'coupon',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    coupon_code: couponCode
                    

                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('coupon RESPONSE:',responseData);
                  
                    if(!responseData.hasOwnProperty('message'))
                    { 

                    // showMessage({
                    //     message: "Success",
                    //     description: "Coupon code applied",
                    //     type: "success",
                    //   }); 
                    setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(false);
                    setshowAlert1(true);
    
                      setCouponDiscountPerUnit(responseData.coupon[0].coupon_price);
                      setCouponDiscount(parseInt(responseData.coupon[0].coupon_price) * duration);
                      setIsCouponApplied(true);
                    }
                    else
                    {
                        // showMessage({
                        //     message: "Error",
                        //     description: responseData.message,
                        //     type: "default",
                        //     backgroundColor: 'red'
                        //   }); 
                        setalertTitle(responseData.message);
                    setalertSubTitle(" ");
                    setisError(true);
                    setshowAlert1(true);
                    } 
                   
                

                  //setApiStatus(false);
                 })
                .catch(function(error) {
                            console.warn('There has been a problem with your fetch operation: ' + error);
                             // ADD THIS THROW error
                             setApiStatus(false);
                              throw error;
                            
                            })
                    ;
           


         }
         else
         {
            // showMessage({
            //     message: "Error",
            //     description: "Please enter coupon code",
            //     type: "default",
            //     backgroundColor: 'red'
            //   }); 
            setalertTitle(responseData.message);
            setalertSubTitle(" ");
            setisError(true);
            setshowAlert1(true);
         }
      }


      useEffect(() => {
        setCouponDiscount(parseInt(couponDiscountPerUnit) * duration);
       // setprice(price - parseInt(couponDiscountPerUnit) * duration);
      },[duration]);


      const showMonth = (n) => { 
          if(n < 9)
          {
            return '0' + (n+1);
              }
           else
           {
               return n+1;
           }   
       }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
            <MemberHeader title={product.product.item.product_name}/>
            {/* <View style={styles.header}>
                <Text>sudio</Text>
            </View> */}
            <ScrollView>
            <Image source={{uri: imageSource}} style={styles.productimage} resizeMode="contain"  />


            
            <View style={styles.detailContent}>
                
                <View style={styles.productdetailcontainer}>
                    <Text style={{fontSize:20, color:'#2f746f', fontWeight:'bold'}}>Subscription Plans</Text>
                    <View style={styles.pricetag}>
                        <Text style={styles.price}>{showPrice(price - couponDiscount)}</Text>
                        <Text style={styles.discount}>You Save {showPrice(discountAmount)}
                        {
                            isCouponApplied && <Text> + {showPrice(couponDiscount)}</Text>
                        }
                        </Text>
                    </View>
                </View>

                <View>
                    <FlatList  data={plans} keyExtractor={item => item.id} renderItem={renderItem}/>
                </View>


                <View style={[styles.row,styles.sectionTwo]}>
                    <View style={styles.col}>
                        <Text style={styles.black}>Choose Frequency</Text>
                    </View>
                    <View style={styles.colTwo}>
                    <SelectDropdown
                            data={frequencyOptions}
                            defaultValueByIndex={0}
                            buttonStyle={{backgroundColor: 'white', textAlign: 'right', justifyContent:'flex-start', fontSize: 14}}
                            buttonTextStyle={{ fontSize: 14, justifyContent: 'flex-end'}}
                            dropdownIconPosition="right"
                            dropDownIcon={dropdownIcon}

                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setFreq(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                </View>


                <View style={[styles.row,styles.sectionTwo]}>
                    <View style={styles.col}>
                        <Text style={styles.black}>Choose Time</Text>
                    </View>
                    <View style={styles.colTwo}>
                    <SelectDropdown
                            data={timeOptions}
                            defaultValueByIndex={0}
                            buttonStyle={{backgroundColor: 'white', textAlign: 'right', justifyContent:'flex-start', fontSize: 14}}
                            buttonTextStyle={{ fontSize: 14, justifyContent: 'flex-end'}}
                            dropdownIconPosition="right"
                            dropDownIcon={dropdownIcon}

                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setts(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item
                            }}
                        />
                    </View>
                </View>


                {/* <View style={[styles.row, styles.section]}>
                    <View style={[styles.col3,styles.qtyStyle]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Choose Frequency </Text>
                    </View>  
                </View>
                <View style={[styles.row, styles.section]}>
                    <View style={styles.col}
                    >
                        {
                            (freq == 'Daily')
                            ?
                            <TouchableOpacity onPress={setFreqDaily} style={styles.freqActive}><Text style={styles.activeText}>Daily</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={setFreqDaily} style={styles.freqNormal}><Text>Daily</Text></TouchableOpacity>
                        }
                    
                    </View>
                    <View style={styles.col}>
                    {
                            (freq == 'Alternate')
                            ?
                            <TouchableOpacity onPress={setFreqAlt} style={styles.freqActive}><Text style={styles.activeText}>Alternate</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={setFreqAlt} style={styles.freqNormal}><Text>Alternate</Text></TouchableOpacity>
                        }
                        
                    </View>
                    <View style={styles.col}>
                        
                    </View>
                </View> */}
               


               <View style={[styles.row,styles.sectionTwo]}>
                    <View style={styles.col}>
                        <Text style={styles.black}>Choose Quantity</Text>
                    </View>
                    <View style={styles.col}>
                    <View style={styles.row}>
                    <View style={styles.col}>
                        <TouchableOpacity style={styles.btn} onPress={decrement}><Text style={styles.btn_add}>-</Text></TouchableOpacity>
                    </View>
                    <View style={styles.col}>
                       <Text style={[styles.qtyStyle, styles.aj]}>{qty}</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity style={styles.btn} onPress={increment}><Text style={styles.btn_add}>+</Text></TouchableOpacity>
                    </View>
                    </View>

                    </View>
                </View>


                <View style={[styles.row,styles.sectionTwo]}>
                    <View style={styles.col}>
                        <Text style={styles.black}>Choose Start Date</Text>
                    </View>
                    <View style={[styles.col,{ paddingVertical: 13 }]}>
                    <TouchableOpacity onPress={() => setShowModalDate(true)}>
                        <Text>Choose Start Date</Text>
                        <Text style={{color: 'black'}}>{startDate.getFullYear()+'-'+ showMonth(startDate.getMonth())+'-'+ startDate.getDate() }</Text>
                    </TouchableOpacity>
                    {/* <DatePicker modal open={openDate} date={startDate} onDateChange={setStartDate} minimumDate={today} mode="date"/> */}
                    </View>
                </View>


                <View style={[styles.row,styles.sectionTwo]}>
                    <View style={styles.col}>
                        <Text style={styles.black}>Address</Text>
                    </View>
                    <View style={[styles.colThree,{paddingVertical: 10, alignItems:'flex-end', paddingRight: 10, }]}>
                        
                            <TouchableOpacity style={{flexDirection:'row'}} onPress={toggleModal}>
                                <FAIcon name="send" color="green" size={20} />
                                <Text style={{ color: 'green', fontWeight:'bold', marginLeft: 15}}>Change Address</Text>
                            </TouchableOpacity>


                            {
                           (reduxUser.shippingAddress.shippingId != '') ?
                           <>
                           <Text>{showAddress(reduxUser.shippingAddress)}</Text>  
                           </>
                           :
                           <>
                           <Text>Please specify your shipping address</Text>
                           </>
                       }
                    </View>
                </View>


                
                {/* <View style={[styles.row, styles.section]}>
                <View style={[styles.col3,styles.qtyStyle]}>
                <Text style={{fontSize:20, fontWeight:'bold'}}>Choose Quantity </Text>
                    </View>  
                    <View style={styles.col}>
                        <TouchableOpacity style={styles.btn} onPress={decrement}><Text style={styles.btn_add}>-</Text></TouchableOpacity>
                    </View>
                    <View style={styles.col}>
                       <Text style={[styles.qtyStyle, styles.aj]}>{qty}</Text>
                    </View>
                    <View style={styles.col}>
                        <TouchableOpacity style={styles.btn} onPress={increment}><Text style={styles.btn_add}>+</Text></TouchableOpacity>
                    </View>
                </View> */}
                
                
               

                {/* <View style={[styles.row, styles.section]}>
                    <View style={[styles.col3]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Choose Time Slot </Text>
                    </View>  
                </View>
                <View style={[styles.row, styles.section]}>
                    <View style={styles.col}
                    >
                        {
                            (ts == 'Morning')
                            ?
                            <TouchableOpacity onPress={setTSOne} style={styles.freqActive}><Text style={styles.activeText}>Morning</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={setTSOne} style={styles.freqNormal}><Text>Morning</Text></TouchableOpacity>
                        }
                    
                    </View>
                    <View style={styles.col}>
                    {
                            (ts == 'Evening')
                            ?
                            <TouchableOpacity onPress={setTsTwo} style={styles.freqActive}><Text style={styles.activeText}>Evening</Text></TouchableOpacity>
                            :
                            <TouchableOpacity onPress={setTsTwo} style={styles.freqNormal}><Text>Alternate</Text></TouchableOpacity>
                        }
                        
                    </View>
                    <View style={styles.col}>
                        
                    </View>
                </View> */}

                {/* <View style={[styles.row, styles.section]}>
                    <View style={[styles.col3,styles.qtyStyle]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Select Start Date</Text>
                    </View>  
                </View>
                <View style={[styles.row, styles.section]}>
                    <View style={styles.col}
                    >
                        
                    </View>
                   
                </View> */}
               


                {/* <View style={[styles.row, styles.section]}>
                    <View style={[styles.col3,styles.qtyStyle]}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>Your Delivery Address</Text>
                    </View>  
                </View>
                <View style={[styles.row, styles.section]}>
                    <View style={styles.col}
                    >
                       {
                           (reduxUser.shippingAddress.shippingId != '') ?
                           <>
                           <Text>{showAddress(reduxUser.shippingAddress)}</Text>
                           <TouchableOpacity onPress={toggleModal}>
                               <Text style={{ color: 'green', textDecorationLine: 'underline',  }}>Edit Address</Text>
                           </TouchableOpacity>
                           </>
                           :
                           <>
                           <Text>Please specify your shipping address</Text>
                           <TouchableOpacity onPress={toggleModal}>
                               <Text style={{ color: 'green', textDecorationLine: 'underline', fontSize: 17, alignSelf: 'center' }}>Add Shipping Address</Text>
                           </TouchableOpacity>
                           </>
                       }
                    </View>
                    
                </View> */}
               



                
            </View>
            </ScrollView>
            <View style={styles.coupons}>
                {
                    !isCouponApplied 
                    ?
                    <>
                        <View style={styles.couponCol1}>
                           <TextInput placeholder="Enter Coupon Code" style={styles.couponCode} value={couponCode} onChangeText={text => setCouponCode(text)} />
                       </View>
                       <View style={styles.couponCol2}>
                           <TouchableOpacity style={styles.couponButton} onPress={applyCoupon}>
                               <Text style={styles.textWhite}>Apply</Text>
                           </TouchableOpacity>
                       </View>
                    </>
                    :
                    <View style={{ paddingLeft: 10 }}>
                        <Text>Coupon Applied : <Text style={{ fontWeight:'bold', color: COLORS.PRIMARY }}>{couponCode}</Text></Text>
                        <Text style={{color:'black', fontSize: 16}}>
                            You Save <Text style={{ fontWeight:'bold', color: COLORS.PRIMARY }}>{showPrice(couponDiscount)}</Text>
                        </Text>
                    </View>
                }
                       
            </View>
            <View style={styles.buttons} >
                    <View style={styles.subscribe}>
                        {
                            (!apiStatus) 
                            ?
                            <TouchableOpacity style={styles.subscribe} onPress={subscribeBtn}>
                                <View style={styles.subscribe_btn}>
                            <Text style={styles.subscrbenow}>Subscribe</Text>
                            </View>
                            </TouchableOpacity>
                        
                            :
                            <TouchableOpacity onPress={subscribeBtn}>
                            <ActivityIndicator color="white" size={20}  style={{ padding: 16}}/>
                            </TouchableOpacity>
                        }
                   
                   </View>
                </View>


                        <Modal transparent={true} visible={showModal} style={styles.modal} animationType="slide">
                            <View style={styles.modalBody}>
                            <Text style={{fontSize:20, fontWeight:'bold', marginBottom: 10}}>Your Shipping Address</Text>

                            <ScrollView style={{width: '100%', }} contentContainerStyle={{alignItems: 'center'}}>
                                <KeyboardAvoidingView>
                                    <View style={{ width: '100%' }}>
                            <TextInput style={styles.textInput} placeholder="Flat No/House No" value={frmFlat} onChangeText={text => setFrmFlat(text)} />
                            <TextInput style={styles.textInput} placeholder="Tower/Block" value={frmBlock} onChangeText={text => setFrmBlock(text)} />
                            <TextInput style={styles.textInput} placeholder="Society/Area" value={frmSociety} onChangeText={text => setFrmSociety(text)} />
                            <TextInput style={styles.textInput} placeholder="City"  value={frmCity} onChangeText={text => setFrmCity(text)}/>
                            <TextInput style={styles.textInput} placeholder="State"  value={frmState} onChangeText={text => setFrmState(text)}/>
                            
                            <TextInput style={styles.textInput} placeholder="Zip"  value={frmZip} onChangeText={text => setFrmZip(text)}/>
                            <TextInput style={styles.textInput} placeholder="Landmark"  value={frmLandmark} onChangeText={text => setFrmLandmark(text)}/>
                            <TextInput style={styles.textInput} placeholder="Country"  value={frmCountry} onChangeText={text => setFrmCountry(text)} editable={false}/>
                            </View>
                            </KeyboardAvoidingView>
                            </ScrollView>
                            


                            <View style={styles.row}>
                                <View style={styles.col}></View>
                            <View style={styles.col}
                    >
                      
                      <TouchableOpacity onPress={shippingAddressAction} style={styles.btn}>
                                <Text>Confirm </Text>
                            </TouchableOpacity>
                          
                    </View>
                    <View style={styles.col}
                    >
                      
                           <TouchableOpacity onPress={toggleModal} style={styles.btn}> 
                               <Text>Close</Text>
                           </TouchableOpacity>
                          
                    </View>
                    <View style={styles.col}></View>
                                </View>
                            

                            </View>
                        </Modal>



                        <Modal transparent={true}  visible={showModalDate} style={styles.modalOuter} animationType="slide">
                            <View style={styles.modalBodyDate}>
                                <Text style={{fontSize:20, fontWeight:'bold', color: COLORS.PRIMARY}}>Choose Start Date</Text>
                            <DatePicker date={startDate} onDateChange={setStartDate} minimumDate={today} mode="date"/>
                            <TouchableOpacity onPress={() => setShowModalDate(false)} style={[styles.btn,{ paddingHorizontal: 10, paddingVertical:5}]}>
                                <Text>Close</Text>
                            </TouchableOpacity>
                            </View>
                        </Modal>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    colThree: {
        flex: 2.5
    },
    colTwo: {
        flex: 1.5
    },
    black: {
        color:'black',
        marginLeft: 20, 
        fontWeight: 'bold'
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
        alignItems:'center',
        backgroundColor: 'white'
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
    btn_add:{
        color:'#2f746f',
        fontSize:25,
    },
    subscribe_btn: {
        width:'100%',
        height:60,
        alignItems:'center',
        justifyContent:'center'
    },
    textInput: {
        borderWidth:1,
        borderColor: '#087E8B',
        width: 300,
        borderRadius:5,
        marginBottom: 10,
        paddingLeft: 10,
        
    },

    modal:{
       flex:1, 
       backgroundColor: '#000000',
       width: '100%',

    },
    modalOuter:{
        flex:1, 
        backgroundColor: '#000000',
        width: '100%',
 
     },
    modalBody: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        height: '80%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    modalBodyDate: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        height: '40%',
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        elevation: 8
    },

    activeText: {
        color: 'white'
    },
    freqNormal: {
        alignSelf: 'center',
        borderColor: '#2f746f', 
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        
    },
    freqActive: {
        alignSelf: 'center',
        borderColor: '#2f746f', 
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2f746f'
    },
    aj: {
        justifyContent: 'center'
    },
    qtyStyle: {
        textAlign: 'center',
        marginTop: 15,
        color: 'black'
    },
    btn: {
        backgroundColor:'#e5e5e5',
        padding: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10
        
    },
    section : {
        marginHorizontal: 10,
        marginVertical: 10
    },
    sectionTwo : {
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems:'center'
    },
    row: {
        flexDirection: 'row'
        
    },
    col: {
        flex: 1
    },
    col3: {flex:4},
    discount: {
        color: 'white'
    },  
    product: {
        flex: 0.40,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    productimage: {
        width: 'auto',
        height: 200,
        borderRadius: 5,
        marginTop: 20
       // borderBottomLeftRadius: 50,
    },
    productdetailcontainer:{
        marginLeft:20, 
        marginTop:20, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    detailContent: {
        //  flex: 0.60,
        // marginHorizontal: 7,
        marginBottom: 7,
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 20,
    },
    pricetag:{
        backgroundColor:'#2f746f',
        
        paddingHorizontal: 20,
        paddingBottom: 5,
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
       height: 60,
       flexDirection: 'row',
       alignItems: 'baseline'
       
    },
    buyonce:{
        backgroundColor:'black',
        width:'50%',
        height:60,
        alignItems:'center',
        justifyContent:'center'

    },
    subscribe:{
        backgroundColor:'#2f746f',
        width:'100%',
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


const mapStateToProps = state => {
    return {
        reduxUser : state.user,
        reduxPlans: state.subscriptionPlans
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reduxSaveQuote : orderId => dispatch(saveQuote(orderId)),
        reduxUpdateAdress : address => dispatch(updateAddress(address))
    }
}

export default (connect)(mapStateToProps,mapDispatchToProps)(Subscribe);