import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import MemberHeader from '../common/MemberHeader'
import { COLORS } from '../constants/Colors';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import {useSelector} from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import OrderListView from '../common/OrderListView';
import OrderHistoryListView from '../common/OrderHistoryListView';

import SuccessError from '../screens/SuccessError';

const MySubscriptions = ({navigation}) => {

    let today = new Date();

    const reduxUser = useSelector(state => state.user);    
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dates, setDates] = useState([]);
    const [apiStatus, setApiStatus] = useState(false);
    const [currentDate, setCurrentDate] = useState();
    const [activeDate, setActiveDate] = useState('');
    const [orders, setOrders] = useState('');
    const [response, setResponse] = useState('');
    const [monthI, setMonthI] = useState(today.getMonth() + 1);
    const [yearI, setYearI] = useState(today.getFullYear());


    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");

    let data = [];

    


    useEffect(() => {
      
    
    if(!dataLoaded) {

    
        let date = new Date();
        let year = date.getFullYear();
        let currDate = date.getDate();
        setCurrentDate(currDate);
        setActiveDate(currDate);
        let currDay = date.getDay();
        let leapYear = (year%4 == 0) ? true : false;
        let month = date.getMonth() + 1;

    setMonthI(month);
    setYearI(year);
    
    let daysInWeek = '';
    let monthStartDay = '';
   
    if(currDay != 0) {
         daysInWeek = currDate % 7;
     monthStartDay = currDay - daysInWeek;
    }    
    else
    {
         daysInWeek = currDate % 7;
     monthStartDay = currDay - daysInWeek;

     if(monthStartDay < 0)
     {
         monthStartDay = monthStartDay + 7;
     }
    }
    

    let weekDays = ['','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    
    
    let groupOne = [1,3,5,7,8,10,12];
    
    let dayCount = 0;
    
    
    if(groupOne.includes(month)){
        
        dayCount = 31;
    }
    else
    {
        if(month == 2)
        {
            dayCount = leapYear ? 29: 28;
        }
        else
        {
            dayCount = 30;
        }
        
    }
    console.log('MONTH START',currDay, daysInWeek,monthStartDay,dayCount);

   

    
    for(let i = 1; i <= dayCount; i++)
    {
        const tempData = {
            key : i,
            day: weekDays[monthStartDay  + i%7]
        };
       // console.log('Hi',i,tempData);
        data.push(tempData);
    }
   
    setDates(data);
    getOrdersByDate(currDate);
    console.log('FL DATA',data); 
}
}, []);


const refreshOrder = () => { 
    getOrdersByDate(activeDate);
 }

const getOrdersByDate = (lookedDate) => { 

    setActiveDate(lookedDate);

    if(lookedDate < 10)
    {
        lookedDate = '0' + lookedDate;
    }

    let tempMonth = '';
    if(monthI < 10)
    {
        tempMonth = '0'+monthI;
    }
    console.log('REQ',reduxUser.customer.userId,yearI +'-'+tempMonth + '-' + lookedDate);
    fetch(API_LINK+'todays-order',{
        method : 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            mode: 'cors'
        },
        body: JSON.stringify({
           
            user_id: reduxUser.customer.userId,
            delivery_date: yearI +'-'+tempMonth + '-' + lookedDate
            
             })
         })
        .then((response) => response.json())
        .then((responseData) => {
           
           console.log('ORDERES',responseData); 
           setResponse(responseData.message);
           setOrders(responseData.order); 
          if(responseData.status == 'Success')
          {
           

            // showMessage({
            //     message: "Success",
            //     description: responseData.message,
            //     type: "success",
            //   });

            
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




const renderItem = (item) => { 
    console.log('FL',item);
    //let mDate = year + '-' + month + '-'+ item.item.key;

    return (
        <View style={{width: 80, height: 80, justifyContent: 'center', alignItems: 'center'}}>
            <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
            {
                (item.item.key == activeDate)
                ?
                <>
                <Text style={{ color: COLORS.PRIMARY, fontSize: 21, fontWeight: 'bold' }}>{item.item.key}</Text> 
                <Text style={{ color: COLORS.PRIMARY, fontSize: 15 }}>{item.item.day}</Text>
                <View style={{height:2, backgroundColor: COLORS.PRIMARY, width:'80%', marginTop : 5}}></View>
                </>
                :
                <>
                <TouchableOpacity onPress={() => getOrdersByDate(item.item.key)}>
                <Text style={{ color: '#111', fontSize: 21 }}>{item.item.key}</Text>
                <Text style={{ color: '#777', fontSize: 15 }}>{item.item.day}</Text>
                </TouchableOpacity>
                </>
            }
            
            
        </View>
        // <OrderListView item={item} />
    );
 }
    
 const renderOrder = (order) => { 
    return (
        // <View style={styles.subsBtn}>
        //             <View style={styles.col1}>
        //                 <Text style={styles.subsTitle}>{order.item.product_name}</Text>
        //                 <Text style={styles.subsBody}>500ml - Daily Morning</Text>
        //                 <Text style={styles.subsBody}>10 Days remaining</Text>
        //             </View>
        //             <View style={styles.col2}>
        //                 {/* <Image source={require('../assets/calendar.jpeg')} style={styles.actionIcon}  /> */}
        //                 <Image source={require('../assets/pause.png')} style={styles.actionIcon}  />
        //             </View>
        //         </View>
        <OrderHistoryListView item={order} refreshOrder={refreshOrder} />
    );
  }

  return (
    <SafeAreaView>
        <View>
        <MemberHeader title="My Subscriptions" />
        <View style={styles.calendarBg}>
        <FlatList data={dates} keyExtractor={item => item.key} renderItem={renderItem} horizontal={true} horizontalScroll={false} initialScrollIndex={currentDate-3}
         getItemLayout={(data, index) => (
            {length: 80, offset: 80 * index, index}
          )}/>
        </View>
            <View styles={styles.subsArea}>

                
                <Text style={{width: '100%', textAlign: 'center', color:'red', fontSize:18}}>{response}</Text>

                <FlatList data={orders} keyExtractor={item => item.cart_id} renderItem={renderOrder} />

               {/* <View style={styles.subsBtn}>
                    <View style={styles.col1}>
                        <Text style={styles.subsTitle}>Cow Milk</Text>
                        <Text style={styles.subsBody}>500ml - Daily Morning</Text>
                        <Text style={styles.subsBody}>10 Days remaining</Text>
                    </View>
                    <View style={styles.col2}>
                        <Image source={require('../assets/calendar.jpeg')} style={styles.actionIcon}  />
                        <Image source={require('../assets/pause.png')} style={styles.actionIcon}  />
                    </View>
                </View>
                 <View style={styles.subsBtn}>
                    <View style={styles.col1}>
                    <Text style={styles.subsTitle}>Buffalo Milk</Text>
                       
                    </View>
                    <View style={styles.col2}>
                    <Image source={require('../assets/play.png')} style={styles.actionIcon}  />
                    </View>
                </View>
                <View style={styles.subsBtn}>
                <View style={styles.col1}>
                    <Text style={styles.subsTitle}>Coconut Water</Text>
                       
                    </View>
                    <View style={styles.col2}>
                    <Image source={require('../assets/play.png')} style={styles.actionIcon}  />
                    </View>
                </View> */}


            </View>
        </View>
    </SafeAreaView>
  )
}

export default MySubscriptions

const styles = StyleSheet.create({
    subsArea: {
        alignItems: 'center', 
        width: '90%',
        alignSelf: 'center',
        backgroundColor:'red',
        flex: 1
    },
    actionIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    subsTitle: {
        color: COLORS.PRIMARY, 
        fontSize: 15,
        fontWeight: 'bold'
    },
    subsBody: {
        color: '#222'
    },
    subsBtn: {
        width: '90%',
        alignSelf: 'center', 
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 10,
        marginBottom:20,
        paddingHorizontal: 20  
      },
    col1: {
        flex: 3,
        justifyContent:'center'
    },
    col2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-evenly', 
       
        flexDirection: 'row'
    },
   
    calendarBg: {
        backgroundColor: '#e5e5e5',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 0
    }
})