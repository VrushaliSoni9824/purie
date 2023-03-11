import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MemberHeader from '../common/MemberHeader'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../constants/Colors';
import { connect } from "react-redux";
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { PLACEORDERSCREEN } from '../constants/Screens';
import { SafeAreaView } from "react-native-safe-area-context";

import SuccessError from '../screens/SuccessError';


const Checkout = ({ navigation, reduxUser }) => {
    const [data, setData] = useState(false);
    const [apiStatus, setApiStatus] = useState(false);
    //   console.log('CAt Name',catName);

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
      
    const [showAlert1, setshowAlert1] = useState(false);
    const [isError, setisError] = useState(false);
    const [alertTitle,setalertTitle] = useState("");    
    const [alertSubTitle,setalertSubTitle] = useState("");


    const getProduct = () => {
  
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
                console.log(`responseData`, responseData.user_address[0]);
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
                   setData(true);
                  // navigation.navigate(PLACEORDERSCREEN);
               }
               else
               {

               }
         
            });
                    
    };
  
  
    useEffect(() => {
      getProduct();
    }, []);
  
    const processAddress = () => {

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
        // if(frmLandmark.trim() == '')
        // {
        //     setLandmarkError('Please enter your landmark');
        //     valid = false;
        // }
        
        // else{
        //     setLandmarkError(false);
        // }
        

        

        

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
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == 'Success')
                  {
                    // setOldpassword('');
                    // setPassword('');

                //  showMessage({
                //         message: "Success",
                //         description: responseData.message,
                //         type: "success",
                //       }); 

                      
                      navigation.navigate(PLACEORDERSCREEN);
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <SuccessError
          isVisible={showAlert1}
          error={isError}
          title={alertTitle}
          deleteIconPress={() => {
            setshowAlert1(false)
          }}
        //   subTitle={alertSubTitle}
        />
        <View > 
        <MemberHeader title="Address"/>
            <View style={styles.container}>
            
            <View style={styles.form}> 
                    <Text style={styles.phone}>Flat No/House No</Text>
                    <TextInput style={styles.textInput} placeholder="Flat No/House No" value={frmFlat} onChangeText={text => setFrmFlat(text)} />
                    {(flatError) ? <View><Text style={styles.error}>{flatError}</Text></View>: <></>}

                    <Text style={styles.phone}>Town/Block</Text>
                    <TextInput style={styles.textInput} placeholder="Tower/Block" value={frmBlock} onChangeText={text => setFrmBlock(text)} />
                    {(blockError) ? <View><Text style={styles.error}>{blockError}</Text></View>: <></>}

                    <Text style={styles.phone}>Society/Area</Text>
                    <TextInput style={styles.textInput} placeholder="Society/Area" value={frmSociety} onChangeText={text => setFrmSociety(text)} />
                    {(societyError) ? <View><Text style={styles.error}>{societyError}</Text></View>: <></>}

                    <Text style={styles.phone}>City</Text>
                    <TextInput style={styles.textInput} placeholder="City"  value={frmCity} onChangeText={text => setFrmCity(text)}/>
                    {(cityError) ? <View><Text style={styles.error}>{cityError}</Text></View>: <></>}

                    <Text style={styles.phone}>State</Text>
                    <TextInput style={styles.textInput} placeholder="State"  value={frmState} onChangeText={text => setFrmState(text)}/>
                    {(stateError) ? <View><Text style={styles.error}>{stateError}</Text></View>: <></>}
                    
                    <Text style={styles.phone}>Zip Code</Text>
                    <TextInput style={styles.textInput} placeholder="Zip"  value={frmZip} onChangeText={text => setFrmZip(text)}/>
                    {(zipError) ? <View><Text style={styles.error}>{zipError}</Text></View>: <></>}

                    <Text style={styles.phone}>Landmark</Text>
                    <TextInput style={styles.textInput} placeholder="Landmark"  value={frmLandmark} onChangeText={text => setFrmLandmark(text)}/>
                    {/* {(landmarkError) ? <View><Text style={styles.error}>{landmarkError}</Text></View>: <></>} */}

                    <Text style={styles.phone}>Country</Text>
                    <TextInput style={styles.textInput} placeholder="Country"  value={frmCountry} onChangeText={text => setFrmCountry(text)} editable={false}/>
                            
                </View>

                
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processAddress}>
                        <View style={styles.getstart}>
                        
                        <Text style={styles.getstartText}>Proceed</Text>
                    
                    </View>
                    </TouchableOpacity>
                        :
                        <View style={styles.getstart}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </View>
                    }
                    
                

            
            </View>
                    

                
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    error:{
        color:'red',
        // paddingBottom:5,
    },

    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:80,
        marginRight:80,
        borderRadius:50,
        
    },
    getstartText:{
        color:'white',
        paddingVertical:10,
        fontSize:16,
        fontWeight:'600',
    },
    container:{
        // padding:20,
        paddingHorizontal:20,
    },
    
    profileName:{
        paddingVertical:10,
        fontSize:25,
        color:'#2f746f',
        fontWeight:'600'
    },
    profile:{
        width:200,
        height:200,
    },
    header:{
        paddingTop:40,
        justifyContent:'center',
        alignItems:'center'
    },

    form:{
        paddingVertical:10,
    },
    phone:{
        paddingTop:3,
        fontWeight:'600',
        color:'#2f746f',

    },
    textInput:{
        height: 35, 
        width: "100%", 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginTop: 5,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
    },
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
    
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);