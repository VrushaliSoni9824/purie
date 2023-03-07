import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,Platform, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from 'react-redux'
import { API_LINK, Invoice_REPORT_LINK } from '../constants/Strings'

import { showPrice } from '../utils'
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from "react-native-fs";
import DatePicker from 'react-native-datepicker';

import FileViewer from "react-native-file-viewer";
const Report = () => {
    const reduxUser = useSelector(state => state.user);
    const [isInfoLoaded, setIsInfoLoaded] = useState(false);
    const [walletHistory, setwalletHistory] = useState('');
    const url =  Invoice_REPORT_LINK+reduxUser.customer.userId+".pdf";
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


    function getUrlExtension(url) {
        return url.split(/[#?]/)[0].split(".").pop().trim();
      }

    const extension = getUrlExtension(url);

// Feel free to change main path according to your requirements.
const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

function DatePickerCommon({title, value, onChange}) {
    return (
      <View style={styles.dateMainView}>
        <Text style={styles.fromToTxt}>{title}</Text>
        <DatePicker
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          placeholder="MM.DD.YYYY"
          date={value}
          onDateChange={onChange}
          customStyles={{
            dateInput: {borderWidth: 0},
            dateText: styles.dateText,
            placeholderText: styles.dateText,
          }}
          showIcon={false}
        />
      </View>
    );
  }
  
const options = {
  fromUrl: url,
  toFile: localFile,
};

useEffect(() => {
    showWalletHistory();
},[])

    useEffect(() => {
        
        if(!isInfoLoaded)
        {
            
            showWalletHistory();
            
        }

        return () => {
            
        }
    }, [isInfoLoaded]);

    const showWalletHistory = () => {
        console.log("**************");
        console.log({user_id: reduxUser.customer.userId});
        console.log("**************");
        fetch(API_LINK+'invoiceReport',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                mode: 'cors'
            },
            body: JSON.stringify({
                user_id: reduxUser.customer.userId,
                // fdate:'2023-01-01',
                // tdate:'2023-02-10'
                
                 })
             })
            .then((response) => response.json())
            .then((responseData) => {
                
                // Alert.alert("success");
                console.log("________________________________________");
                console.log('WALLET LIST RESPONSE:',responseData.wallet_history);
                console.log(JSON.stringify(responseData.wallet_history))
                console.log("________________________________________");

               // updateWalletBalance(responseData.wallet[0].wallet_amount);
              setwalletHistory(responseData.wallet_history);
                 
               
            
              //setApiStatus(false);
             })
            .catch(function(error) {
                Alert.alert("error");
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                      //   setApiStatus(false);
                          throw error;
                        
                        })
                
    
                        setIsInfoLoaded(true);
    
    }

    

    const renderItem = (item) => {
        console.log('ITEM',item);
        console.log(new Date(item.item.date));
        return (
            <View>
                        <View style={[styles.recordrow]}>
                        <View style={[{flex:0.3},styles.recordac, styles.ids]}>
                            <Text style={[styles.recordamounts]}>{item.item.date}</Text>
                        </View>
                        {/* debit section */}
                        <View style={[{flex:0.25},styles.recordac]}>
                            <Text style={styles.recordamounts}>{item.item.status == "Debit" ? showPrice(item.item.amount) : "-"}</Text>
                        </View>
                        {/* credit section */}
                        <View style={[{flex:0.25},styles.recordac]}>
                            <Text style={styles.recordamounts}>{item.item.status == "Credit" ? showPrice(item.item.amount) : "-"}</Text>
                        </View>
                        <View style={[{flex:0.2},styles.recordac]}>
                            <Text style={styles.recordamounts}>{item.item.walletBalance}</Text>
                        </View>
                            
                    </View>
                    </View>
        );   
    }
    


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView>
        <View style={{backgroundColor: 'white'}}> 
        <MemberHeader title="Wallete Report"/>

        <View style={styles.history}>


        <View style={styles.Topview}>
            {/* <DatePickerCommon
              title={'From'}
              value={fromDate}
              onChange={setFromDate}
            />
            <Image
              style={[styles.arrow]}
              source={require('../assets//arrow_forward.png')}
            //   <Image style={styles.pro} source={require('../assets/product.jpeg')} />

            />
            <DatePickerCommon
              title={'To'}
              value={toDate}
              onChange={setToDate}
            /> */}
           
          </View>
        {/* <Text style={{color:'#000'}}>aaaaaaaaaaaaaaaaaaaaaa</Text> */}

                        <View style={styles.historyBor}>
                            <Text style={[styles.HistoryText,{textAlign:'center'}]}>Your Wallet History</Text>
                        </View>
                        <View style={[styles.record]}>
                        <View>
                        <View style={[{flex:1,flexDirection:'row',backgroundColor:'#2f746f'}]}>
                            <View style={[{flex:0.3},styles.recordac, styles.ids,{justifyContent:'center'}]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}>Date</Text>
                            </View>
                            <View style={[{flex:0.25},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}>Deduction</Text>
                            </View>
                            <View style={[{flex:0.25},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}>Recharge</Text>
                            </View>
                            <View style={[{flex:0.2},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}>Balance</Text>
                            </View>     
                        </View>
                        <View style={[{flex:1,flexDirection:'row',backgroundColor:'#2f746f'}]}>
                            <View style={[{flex:0.3},styles.recordac, styles.ids]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}></Text>
                            </View>
                            <View style={[{flex:0.25},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}></Text>
                            </View>
                            <View style={[{flex:0.25},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}>Amount</Text>
                            </View>
                            <View style={[{flex:0.2},styles.recordac]}>
                                <Text style={[styles.recordamounts_heading,{fontWeight:"bold",textAlign:'center'}]}></Text>
                            </View>     
                        </View>
                    </View>
                        <FlatList
                        data={walletHistory}
                        keyExtractor={item => item.id}
                        renderItem={renderItem} />

                        </View>
                        <View style={[styles.editProfile,{marginTop:10}]}>
                    <TouchableOpacity onPress={()=>{

RNFS.downloadFile(options)
.promise.then(() => FileViewer.open(localFile))
.then(() => {
  // success
})
.catch((error) => {
  // error
});


                    }}>
                        <Text style={styles.editProfile}><Icon name="create-outline" color="#fff" size={23} /> Download Report</Text>
                    </TouchableOpacity>
                    </View>
                    </View>

                    

            {/* <View style={styles.body}>
                
                
            </View> */}
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

export default Report

const styles = StyleSheet.create({
    profileList:{
        paddingTop:50,
    },
    editProfile:{
        backgroundColor:'#2f746f',
        color:'#fff',
        // padding:5,
        paddingVertical:2,
        paddingHorizontal:3,
        borderRadius:5
    },
    profileName:{
        paddingVertical:10,
        fontSize:17,
        color:'#2f746f',
        fontWeight:'bold'
    },
    profile:{
        width:100,
        height:100,
    },
    recordamounts:{
        padding:5,
        borderColor:'green',
        fontSize:16,
        color:'#2f746f',
        
    },
    recordamounts_heading:{
        padding:2,
        borderColor:'white',
        fontSize:13,
        backgroundColor:'#2f746f',
        color:'#ffffff',
    },
    recordamount:{
        padding:5,
        borderColor:'green',
        fontSize:20,
        color:'#2f746f',
        fontWeight:'bold',
    },
    ids:{
        width:'10%',
    },
    recordac:{
        
        borderColor: '#2f746f', 
        
        borderWidth: .5,  
    },
    recordcol:{
        flex: 1,
    },
    recordrow:{
        flexDirection: 'row',
    },
    record:{
        backgroundColor:'#D5E6E5',
        
    },
    historyBor:{
        paddingBottom:10,
        borderBottom: 1
    },
    HistoryText:{
        fontSize:18,
        fontWeight: 'bold',
        color: '#2f746f',

        
    },
    history:{
        padding:20,
        
    },
    Topview:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    },
    

    sectionHeight: {
        marginTop: '3%'
    },
    ac:{
        alignItems: 'center',
        // backgroundColor:'gray'
        borderColor: '#2f746f', 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        
    },
    ar: {
        alignItems: 'flex-end'
    },
    col: {
        flex: 1,
        margin:5,
    },
    row: {
        flexDirection: 'row',
        paddingLeft:20,
        paddingRight:20,
        
    },

    form:{
        padding:20
    },
    phone:{
        
        fontWeight:'600',
        color:'#2f746f',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
    },
    recharge:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:100,
        marginRight:100,
        borderRadius:50,
        paddingBottom: 8
        
    },
    rechargeText:{
        color:'white',
        paddingTop:8,
        fontSize:16,
        fontWeight:'600',
    },
    body:{
        backgroundColor: '#F8F8FF',
        padding:20,
    },
    heading:{
        fontSize:20,
        fontWeight:'bold',
        color: 'black',
    },
    par:{
        paddingTop:10,
        color: 'gray',
        textAlign:'justify',

    },
    points:{
        paddingLeft:20,
    }
})

